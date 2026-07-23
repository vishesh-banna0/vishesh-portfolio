import { ImageResponse } from 'next/og';
import { getProfile } from '@/lib/queries';

// Render on request (not at build) — avoids a @vercel/og font-path issue on Windows
// builds; generates fine on Vercel/Linux at runtime.
export const dynamic = 'force-dynamic';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Vishesh Shekhawat — ML / AI Systems Engineer';

export default async function OpengraphImage() {
  const profile = await getProfile();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: '#0a0b0e',
          color: '#f2f4f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ color: '#f5a623', fontSize: 26, letterSpacing: 6, textTransform: 'uppercase' }}>
          {profile.role}
        </div>
        <div style={{ fontSize: 104, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 30, color: '#98a2b3', marginTop: 28 }}>
          {profile.currently} · {profile.location}
        </div>
        <div
          style={{
            marginTop: 44,
            width: 120,
            height: 6,
            borderRadius: 3,
            background: '#f5a623',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
