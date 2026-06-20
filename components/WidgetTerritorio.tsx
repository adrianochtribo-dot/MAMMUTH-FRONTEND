'use client'

import { useState, useEffect } from 'react'

// Widget verticale stile lockscreen telefono — colonna sinistra della home.
// Dati reali: data di oggi, meteo Sermoneta (Open-Meteo, no key), conteggio eventi (Supabase REST).

const SUPABASE_URL = 'https://pwfsuefyiiwnltikcdho.supabase.co'
const SUPABASE_KEY = 'sb_publishable_5sHvYKX3YL7RI_RwpJK9FQ_-A2G7H63'

const VOCI = [
  { label: 'Mappa', href: '#mappa', icon: '◎' },
  { label: 'Architettura', href: '#architettura', icon: '⬡' },
  { label: 'Console', href: 'https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/console.html', icon: '⌘' },
  { label: 'Developer Portal', href: 'https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/developer-index.html', icon: '⟁' },
  { label: 'Pitch Deck', href: 'https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/pitch.html', icon: '◳' },
]

export default function WidgetTerritorio() {
  const [meteo, setMeteo] = useState<{ temp: number; perc: number; desc: string } | null>(null)
  const [eventi, setEventi] = useState<number | null>(null)

  const oggi = new Date()
  const giorno = oggi.toLocaleDateString('it-IT', { weekday: 'long' })
  const giornoCap = giorno.charAt(0).toUpperCase() + giorno.slice(1)
  const dataBreve = oggi.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })
  const settimana = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(oggi)
    d.setDate(oggi.getDate() + i)
    return { n: d.getDate(), oggi: i === 0 }
  })
  const ora = oggi.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })

  useEffect(() => {
    // Meteo reale Sermoneta (lat 41.55, lng 12.99) — Open-Meteo, nessuna chiave
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.55&longitude=12.99&current=temperature_2m,apparent_temperature,weather_code')
      .then(r => r.json())
      .then(d => {
        if (d.current) {
          const code = d.current.weather_code
          const desc = code === 0 ? 'sereno' : code < 4 ? 'poco nuvoloso' : code < 50 ? 'nuvoloso' : code < 70 ? 'pioggia' : 'variabile'
          setMeteo({ temp: Math.round(d.current.temperature_2m), perc: Math.round(d.current.apparent_temperature), desc })
        }
      })
      .catch(() => {})

    // Conteggio eventi reale dal catalogo (stesso fetch della console.html)
    fetch(`${SUPABASE_URL}/rest/v1/eventi_catalogo_pubblico?select=*`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setEventi(d.length) })
      .catch(() => {})
  }, [])

  const pieno = eventi ? Math.min(100, Math.round((eventi / 100) * 100)) : 0

  return (
    <aside
      style={{
        backgroundColor: '#1a1a1a',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
        backgroundSize: '14px 14px',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        padding: '40px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
        width: '280px',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {/* data in alto */}
      <div>
        <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,0.6)' }}>{dataBreve}</div>
        <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>Sermoneta · oggi</div>
      </div>

      {/* giorno grande in corsivo */}
      <div style={{ fontFamily: "'Snell Roundhand','Brush Script MT',cursive", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(2.6rem,4vw,3.6rem)', lineHeight: 1, color: '#E879A0' }}>
        {giornoCap}
      </div>

      {/* meteo */}
      <div>
        <div style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '6px' }}>Meteo</div>
        <div style={{ fontSize: '.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
          {meteo
            ? `A Sermoneta ${meteo.desc}, temperatura ${meteo.temp}°C. Percepiti ${meteo.perc}°C.`
            : 'Caricamento meteo…'}
        </div>
      </div>

      {/* settimana + ora */}
      <div>
        <div style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '10px' }}>Giugno</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {settimana.map((d, i) => (
            <span key={i} style={{ fontSize: '.9rem', color: d.oggi ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: d.oggi ? 600 : 400 }}>{d.n}</span>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: '10px', paddingTop: '6px', textAlign: 'right', fontSize: '1.1rem', fontWeight: 600 }}>{ora}</div>
      </div>

      {/* "batteria" = eventi catalogo */}
      <div>
        <div style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '6px' }}>Catalogo</div>
        <div style={{ fontSize: '.82rem', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>
          {eventi !== null ? `${eventi} eventi certificati nel territorio.` : 'Conteggio eventi…'}
        </div>
        <div style={{ position: 'relative', height: '4px', borderRadius: '3px', background: 'rgba(255,255,255,0.12)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '4px', borderRadius: '3px', width: `${pieno}%`, background: '#E879A0', transition: 'width 1s ease' }} />
          <div style={{ position: 'absolute', top: '-3.5px', left: `${pieno}%`, width: '11px', height: '11px', borderRadius: '50%', background: '#fff', transform: 'translateX(-50%)' }} />
        </div>
      </div>

      {/* lista voci con iconcine */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
        {VOCI.map((v) => (
          <a
            key={v.label}
            href={v.href}
            target={v.href.startsWith('http') ? '_blank' : undefined}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '11px 4px', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{v.icon}</span>
            <span style={{ fontSize: '.92rem' }}>{v.label}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}
