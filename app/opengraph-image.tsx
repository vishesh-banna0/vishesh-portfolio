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
          background: '#282C33',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <svg width="64" height="64" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0H8V4H4H0V8V12V16H4H8V12H12H16V8V4V0H12ZM4 12H8V8H12V4H8V8H4V12Z" fill="#C778DD" fillRule="evenodd" clipRule="evenodd" />
        </svg>
        <div style={{ color: '#C778DD', fontSize: 26, letterSpacing: 6, textTransform: 'uppercase', marginTop: 32 }}>
          {profile.role}
        </div>
        <div style={{ fontSize: 104, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 30, color: '#ABB2BF', marginTop: 28 }}>
          {profile.currently} · {profile.location}
        </div>
        <div
          style={{
            marginTop: 44,
            width: 120,
            height: 6,
            borderRadius: 3,
            background: '#C778DD',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
