'use client';

import { useState, useEffect, useCallback } from 'react';
import { DataKesehatan, KesehatanForm } from '@/types';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/Toast';
import { sendDiscordWebhook } from '@/lib/discord';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_KESEHATAN;

export function useKesehatan(tanggal: string) {
    const [data, setData] = useState<DataKesehatan | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { error: toastError, success } = useToast();

    const fetchData = useCallback(() => {
        if (!user) return;
        setLoading(true);
        try {
            const dataStr = localStorage.getItem('hitera_kesehatan');
            const allData: DataKesehatan[] = dataStr ? JSON.parse(dataStr) : [];
            const todayData = allData.find(d => d.tanggal === tanggal && d.user_id === user.id);
            
            setData(todayData || null);
        } catch (err: any) {
            toastError('Gagal memuat data kesehatan dari penyimpanan lokal.');
        } finally {
            setLoading(false);
        }
    }, [user, tanggal, toastError]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const simpanData = async (formData: KesehatanForm) => {
        if (!user) return;
        try {
            const dataStr = localStorage.getItem('hitera_kesehatan');
            let allData: DataKesehatan[] = dataStr ? JSON.parse(dataStr) : [];
            
            const existingIndex = allData.findIndex(d => d.tanggal === tanggal && d.user_id === user.id);
            
            const newData: DataKesehatan = {
                ...formData,
                id: existingIndex >= 0 ? allData[existingIndex].id : crypto.randomUUID(),
                user_id: user.id,
                tanggal: tanggal,
                created_at: existingIndex >= 0 ? allData[existingIndex].created_at : new Date().toISOString()
            };

            if (existingIndex >= 0) {
                allData[existingIndex] = newData;
            } else {
                allData.push(newData);
            }

            localStorage.setItem('hitera_kesehatan', JSON.stringify(allData));

            success('Data kesehatan berhasil disimpan.');
            fetchData();

            // Send to Discord
            sendDiscordWebhook(WEBHOOK_URL, {
                content: `🩺 **Data Kesehatan Disimpan**\n**Tanggal:** ${tanggal}\n**Air Minum:** ${formData.air_minum || 0} gelas\n**Tidur:** ${formData.jam_tidur || 0} jam\n**Olahraga:** ${formData.olahraga_jam || 0}j ${formData.olahraga_menit || 0}m\n**Catatan:** ${formData.catatan || '-'}`
            });
        } catch (err: any) {
            toastError(err.message || 'Gagal menyimpan data kesehatan.');
        }
    };

    return { data, loading, simpanData, refresh: fetchData };
}
