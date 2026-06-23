'use client';

import Link from 'next/link'
import { useState } from 'react'
import MammuthCommunity from '@/components/MammuthCommunity'

export default function CommunityPage() {
  const [hover, setHover] = useState(false)

  return (
    <div className="community-bg" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', backgroundColor: '#F5F5F7' }}>
      <style>{`
        .community-grid {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .community-grid {
            grid-template-columns: 1fr 42%;
          }
        }
        .community-col-main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 24px;
        }
        .community-col-foto {
          display: none;
        }
        @media (min-width: 1024px) {
          .community-col-foto {
            display: block;
            position: relative;
          }
        }
        .community-foto {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .community-foto-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(245,245,247,0.9) 0%, rgba(245,245,247,0) 22%);
          pointer-events: none;
        }
        .community-foto-cap {
          position: absolute;
          bottom: 22px;
          right: 22px;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
          font-style: italic;
        }
      `}</style>

      <div className="community-grid">
        {/* COLONNA SINISTRA — mappa + descrizione */}
        <div className="community-col-main">
          <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>

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

            <MammuthCommunity />

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
                  margin: 0,
                }}
              >
                Questa è la mappa viva della copertura territoriale di MAMMUTH. Ogni punto è un
                borgo: acceso quando ha già una Sentinella che lo presidia, spento quando ne cerca
                una. Il conteggio in basso indica quanti borghi della rete hanno oggi un presidio
                attivo. Serve a vedere a colpo d'occhio dove la copertura è viva e dove manca ancora
                un presidio — e a invitare chi conosce un borgo scoperto a candidarsi come Sentinella.
              </p>
            </div>

          </div>
        </div>

        {/* COLONNA DESTRA — foto Villa Fogliano (solo desktop) */}
        <div className="community-col-foto">
          <img className="community-foto" src="/FoglianoLt.jpg" alt="Villa Fogliano (Latina)" />
          <div className="community-foto-overlay" aria-hidden="true" />
          <span className="community-foto-cap">Villa Fogliano · Latina</span>
        </div>
      </div>
    </div>
  )
}
