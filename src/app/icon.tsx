import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                }}
            >
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8b5cf6, #4c1d95)',
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    }}
                >
                    <span style={{ color: 'white', fontSize: 18, fontWeight: 800, fontFamily: 'sans-serif', marginTop: '-2px' }}>
                        H
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}
