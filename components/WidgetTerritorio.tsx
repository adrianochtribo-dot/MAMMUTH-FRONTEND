'use client'

import { useState, useEffect } from 'react'

const SUPABASE_URL = 'https://pwfsuefyiiwnltikcdho.supabase.co'
const SUPABASE_KEY = 'sb_publishable_5sHvYKX3YL7RI_RwpJK9FQ_-A2G7H63'
const ACCENT = '#E83E7C'

const MESI = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre']
const GIORNI = ['domenica','luned\u00EC','marted\u00EC','mercoled\u00EC','gioved\u00EC','venerd\u00EC','sabato']

const CANALI = [
  { label: 'WhatsApp', tipo: 'wa' },
  { label: 'Instagram', tipo: 'ig' },
  { label: 'Facebook', tipo: 'fb' },
  { label: 'Telegram', tipo: 'tg' },
  { label: 'TikTok', tipo: 'tk' },
  { label: 'YouTube', tipo: 'yt' },
]

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
  const [meteo, setMeteo] = useState<{ temp: number; perc: number; desc: string; luogo: string } | null>(null)
  const [meteoErr, setMeteoErr] = useState(false)
  const [eventi, setEventi] = useState<number | null>(null)
  const [prossimo, setProssimo] = useState<{ titolo: string; quando: string } | null>(null)
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null)
  const [eventiRaw, setEventiRaw] = useState<{ titolo: string; d: Date; lat: number | null; lng: number | null }[]>([])

  const oggi = new Date()
  const giornoCap = GIORNI[oggi.getDay()].charAt(0).toUpperCase() + GIORNI[oggi.getDay()].slice(1)
  const giornoAbbr = GIORNI[oggi.getDay()].slice(0, 3)
  const giornoAbbrCap = giornoAbbr.charAt(0).toUpperCase() + giornoAbbr.slice(1)
  const dataLine = `${giornoAbbrCap}, ${oggi.getDate()} ${MESI[oggi.getMonth()].slice(0, 3)}`
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

    // meteo basato sulla posizione reale dell'utente; fallback Sermoneta
    const caricaMeteo = (lat: number, lng: number, nomeNoto?: string) => {
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 6000)
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,weather_code`, { signal: ctrl.signal })
        .then(r => r.json())
        .then(d => {
          clearTimeout(to)
          if (!d.current) { setMeteoErr(true); return }
          const code = d.current.weather_code
          const desc = code === 0 ? 'sereno' : code < 4 ? 'poco nuvoloso' : code < 50 ? 'nuvoloso' : code < 70 ? 'pioggia' : 'variabile'
          const set = (luogo: string) => setMeteo({ temp: Math.round(d.current.temperature_2m), perc: Math.round(d.current.apparent_temperature), desc, luogo })
          if (nomeNoto) { set(nomeNoto); return }
          // ricava il nome della citta dalle coordinate
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=it`)
            .then(r => r.json())
            .then(g => set(g.city || g.locality || g.principalSubdivision || 'zona attuale'))
            .catch(() => set('zona attuale'))
        })
        .catch(() => { setMeteoErr(true) })
    }

    // rileva la posizione dall'IP della connessione (nessun permesso richiesto); ultima spiaggia Sermoneta
    const viaIP = () => {
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 6000)
      fetch('https://ipwho.is/', { signal: ctrl.signal })
        .then(r => r.json())
        .then(g => {
          clearTimeout(to)
          if (g && g.success !== false && g.latitude && g.longitude) {
            caricaMeteo(g.latitude, g.longitude, g.city || g.region || 'zona attuale')
          } else {
            caricaMeteo(41.55, 12.99, 'Sermoneta')
          }
        })
        .catch(() => caricaMeteo(41.55, 12.99, 'Sermoneta'))
    }
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => caricaMeteo(pos.coords.latitude, pos.coords.longitude),
        () => viaIP(),
        { timeout: 5000, maximumAge: 600000 }
      )
    } else {
      viaIP()
    }

    fetch(`${SUPABASE_URL}/rest/v1/eventi_catalogo_pubblico?select=*`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    })
      .then(r => r.json())
      .then(d => {
        if (!Array.isArray(d)) return
        setEventi(d.length)
        // prossimo evento reale: cerca titolo e data tra i nomi colonna possibili
        const t0 = new Date(); t0.setHours(0, 0, 0, 0)
        const lista = d
          .map((e: any) => ({
            titolo: e.titolo || e.nome || e.titolo_evento || e.name || '',
            raw: e.data_inizio || e.data || e.data_evento || e.inizio || '',
          }))
          .filter((e: any) => e.titolo && e.raw)
          .map((e: any) => ({ titolo: e.titolo, d: new Date(e.raw) }))
          .filter((e: any) => !isNaN(e.d.getTime()) && e.d >= t0)
          .sort((a: any, b: any) => a.d.getTime() - b.d.getTime())
        if (lista.length) {
          const ev = lista[0]
          const diff = Math.round((ev.d.getTime() - t0.getTime()) / 86400000)
          const quando = diff === 0 ? 'oggi' : diff === 1 ? 'domani' : `${ev.d.getDate()} ${MESI[ev.d.getMonth()].slice(0, 3)}`
          setProssimo({ titolo: ev.titolo, quando })
        }
      })
      .catch(() => {})

    return () => { clearInterval(id) }
  }, [])

  const pieno = eventi ? Math.min(100, eventi) : 0
  const rigaEvento = prossimo
    ? `${prossimo.titolo} \u2022 ${prossimo.quando}`
    : `Sermoneta \u2022 oggi`

  const voceStyle = { display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 4px', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' } as const
  const cerchioStyle = { width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } as const
  const headStyle = { fontSize: '1.35rem', fontWeight: 700, color: '#fff', marginBottom: '6px' } as const
  const subStyle = { fontSize: '.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.45 } as const

  return (
    <aside
      style={{
        backgroundColor: '#161616',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
        backgroundSize: '14px 14px',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        padding: '40px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
        width: '300px',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {/* righe data + prossimo evento (dinamiche) */}
      <div>
        <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{dataLine}</div>
        <div style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '4px', display: 'flex', gap: '6px' }}>
          <span style={{ color: ACCENT }}>{'\u2022'}</span>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prossimo ? prossimo.titolo : 'Sermoneta'} <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{prossimo ? prossimo.quando : 'oggi'}</span></span>
        </div>
      </div>

      {/* giorno grande corsivo (dinamico) */}
      <div style={{ fontFamily: "'Snell Roundhand','Brush Script MT',cursive", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(3rem,6vw,4.4rem)', lineHeight: 1, color: ACCENT }}>
        {giornoCap}
      </div>

      {/* Meteo (dinamico) */}
      <div>
        <div style={headStyle}>Meteo</div>
        <div style={subStyle}>
          {meteo ? `A ${meteo.luogo} ${meteo.desc}, ${meteo.temp}\u00B0C. Percepiti ${meteo.perc}\u00B0C.` : meteoErr ? 'Meteo non disponibile.' : 'Caricamento meteo\u2026'}
        </div>
      </div>

      {/* mese + settimana + orologio live (dinamici) */}
      <div>
        <div style={headStyle}>{meseNome}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {settimana.map((d, i) => (
            <span key={i} style={{ fontSize: d.oggi ? '1.4rem' : '.92rem', color: d.oggi ? '#fff' : 'rgba(255,255,255,0.32)', fontWeight: d.oggi ? 700 : 400 }}>{d.n}</span>
          ))}
        </div>
        <div style={{ position: 'relative', marginTop: '16px' }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.22)' }} />
          <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: '#161616', paddingLeft: '10px', fontSize: '1.3rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{ora}</span>
        </div>
      </div>

      {/* Catalogo (dinamico) */}
      <div>
        <div style={headStyle}>Catalogo</div>
        <div style={{ ...subStyle, marginBottom: '12px' }}>
          {eventi !== null ? `${eventi} eventi certificati nel territorio.` : 'Conteggio eventi\u2026'}
        </div>
        <div style={{ position: 'relative', height: '4px', borderRadius: '3px', background: 'rgba(255,255,255,0.14)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '4px', borderRadius: '3px', width: `${pieno}%`, background: ACCENT, transition: 'width 1s ease' }} />
          <div style={{ position: 'absolute', top: '-4px', left: `${pieno}%`, width: '12px', height: '12px', borderRadius: '50%', background: '#fff', transform: 'translateX(-50%)' }} />
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
