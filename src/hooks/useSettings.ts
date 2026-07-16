import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { sendDiscordWebhook } from '@/lib/discord';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_SETTINGS;

export interface UserSettings {
  notifikasi_enabled: boolean;
  bahasa: string;
  keuangan_notif_enabled?: boolean;
  kesehatan_notif_enabled?: boolean;
  tugas_notif_enabled?: boolean;
  keuangan_notif_time?: string;
  kesehatan_notif_time?: string;
  tugas_notif_time?: string;
}

export function useSettings() {
  const { user } = useAuth();
  
  const [settings, setSettings] = useState<UserSettings>({
    notifikasi_enabled: false,
    bahasa: 'id',
    keuangan_notif_enabled: false,
    kesehatan_notif_enabled: false,
    tugas_notif_enabled: false,
  });
  const [loading, setLoading] = useState(true);

  const loadSettings = useCallback(() => {
    if (!user) return;
    setLoading(true);
    try {
      const dataStr = localStorage.getItem('hitera_settings_' + user.id);
      if (dataStr) {
        const data = JSON.parse(dataStr);
        setSettings({
          notifikasi_enabled: data.notifikasi_enabled ?? false,
          bahasa: data.bahasa ?? 'id',
          keuangan_notif_enabled: data.keuangan_notif_enabled ?? false,
          kesehatan_notif_enabled: data.kesehatan_notif_enabled ?? false,
          tugas_notif_enabled: data.tugas_notif_enabled ?? false,
          keuangan_notif_time: data.keuangan_notif_time,
          kesehatan_notif_time: data.kesehatan_notif_time,
          tugas_notif_time: data.tugas_notif_time,
        });
      } else {
        const defaultSettings = {
          notifikasi_enabled: false,
          bahasa: 'id',
          keuangan_notif_enabled: false,
          kesehatan_notif_enabled: false,
          tugas_notif_enabled: false,
        };
        localStorage.setItem('hitera_settings_' + user.id, JSON.stringify(defaultSettings));
        setSettings(defaultSettings);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return;
    const oldSettings = { ...settings };
    const newSettings = { ...settings, ...updates };
    
    // Optimistic update
    setSettings(newSettings);
    
    try {
      localStorage.setItem('hitera_settings_' + user.id, JSON.stringify(newSettings));
      
      // Send to Discord
      sendDiscordWebhook(WEBHOOK_URL, {
          content: `⚙️ **Pengaturan Diperbarui**\n**Notifikasi Utama:** ${newSettings.notifikasi_enabled ? 'Aktif' : 'Mati'}\n**Bahasa:** ${newSettings.bahasa}`
      });
    } catch (err) {
      console.error('Failed to update settings:', err);
      // Revert on error
      setSettings(oldSettings);
      throw err;
    }
  };

  const deleteAllData = async () => {
    if (!user) return;
    
    try {
      ['hitera_transaksi', 'hitera_kesehatan', 'hitera_tugas', 'hitera_keseharian_todos'].forEach(key => {
        const dataStr = localStorage.getItem(key);
        if (dataStr) {
            const allData = JSON.parse(dataStr);
            if (Array.isArray(allData)) {
                const filteredData = allData.filter((item: any) => item.user_id !== user.id);
                localStorage.setItem(key, JSON.stringify(filteredData));
            }
        }
      });
      localStorage.removeItem('hitera_settings_' + user.id);
      
      // Reset settings state
      loadSettings();
      
      // Send to Discord
      sendDiscordWebhook(WEBHOOK_URL, {
          content: `🚨 **PERINGATAN: Semua Data Pengguna Telah Dihapus**`
      });
    } catch (err) {
      console.error('Failed to delete user data:', err);
      throw err;
    }
  };

  return {
    settings,
    loading,
    updateSettings,
    deleteAllData,
    refreshSettings: loadSettings
  };
}
