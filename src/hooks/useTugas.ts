'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tugas, TugasForm } from '@/types';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/Toast';
import { sendDiscordWebhook } from '@/lib/discord';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_TUGAS;

export function useTugas() {
    const [tugas, setTugas] = useState<Tugas[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { success, error: toastError } = useToast();

    const fetchTugas = useCallback(() => {
        if (!user) return;
        setLoading(true);
        try {
            const dataStr = localStorage.getItem('hitera_tugas');
            let data = dataStr ? JSON.parse(dataStr) : [];
            data = data.filter((t: Tugas) => t.user_id === user.id);
            // Sort by created_at descending
            data.sort((a: Tugas, b: Tugas) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setTugas(data);
        } catch (err: any) {
            toastError('Gagal memuat daftar tugas dari penyimpanan lokal.');
        } finally {
            setLoading(false);
        }
    }, [user, toastError]);

    useEffect(() => {
        fetchTugas();
    }, [fetchTugas]);

    const addTugas = async (data: TugasForm) => {
        if (!user) return;
        try {
            const newTugas: Tugas = {
                ...data,
                id: crypto.randomUUID(),
                user_id: user.id,
                created_at: new Date().toISOString(),
                status: 'aktif',
                tanggal_selesai: undefined
            };

            const dataStr = localStorage.getItem('hitera_tugas');
            const currentData = dataStr ? JSON.parse(dataStr) : [];
            const newData = [newTugas, ...currentData];
            localStorage.setItem('hitera_tugas', JSON.stringify(newData));

            success('Tugas berhasil ditambahkan.');
            fetchTugas();

            // Send to Discord
            sendDiscordWebhook(WEBHOOK_URL, {
                content: `📝 **Tugas Baru Ditambahkan**\n**Judul:** ${newTugas.judul}\n**Deskripsi:** ${newTugas.deskripsi || '-'}\n**Prioritas:** ${newTugas.prioritas || '-'}`
            });
        } catch (err: any) {
            toastError('Gagal menambahkan tugas.');
        }
    };

    const toggleSelesai = async (id: string, currentStatus: string) => {
        if (!id || id === 'undefined' || id === 'null') return;
        
        try {
            const newStatus: 'aktif' | 'selesai' = currentStatus === 'selesai' ? 'aktif' : 'selesai';
            const dataStr = localStorage.getItem('hitera_tugas');
            let currentData: Tugas[] = dataStr ? JSON.parse(dataStr) : [];
            
            let updatedTugas = null;
            currentData = currentData.map(t => {
                if (t.id === id) {
                    updatedTugas = {
                        ...t,
                        status: newStatus,
                        tanggal_selesai: newStatus === 'selesai' ? new Date().toISOString() : undefined
                    };
                    return updatedTugas;
                }
                return t;
            });

            localStorage.setItem('hitera_tugas', JSON.stringify(currentData));
            fetchTugas();

            if (updatedTugas) {
                // Send to Discord
                sendDiscordWebhook(WEBHOOK_URL, {
                    content: `✅ **Status Tugas Diubah**\n**Judul:** ${(updatedTugas as Tugas).judul}\n**Status Baru:** ${newStatus}`
                });
            }
        } catch (err: any) {
            toastError('Gagal memperbarui status tugas.');
        }
    };

    const deleteTugas = async (id: string) => {
        if (!id || id === 'undefined' || id === 'null') return;
        
        try {
            const dataStr = localStorage.getItem('hitera_tugas');
            let currentData: Tugas[] = dataStr ? JSON.parse(dataStr) : [];
            const deletedTugas = currentData.find(t => t.id === id);
            
            currentData = currentData.filter(t => t.id !== id);
            localStorage.setItem('hitera_tugas', JSON.stringify(currentData));
            
            success('Tugas berhasil dihapus.');
            fetchTugas();

            if (deletedTugas) {
                // Send to Discord
                sendDiscordWebhook(WEBHOOK_URL, {
                    content: `🗑️ **Tugas Dihapus**\n**Judul:** ${deletedTugas.judul}`
                });
            }
        } catch (err: any) {
            toastError('Gagal menghapus tugas.');
        }
    };

    return {
        tugas,
        loading,
        tugasAktif: tugas.filter(t => t.status === 'aktif'),
        tugasSelesai: tugas.filter(t => t.status === 'selesai'),
        addTugas,
        toggleSelesai,
        deleteTugas,
        refresh: fetchTugas
    };
}
