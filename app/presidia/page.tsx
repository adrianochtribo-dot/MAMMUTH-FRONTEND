'use client';

import Link from 'next/link'
import { useState } from 'react'
import SentinellaForm from '@/components/SentinellaForm'

export default function PresidiaPage() {
  const [hover, setHover] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{backgroundColor:'#F5F5F7'}}>
      <div style={{width:'100%',maxWidth:'640px'}}>

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
      </div>
    </div>
  )
}
