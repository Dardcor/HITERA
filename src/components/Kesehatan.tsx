import { useState, useEffect } from 'react';
import { HeartPulse, Droplet, Moon, Scale, Plus, Minus } from 'lucide-react';

export default function KesehatanView() {
    const [water, setWater] = useState(0);
    const [sleep, setSleep] = useState('');
    const [weight, setWeight] = useState('');

    // Load
    useEffect(() => {
        const saved = localStorage.getItem('hitera_kesehatan');
        if (saved) {
            const data = JSON.parse(saved);
            setWater(data.water || 0);
            setSleep(data.sleep || '');
            setWeight(data.weight || '');
        }
    }, []);

    // Save
    useEffect(() => {
        localStorage.setItem('hitera_kesehatan', JSON.stringify({ water, sleep, weight }));
    }, [water, sleep, weight]);

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

            <header className="page-header">
                <div className="page-header-icon">
                    <HeartPulse size={32} />
                </div>
                <div>
                    <h1 className="page-title">Manajemen Kesehatan</h1>
                    <p className="page-subtitle">Pencatatan metrik kesehatan harian dan progres kebugaran tubuh Anda.</p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>

                {/* Water Tracker */}
                <div className="glass-panel" style={{ borderTop: '4px solid var(--info)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Droplet size={24} color="var(--info)" /> Asupan Air
                        </h2>
                        <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Target: 8 Gelas</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center', margin: '32px 0' }}>
                        <button
                            onClick={() => setWater(Math.max(0, water - 1))}
                            className="icon-btn" style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '16px', borderRadius: '16px', color: 'var(--info)' }}>
                            <Minus size={24} />
                        </button>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'Outfit, sans-serif', color: 'var(--info)' }}>{water}</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '14px', letterSpacing: '1px' }}>GELAS</span>
                        </div>
                        <button
                            onClick={() => setWater(Math.min(20, water + 1))}
                            className="icon-btn" style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '16px', borderRadius: '16px', color: 'var(--info)' }}>
                            <Plus size={24} />
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                        <div style={{ height: '100%', width: `${Math.min(100, (water / 8) * 100)}%`, background: 'var(--info)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)', borderRadius: '10px' }}></div>
                    </div>
                </div>

                {/* Sleep Tracker */}
                <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-hover)' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <Moon size={24} color="var(--accent-hover)" /> Jam Tidur
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>Catat total durasi istirahat Anda semalam</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                        <input
                            type="number"
                            value={sleep}
                            onChange={(e) => setSleep(e.target.value)}
                            className="styled-input"
                            placeholder="0"
                            style={{ width: '140px', fontSize: '40px', textAlign: 'center', padding: '24px 16px', fontWeight: '700', fontFamily: 'Outfit' }}
                        />
                        <span style={{ fontSize: '20px', color: 'var(--text-secondary)', fontWeight: '500' }}>Jam</span>
                    </div>
                </div>

                {/* Weight Tracker */}
                <div className="glass-panel" style={{ borderTop: '4px solid var(--warning)' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <Scale size={24} color="var(--warning)" /> Berat Badan
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>Pantau perkembangan massa fisik tubuh Anda</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="styled-input"
                            placeholder="0.0"
                            step="0.1"
                            style={{ width: '160px', fontSize: '40px', textAlign: 'center', padding: '24px 16px', fontWeight: '700', fontFamily: 'Outfit' }}
                        />
                        <span style={{ fontSize: '20px', color: 'var(--text-secondary)', fontWeight: '500' }}>Kg</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
