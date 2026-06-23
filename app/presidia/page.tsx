'use client';
import Link from 'next/link'
import { useState } from 'react'
import SentinellaForm from '@/components/SentinellaForm'

export default function PresidiaPage() {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="presidia-bg min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#F5F5F7' }}
    >
      {/* SFONDO DINAMICO — tre velature pastello molto desaturate (rosa antico, ocra tenue, salvia).
          Si muovono lentamente; ferme se l'utente preferisce ridurre il movimento. */}
      <div className="presidia-aura presidia-aura-1" aria-hidden="true" />
      <div className="presidia-aura presidia-aura-2" aria-hidden="true" />
      <div className="presidia-aura presidia-aura-3" aria-hidden="true" />

      <style>{`
        .presidia-bg {
          background:
            radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.65) 0%, rgba(245,245,247,0) 55%),
            #F5F5F7;
        }
        .presidia-aura {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.55;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
        }
        .presidia-aura-1 {
          width: 46vw; height: 46vw;
          top: -8vw; left: -6vw;
          background: radial-gradient(circle at 30% 30%, #D8A7B1, rgba(216,167,177,0) 70%);
          animation: presidiaFloat1 28s ease-in-out infinite;
        }
        .presidia-aura-2 {
          width: 50vw; height: 50vw;
          bottom: -12vw; right: -10vw;
          background: radial-gradient(circle at 60% 40%, #D8C49A, rgba(216,196,154,0) 70%);
          animation: presidiaFloat2 34s ease-in-out infinite;
        }
        .presidia-aura-3 {
          width: 40vw; height: 40vw;
          top: 35%; left: 55%;
          background: radial-gradient(circle at 50% 50%, #A9BBA0, rgba(169,187,160,0) 70%);
          animation: presidiaFloat3 31s ease-in-out infinite;
        }
        @keyframes presidiaFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(4vw,3vw) scale(1.08); }
        }
        @keyframes presidiaFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-5vw,-2vw) scale(1.1); }
        }
        @keyframes presidiaFloat3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-3vw,4vw) scale(0.92); }
        }
        @media (prefers-reduced-motion: reduce) {
          .presidia-aura { animation: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '640px', position: 'relative', zIndex: 1 }}>
        {/* TASTO TORNA ALLA HOME — glass / futuristico */}
        <div className="mb-6">
          <Link
            href="/"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              color: hover ? '#fff' : '#1D1D1F',
              background: hover
                ? 'linear-gradient(135deg, #8B7CF6, #E879A0)'
                : 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(139,124,246,0.45)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: hover
                ? '0 8px 28px rgba(139,124,246,0.45)'
                : '0 2px 12px rgba(0,0,0,0.08)',
              transform: hover ? 'translateY(-1px)' : 'translateY(0)',
              transition: 'all 0.25s ease',
            }}
          >
            <span style={{ fontSize: '16px', lineHeight: 1 }}>←</span>
            Torna alla Home
          </Link>
        </div>

        <SentinellaForm />

        {/* SEZIONE ISTRUZIONI — sotto il form, micro-copy ad alta densità */}
        <div
          style={{
            marginTop: '28px',
            padding: '28px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(0,0,0,0.06)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B8860B',
              margin: '0 0 8px',
            }}
          >
            A cosa serve
          </p>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.55,
              color: 'rgba(29,29,31,0.82)',
              margin: '0 0 22px',
            }}
          >
            Una Sentinella presidia il proprio borgo: segnala gli eventi reali del territorio
            — sagre, feste, palii, riti — perché non vadano persi. Tu conosci il tuo paese meglio
            di qualsiasi algoritmo. MAMMUTH raccoglie le tue segnalazioni, le verifica e le porta
            nel catalogo pubblico, proteggendo la memoria identitaria locale dal rumore e dalle
            notizie inventate.
          </p>

          <ol
            style={{
              listStyle: 'none',
              counterReset: 'passi',
              margin: 0,
              padding: 0,
              display: 'grid',
              gap: '14px',
            }}
          >
            {[
              { t: 'Scegli il tuo borgo', d: 'Seleziona il comune che vuoi presidiare dal menu a tendina.' },
              { t: 'Lascia un contatto', d: 'Telegram, email o telefono: ci serve solo per ricontattarti, resta privato.' },
              { t: 'Segnala gli eventi futuri', d: 'Invia la candidatura: poi proponi gli eventi del territorio e MAMMUTH li valida.' },
            ].map((p, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '26px',
                    height: '26px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1D1D1F',
                    background: 'linear-gradient(135deg, #F5D98B, #E8B84B)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(29,29,31,0.82)' }}>
                  <strong style={{ color: '#1D1D1F', fontWeight: 600 }}>{p.t}.</strong>{' '}
                  {p.d}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
