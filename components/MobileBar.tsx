'use client'

import { useState } from 'react'
import WidgetTerritorio from '@/components/WidgetTerritorio'

// Drawer mobile (<lg): rende la barra Territorio raggiungibile su iPhone
// tramite una maniglia ☰ sul bordo sinistro. Su desktop non renderizza nulla.
// NON modifica WidgetTerritorio: lo avvolge soltanto.
export default function MobileBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      {/* MANIGLIA sul bordo sinistro per aprire la barra */}
      {!open && (
        <button
          aria-label="Apri il pannello Territorio"
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)',
            zIndex: 60, width: '34px', height: '66px',
            borderTopRightRadius: '14px', borderBottomRightRadius: '14px',
            background: '#161616', color: '#FAF7F2',
            border: '1px solid rgba(250,247,242,0.18)', borderLeft: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '2px 0 14px rgba(0,0,0,0.30)', cursor: 'pointer',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      )}

      {/* BACKDROP */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 65,
          background: 'rgba(0,0,0,0.45)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .28s ease',
        }}
      />

      {/* DRAWER con la barra dentro */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 66,
          transform: open ? 'translateX(0)' : 'translateX(-105%)',
          transition: 'transform .3s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: open ? '8px 0 32px rgba(0,0,0,0.35)' : 'none',
          willChange: 'transform',
        }}
      >
        <button
          aria-label="Chiudi"
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            width: '32px', height: '32px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(250,247,242,0.12)', color: '#FAF7F2',
            border: '1px solid rgba(250,247,242,0.22)', cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
        <WidgetTerritorio />
      </div>
    </div>
  )
}
