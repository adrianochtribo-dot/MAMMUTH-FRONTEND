'use client'

import { useState, useEffect } from 'react'

const SUPABASE_URL = 'https://pwfsuefyiiwnltikcdho.supabase.co'
const SUPABASE_KEY = 'sb_publishable_5sHvYKX3YL7RI_RwpJK9FQ_-A2G7H63'

const MESI = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre']

// Canali da cui arrivano i micro-eventi (ingestione)
const CANALI = [
  { label: 'WhatsApp', tipo: 'wa' },
  { label: 'Instagram', tipo: 'ig' },
  { label: 'Facebook', tipo: 'fb' },
  { label: 'Telegram', tipo: 'tg' },
  { label: 'TikTok', tipo: 'tk' },
  { label: 'YouTube', tipo: 'yt' },
]

// Fonti territoriali che inviano eventi
const FONTI = [
  { label: 'Comuni', tipo: 'comune' },
  { label: 'Pro Loco', tipo: 'proloco' },
  { label: 'Diocesi', tipo: 'diocesi' },
]

function Icona({ tipo }: { tipo: string }) {
  const c = { width: 20, height: 20, fill: 'none', stroke: '#fff', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (tipo) {
    case 'wa': return <svg viewBox="0 0 24 24" {...c}><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l.5-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" fill="#fff" stroke="none"/></svg>
    case 'ig': return <svg viewBox="0 0 24 24" {...c}><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".8" fill="#fff"/></svg>
    case 'fb': return <svg viewBox="0 0 24 24" {...c}><path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V8z" fill="#fff" stroke="none"/></svg>
    case 'tg': return <svg viewBox="0 0 24 24" {...c}><path d="M21 5L3 12l5 2 2 5 3-3 4 3 4-14z"/><path d="M8 14l9-6-6 7" fill="none"/></svg>
    case 'tk': return <svg viewBox="0 0 24 24" {...c}><path d="M9 18V6l9-2v10"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="14" r="2.5"/></svg>
    case 'yt': return <svg viewBox="0 0 24 24" {...c}><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9.5l5 2.5-5 2.5z" fill="#fff" stroke="none"/></svg>
    case 'comune': return <svg viewBox="0 0 24 24" {...c}><path d="M4 21h16M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>
    case 'proloco': return <svg viewBox="0 0 24 24" {...c}><path d="M12 3l8 4v6c0 4-3.5 7-8 8-4.5-1-8-4-8-8V7l8-4z"/><path d="M9 12l2 2 4-4"/></svg>
    case 'diocesi': return <svg viewBox="0 0 24 24" {...c}><path d="M12 3v18M8 7h8M6 21h12M9 12l-3 9M15 12l3 9"/></svg>
    default: return null
  }
}

export default function WidgetTerritorio() {
  const [ora, setOra] = useState('')
  const [meteo, setMeteo] = useState<{ temp: number; perc: number; desc: string } | null>(null)
  const [meteoErr, setMeteoErr] = useState(false)
  const [eventi, setEventi] = useState<number | null>(null)

  const oggi = new Date()
  const giorno = oggi.toLocaleDateString('it-IT', { weekday: 'long' })
  const giornoCap = giorno.charAt(0).toUpperCase() + giorno.slice(1)
  const dataBreve = `${oggi.getDate()} ${MESI[oggi.getMonth()].slice(0,3)}`
  const meseNome = MESI[oggi.getMonth()].charAt(0).toUpperCase() + MESI[oggi.getMonth()].slice(1)
  const settimana = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(oggi)
    d.setDate(oggi.getDate() + i)
    return { n: d.getDate(), oggi: i === 0 }
  })

  useEffect(() => {
    const tick = () => setOra(new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)

    const ctrl = new AbortController()
    const to = setTimeout(() => ctrl.abort(), 6000)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.55&longitude=12.99&current=temperature_2m,apparent_temperature,weather_code', { signal: ctrl.signal })
      .then(r => r.json())
      .then(d => {
        clearTimeout(to)
        if (d.current) {
          const code = d.current.weather_code
          const desc = code === 0 ? 'sereno' : code < 4 ? 'poco nuvoloso' : code < 50 ? 'nuvoloso' : code < 70 ? 'pioggia' : 'variabile'
          setMeteo({ temp: Math.round(d.current.temperature_2m), perc: Math.round(d.current.apparent_temperature), desc })
        } else setMeteoErr(true)
      })
      .catch(() => { setMeteoErr(true) })

    fetch(`${SUPABASE_URL}/rest/v1/eventi_catalogo_pubblico?select=*`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setEventi(d.length) })
      .catch(() => {})

    return () => { clearInterval(id); clearTimeout(to) }
  }, [])

  const pieno = eventi ? Math.min(100, eventi) : 0

  const voceStyle = { display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 4px', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' } as const
  const cerchioStyle = { width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } as const

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
        gap: '22px',
        width: '290px',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <div>
        <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,0.6)' }}>{dataBreve}</div>
        <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{'Sermoneta \u00B7 oggi'}</div>
      </div>

      <div style={{ fontFamily: "'Snell Roundhand','Brush Script MT',cursive", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(2.4rem,4vw,3.4rem)', lineHeight: 1, color: '#E879A0' }}>
        {giornoCap}
      </div>

      <div>
        <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '6px' }}>Meteo</div>
        <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
          {meteo ? `A Sermoneta ${meteo.desc}, ${meteo.temp}\u00B0C. Percepiti ${meteo.perc}\u00B0C.` : meteoErr ? 'Meteo non disponibile.' : 'Caricamento meteo\u2026'}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '10px' }}>{meseNome}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {settimana.map((d, i) => (
            <span key={i} style={{ fontSize: '.88rem', color: d.oggi ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: d.oggi ? 600 : 400, borderBottom: d.oggi ? '2px solid #E879A0' : 'none', paddingBottom: '2px' }}>{d.n}</span>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: '10px', paddingTop: '6px', textAlign: 'right', fontSize: '1.05rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{ora}</div>
      </div>

      <div>
        <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '6px' }}>Catalogo</div>
        <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>
          {eventi !== null ? `${eventi} eventi certificati.` : 'Conteggio eventi\u2026'}
        </div>
        <div style={{ position: 'relative', height: '4px', borderRadius: '3px', background: 'rgba(255,255,255,0.12)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '4px', borderRadius: '3px', width: `${pieno}%`, background: '#E879A0', transition: 'width 1s ease' }} />
          <div style={{ position: 'absolute', top: '-3.5px', left: `${pieno}%`, width: '11px', height: '11px', borderRadius: '50%', background: '#fff', transform: 'translateX(-50%)' }} />
        </div>
      </div>

      {/* CANALI INGESTIONE - da qui arrivano i micro-eventi */}
      <div>
        <div style={{ fontSize: '.58rem', letterSpacing: '.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Invia un evento</div>
        {CANALI.map(({ label, tipo }) => (
          <a key={label} href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/console.html" target="_blank" style={voceStyle}>
            <span style={cerchioStyle}><Icona tipo={tipo} /></span>
            <span style={{ fontSize: '.9rem' }}>{label}</span>
          </a>
        ))}
      </div>

      {/* FONTI TERRITORIALI */}
      <div>
        <div style={{ fontSize: '.58rem', letterSpacing: '.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Fonti del territorio</div>
        {FONTI.map(({ label, tipo }) => (
          <a key={label} href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/console.html" target="_blank" style={voceStyle}>
            <span style={cerchioStyle}><Icona tipo={tipo} /></span>
            <span style={{ fontSize: '.9rem' }}>{label}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}
