"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Activity, BookOpen, Rocket, ShieldCheck, Sparkles, PieChart, CheckCircle, LayoutDashboard } from 'lucide-react';

export default function LandingPage() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setHasSession(!!session);
    };
    checkSession();
  }, []);
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 80px', zIndex: 50,
        background: 'rgba(10, 10, 15, 0.7)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/hitera.png" alt="Hitera Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }} />
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Outfit', letterSpacing: '2px', color: '#5b21b6' }}>
            HITERA
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {hasSession ? (
            <Link href="/dashboard" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '12px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', transition: 'transform 0.2s', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600', padding: '10px 20px', transition: 'color 0.2s', fontSize: '15px' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                Masuk
              </Link>
              <Link href="/register" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '12px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', transition: 'transform 0.2s', fontSize: '15px' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                Daftar Gratis
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="animate-fade-in" style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '160px 20px 60px', position: 'relative', overflow: 'hidden'
      }}>
        {/* Glow Element */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)', zIndex: 0 }}></div>

        <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '30px', border: '1px solid rgba(139, 92, 246, 0.3)', color: 'var(--accent-hover)', fontWeight: '600', marginBottom: '32px', letterSpacing: '1px', fontSize: '13px' }}>
            <Sparkles size={16} /> REVOLUSI PRODUKTIVITAS ANDA
          </div>

          <h1 style={{ fontSize: '72px', fontWeight: '800', lineHeight: '1.1', marginBottom: '32px', letterSpacing: '-2px' }}>
            <span className="gradient-text">Welcome to </span>
            <span style={{ color: '#5b21b6' }}>HITERA</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '20px', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 56px' }}>
            Platform manajemen hidup serba super. Kontrol arus kas finansial, lestarikan kebugaran tubuh, dan atur aktivitas harian dalam satu bilik brankas (Vault) ultra-aman.
          </p>

          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
            {hasSession ? (
              <Link href="/dashboard" className="styled-button" style={{ maxWidth: '320px', padding: '18px', textDecoration: 'none' }}>
                Kembali ke Vault <ArrowRight size={20} />
              </Link>
            ) : (
              <>
                <Link href="/register" className="styled-button" style={{ maxWidth: '240px', padding: '18px', textDecoration: 'none' }}>
                  Mulai Sekarang <ArrowRight size={20} />
                </Link>
                <Link href="/login" className="styled-button styled-button-outline" style={{ maxWidth: '240px', padding: '18px', textDecoration: 'none' }}>
                  Masuk ke Vault
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }} className="gradient-text">Semua Kebutuhan Dalam Satu Tempat</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Hilangkan paksaan untuk berpindah-pindah aplikasi yang sangat merepotkan waktu Anda.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>

          {/* Card 1 */}
          <div className="glass-panel" style={{ padding: '48px 40px', borderTop: '4px solid var(--success)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <PieChart size={32} />
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>Keuangan Kokoh</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '16px' }}>
              Catat pemasukan dan pengeluaran secara reaktif. Hitera memberikan kalkulasi otomatis ringkasan saldo agar Anda senantiasa mendominasi pergerakan rasio keuangan pribadi Anda.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel" style={{ padding: '48px 40px', borderTop: '4px solid var(--info)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--info)' }}>
              <Activity size={32} />
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>Infrastruktur Fisik</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '16px' }}>
              Sistem dinamis pencatatan asupan air mingguan, metrik berat badan, dan akurasi durasi jam tidur. Karena badan yang sehat merupakan fondasi memancarkan karisma yang prima.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel" style={{ padding: '48px 40px', borderTop: '4px solid var(--warning)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
              <BookOpen size={32} />
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>Jurnal Pemikiran</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '16px' }}>
              Temukan kanvas yang super luas dan rileks untuk menumpahkan refleksi, target resolusi, maupun ide-ide liar Anda. Tergabung instan dengan modul pelacakan Tugas harian (To-do List/Checklists).
            </p>
          </div>

        </div>
      </section>

      {/* Trust & Security Section */}
      <section style={{ padding: '120px 20px', background: 'rgba(0,0,0,0.4)', marginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>

          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '24px', borderRadius: '50%', boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}>
            <ShieldCheck size={64} color="var(--accent-hover)" />
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-1px' }} className="gradient-text">Arsitektur Kelas Enterprise</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '20px', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto' }}>
              Hitera dirancang eksklusif untuk menjaga privasi paling ketat yang belum pernah ada sebelumnya. Dilengkapi environment <strong>Supabase (PostgreSQL)</strong> yang terenkripsi dan keamanan basis-data melalui <em>Row Level Security (RLS)</em>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', fontWeight: '600' }}>
              <CheckCircle color="var(--success)" size={24} /> Enkripsi Anon & Role Key
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', fontWeight: '600' }}>
              <CheckCircle color="var(--success)" size={24} /> UUID Generasi V4
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', fontWeight: '600' }}>
              <CheckCircle color="var(--success)" size={24} /> Bebas Pelacak (No Tracking)
            </div>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '32px', letterSpacing: '-1px' }}>Saatnya Ambil Kendali.</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '22px', marginBottom: '56px' }}>Bergabung secara cuma-cuma hari ini. Susun arsitektur strategik hidupmu dari sekarang.</p>
        <Link href="/register" className="styled-button" style={{ maxWidth: '320px', padding: '24px', fontSize: '20px', textDecoration: 'none', margin: '0 auto' }}>
          Buka Pintu Vault <Rocket size={24} />
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 20px', borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', background: 'var(--bg-primary)' }}>
        <p>&copy; {new Date().getFullYear()} HITERA Productivity Suite. Dirancang komprehensif untuk kesempurnaan gaya hidup Anda.</p>
      </footer>
    </div>
  );
}
