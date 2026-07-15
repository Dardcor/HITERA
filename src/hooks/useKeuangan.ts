'use client';

import { useState, useEffect, useCallback } from 'react';
import { Transaksi, TransaksiForm } from '@/types';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/Toast';
import { sendDiscordWebhook } from '@/lib/discord';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_TRANSAKSI;

export function useKeuangan(tanggal: string) {
    const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
    const [totalSaldo, setTotalSaldo] = useState(0);
    const [totalPemasukan, setTotalPemasukan] = useState(0);
    const [totalPengeluaran, setTotalPengeluaran] = useState(0);
    const [loading, setLoading] = useState(true);
    const [trendSaldo, setTrendSaldo] = useState<{tanggal: string, saldo: number}[]>([]);
    const { user } = useAuth();
    const { success, error: toastError } = useToast();

    const fetchStats = useCallback(() => {
        if (!user) return;
        setLoading(true);
        try {
            const dataStr = localStorage.getItem('hitera_transaksi');
            const allData: Transaksi[] = dataStr ? JSON.parse(dataStr) : [];

            let inTotal = 0;
            let outTotal = 0;
            const dailyChange: Record<string, number> = {};

            allData.forEach(t => {
                const amt = Number(t.jumlah);
                const date = t.tanggal as string;
                if (t.jenis === 'pemasukan') {
                    inTotal += amt;
                    dailyChange[date] = (dailyChange[date] || 0) + amt;
                } else {
                    outTotal += amt;
                    dailyChange[date] = (dailyChange[date] || 0) - amt;
                }
            });
            setTotalPemasukan(inTotal);
            setTotalPengeluaran(outTotal);
            const currentTotalBalance = inTotal - outTotal;
            setTotalSaldo(currentTotalBalance);

            const trend = [];
            const todayDate = new Date();
            let runningBalance = currentTotalBalance;

            for (let i = 0; i < 7; i++) {
                const d = new Date(todayDate);
                d.setDate(d.getDate() - i);
                
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                const dateStr = `${yyyy}-${mm}-${dd}`;

                trend.unshift({
                    tanggal: dateStr,
                    saldo: runningBalance,
                });

                const changeData = dailyChange[dateStr] || 0;
                runningBalance -= changeData;
            }
            setTrendSaldo(trend);

            // Sort by created_at descending
            allData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setTransaksi(allData);
        } catch (err: any) {
            toastError('Gagal memuat data keuangan dari penyimpanan lokal.');
        } finally {
            setLoading(false);
        }
    }, [user, tanggal, toastError]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const tambahTransaksi = async (data: TransaksiForm) => {
        if (!user) return;
        try {
            const newTransaksi: Transaksi = { 
                ...data, 
                id: crypto.randomUUID(),
                user_id: user.id,
                created_at: new Date().toISOString()
            };
            
            const dataStr = localStorage.getItem('hitera_transaksi');
            const currentData = dataStr ? JSON.parse(dataStr) : [];
            const newData = [newTransaksi, ...currentData];
            localStorage.setItem('hitera_transaksi', JSON.stringify(newData));

            success('Transaksi berhasil ditambahkan.');
            fetchStats();

            // Send to Discord
            sendDiscordWebhook(WEBHOOK_URL, {
                content: `💰 **Transaksi Baru**\n**Jenis:** ${newTransaksi.jenis}\n**Kategori:** ${newTransaksi.kategori}\n**Jumlah:** Rp ${newTransaksi.jumlah}\n**Keterangan:** ${newTransaksi.deskripsi || '-'}\n**Tanggal:** ${newTransaksi.tanggal}`
            });
        } catch (err: any) {
            toastError(err.message || 'Gagal menambahkan transaksi.');
        }
    };

    const hapusTransaksi = async (id: string) => {
        if (!id || id === 'undefined' || id === 'null') return;
        
        try {
            const dataStr = localStorage.getItem('hitera_transaksi');
            let currentData: Transaksi[] = dataStr ? JSON.parse(dataStr) : [];
            const deleted = currentData.find(t => t.id === id);
            
            currentData = currentData.filter(t => t.id !== id);
            localStorage.setItem('hitera_transaksi', JSON.stringify(currentData));
            
            success('Transaksi berhasil dihapus.');
            fetchStats();

            if (deleted) {
                // Send to Discord
                sendDiscordWebhook(WEBHOOK_URL, {
                    content: `🗑️ **Transaksi Dihapus**\n**Jenis:** ${deleted.jenis}\n**Jumlah:** Rp ${deleted.jumlah}`
                });
            }
        } catch (err: any) {
            toastError('Gagal menghapus transaksi.');
        }
    };

    return {
        transaksi,
        loading,
        totalPemasukan,
        totalPengeluaran,
        saldoBersih: totalPemasukan - totalPengeluaran,
        totalSaldo,
        trendSaldo,
        tambahTransaksi,
        hapusTransaksi,
        refresh: fetchStats
    };
}
