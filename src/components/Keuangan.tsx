import { useState, useEffect, useCallback } from 'react';
import { Wallet, TrendingUp, TrendingDown, Trash2, PiggyBank, PlusCircle, Activity } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Transaction = {
    id: string;
    type: 'pemasukan' | 'pengeluaran';
    amount: number;
    category: string;
    date: string;
};

export default function KeuanganView() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'pemasukan' | 'pengeluaran'>('pengeluaran');
    const [loading, setLoading] = useState(true);
    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
            .from('keuangan')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (data) setTransactions(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !category) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return alert('Sesi berakhir, silakan login ulang.');

        const { error } = await supabase.from('keuangan').insert({
            user_id: user.id,
            type,
            amount: parseFloat(amount),
            category,
            date: new Date().toISOString().split('T')[0]
        });

        if (error) {
            alert('Gagal menyimpan: ' + error.message);
        } else {
            setAmount('');
            setCategory('');
            fetchTransactions();
        }
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('keuangan')
            .delete()
            .eq('id', id);

        if (error) alert('Gagal menghapus: ' + error.message);
        else fetchTransactions();
    };

    const totalPemasukan = transactions.filter(t => t.type === 'pemasukan').reduce((acc, t) => acc + t.amount, 0);
    const totalPengeluaran = transactions.filter(t => t.type === 'pengeluaran').reduce((acc, t) => acc + t.amount, 0);
    const sisaSaldo = totalPemasukan - totalPengeluaran;

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

            <header className="page-header">
                <div className="page-header-icon">
                    <Wallet size={32} />
                </div>
                <div>
                    <h1 className="page-title">Manajemen Keuangan</h1>
                    <p className="page-subtitle">Pantau arus kas Anda secara akurat menggunakan sistem pencatatan cerdas.</p>
                </div>
            </header>

            {/* Dashboard Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Saldo</h3>
                        <PiggyBank size={20} color="var(--accent-hover)" />
                    </div>
                    <p style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>{formatRupiah(sisaSaldo)}</p>
                </div>

                <div className="glass-panel" style={{ borderTop: '4px solid var(--success)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Pemasukan</h3>
                        <TrendingUp size={20} color="var(--success)" />
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>{formatRupiah(totalPemasukan)}</p>
                </div>

                <div className="glass-panel" style={{ borderTop: '4px solid var(--danger)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Pengeluaran</h3>
                        <TrendingDown size={20} color="var(--danger)" />
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--danger)' }}>{formatRupiah(totalPengeluaran)}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '32px', alignItems: 'start' }}>

                {/* Form Input */}
                <div className="glass-panel">
                    <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <PlusCircle size={24} color="var(--accent-hover)" /> Tambah Transaksi
                    </h2>
                    <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div
                                className={`custom-radio ${type === 'pemasukan' ? 'active' : ''}`}
                                onClick={() => setType('pemasukan')}
                            >
                                <TrendingUp size={18} color={type === 'pemasukan' ? 'var(--success)' : 'var(--text-secondary)'} />
                                Pemasukan
                            </div>
                            <div
                                className={`custom-radio ${type === 'pengeluaran' ? 'active' : ''}`}
                                onClick={() => setType('pengeluaran')}
                            >
                                <TrendingDown size={18} color={type === 'pengeluaran' ? 'var(--danger)' : 'var(--text-secondary)'} />
                                Pengeluaran
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Nominal (IDR)</label>
                            <input
                                type="number"
                                placeholder="Cth: 50000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="styled-input"
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Kategori Transaksi</label>
                            <input
                                type="text"
                                placeholder="Cth: Makan Malam, Gaji"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="styled-input"
                                required
                            />
                        </div>

                        <button type="submit" className="styled-button" style={{ marginTop: '8px' }}>
                            Simpan Transaksi
                        </button>
                    </form>
                </div>

                {/* Transaction History */}
                <div className="glass-panel">
                    <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Activity size={24} color="var(--accent-hover)" /> Riwayat Transaksi
                    </h2>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px' }}>Loading transaki...</div>
                    ) : transactions.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                            <Wallet size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                            <p>Belum ada aktivitas transaksi. Jaga finansial Anda!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
                            {transactions.map((tx) => (
                                <div key={tx.id} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    background: 'rgba(0,0,0,0.3)', padding: '20px 24px', borderRadius: '16px',
                                    borderLeft: `4px solid ${tx.type === 'pemasukan' ? 'var(--success)' : 'var(--danger)'}`,
                                    transition: 'transform 0.2s, background 0.2s'
                                }} className="tx-item">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{
                                            padding: '12px', borderRadius: '12px',
                                            background: tx.type === 'pemasukan' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: tx.type === 'pemasukan' ? 'var(--success)' : 'var(--danger)'
                                        }}>
                                            {tx.type === 'pemasukan' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: '600', marginBottom: '4px', fontSize: '16px', letterSpacing: '0.5px' }}>{tx.category}</h4>
                                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{tx.date}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        <span style={{
                                            fontWeight: '700', fontSize: '18px', fontFamily: 'Outfit',
                                            color: tx.type === 'pemasukan' ? 'var(--success)' : 'var(--danger)'
                                        }}>
                                            {tx.type === 'pemasukan' ? '+' : '-'}{formatRupiah(tx.amount)}
                                        </span>
                                        <button
                                            onClick={() => handleDelete(tx.id)}
                                            style={{
                                                background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: 'var(--danger)',
                                                cursor: 'pointer', width: '36px', height: '36px',
                                                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                transition: 'all 0.2s'
                                            }}
                                            title="Hapus Transaksi"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
