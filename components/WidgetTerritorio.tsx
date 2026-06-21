'use client'

import { useState, useEffect } from 'react'

const SUPABASE_URL = 'https://pwfsuefyiiwnltikcdho.supabase.co'
const SUPABASE_KEY = 'sb_publishable_5sHvYKX3YL7RI_RwpJK9FQ_-A2G7H63'
const ACCENT = '#E83E7C'
const MILK = '#FAF7F2'

const MESI = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre']
const GIORNI = ['domenica','luned\u00EC','marted\u00EC','mercoled\u00EC','gioved\u00EC','venerd\u00EC','sabato']

// distanza in km tra due coordinate (haversine)
function distanzaKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

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
  const c = { width: 20, height: 20, fill: 'none', stroke: MILK, strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (tipo) {
    case 'wa': return <svg viewBox="0 0 24 24" {...c}><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l.5-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" fill={MILK} stroke="none"/></svg>
    case 'ig': return <svg viewBox="0 0 24 24" {...c}><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".8" fill={MILK} stroke="none"/></svg>
    case 'fb': return <svg viewBox="0 0 24 24" {...c}><path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V8z" fill={MILK} stroke="none"/></svg>
    case 'tg': return <svg viewBox="0 0 24 24" {...c}><path d="M21 5L3 12l5 2 2 5 3-3 4 3 4-14z"/><path d="M8 14l9-6-6 7" fill="none"/></svg>
    case 'tk': return <svg viewBox="0 0 24 24" {...c}><path d="M9 18V6l9-2v10"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="14" r="2.5"/></svg>
    case 'yt': return <svg viewBox="0 0 24 24" {...c}><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9.5l5 2.5-5 2.5z" fill={MILK} stroke="none"/></svg>
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

    // meteo sulla posizione reale; persisti=true salva la scelta (GPS o manuale) sul dispositivo
    const caricaMeteo = (lat: number, lng: number, nomeNoto?: string, persisti?: boolean) => {
      setUserPos({ lat, lng })
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 6000)
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,weather_code`, { signal: ctrl.signal })
        .then(r => r.json())
        .then(d => {
          clearTimeout(to)
          if (!d.current) { setMeteoErr(true); return }
          const code = d.current.weather_code
          const desc = code === 0 ? 'sereno' : code < 4 ? 'poco nuvoloso' : code < 50 ? 'nuvoloso' : code < 70 ? 'pioggia' : 'variabile'
          const set = (luogo: string) => {
            setMeteo({ temp: Math.round(d.current.temperature_2m), perc: Math.round(d.current.apparent_temperature), desc, luogo })
            if (persisti) { try { localStorage.setItem('mammuth_geo', JSON.stringify({ lat, lng, nome: luogo })) } catch (e) {} }
          }
          if (nomeNoto) { set(nomeNoto); return }
          // ricava il nome del comune dalle coordinate
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=it`)
            .then(r => r.json())
            .then(g => set(g.city || g.locality || g.principalSubdivision || 'zona attuale'))
            .catch(() => set('zona attuale'))
        })
        .catch(() => { setMeteoErr(true) })
    }


    // rileva la posizione dall'IP della connessione, provando piu servizi in cascata; nessun permesso, nessun popup
    const PROVIDER: { url: string; pick: (g: any) => { lat: number; lng: number; city: string } | null }[] = [
      { url: 'https://ipwho.is/', pick: g => (g && g.success !== false && g.latitude) ? { lat: Number(g.latitude), lng: Number(g.longitude), city: g.city || g.region || '' } : null },
      { url: 'https://get.geojs.io/v1/ip/geo.json', pick: g => (g && g.latitude) ? { lat: Number(g.latitude), lng: Number(g.longitude), city: g.city || g.region || '' } : null },
      { url: 'https://ipapi.co/json/', pick: g => (g && g.latitude) ? { lat: Number(g.latitude), lng: Number(g.longitude), city: g.city || g.region || '' } : null },
      { url: 'https://freeipapi.com/api/json', pick: g => (g && g.latitude) ? { lat: Number(g.latitude), lng: Number(g.longitude), city: g.cityName || g.regionName || '' } : null },
    ]
    const provaProvider = (i: number) => {
      if (i >= PROVIDER.length) { caricaMeteo(41.55, 12.99, 'Sermoneta'); return }
      const p = PROVIDER[i]
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 5000)
      fetch(p.url, { signal: ctrl.signal })
        .then(r => r.json())
        .then(g => {
          clearTimeout(to)
          const res = p.pick(g)
          if (res && !isNaN(res.lat) && !isNaN(res.lng)) caricaMeteo(res.lat, res.lng, res.city || 'zona attuale')
          else provaProvider(i + 1)
        })
        .catch(() => { clearTimeout(to); provaProvider(i + 1) })
    }
    // 0) scelta salvata sul dispositivo  1) GPS preciso (col permesso, salva)  2) ripiego IP
    let salvato: { lat: number; lng: number; nome: string } | null = null
    try { const s = localStorage.getItem('mammuth_geo'); if (s) salvato = JSON.parse(s) } catch (e) {}
    if (salvato && typeof salvato.lat === 'number' && typeof salvato.lng === 'number') {
      caricaMeteo(salvato.lat, salvato.lng, salvato.nome)
    } else if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => caricaMeteo(pos.coords.latitude, pos.coords.longitude, undefined, true),
        () => provaProvider(0),
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 }
      )
    } else {
      provaProvider(0)
    }
    fetch(`${SUPABASE_URL}/rest/v1/eventi_catalogo_pubblico?select=*`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    })
      .then(r => r.json())
      .then(d => {
        if (!Array.isArray(d)) return
        setEventi(d.length)
        const t0 = new Date(); t0.setHours(0, 0, 0, 0)
        const lista = d
          .map((e: any) => ({
            titolo: e.titolo || e.nome || e.titolo_evento || e.name || '',
            raw: e.data_inizio || e.data || e.data_evento || e.inizio || '',
            lat: e.lat ?? e.latitude ?? e.y ?? null,
            lng: e.lng ?? e.longitude ?? e.lon ?? e.x ?? null,
          }))
          .filter((e: any) => e.titolo && e.raw)
          .map((e: any) => ({ titolo: e.titolo, d: new Date(e.raw), lat: e.lat !== null ? Number(e.lat) : null, lng: e.lng !== null ? Number(e.lng) : null }))
          .filter((e: any) => !isNaN(e.d.getTime()) && e.d >= t0)
        setEventiRaw(lista)
      })
      .catch(() => {})

    return () => { clearInterval(id) }
  }, [])

  // sceglie l'evento piu VICINO alla posizione utente; se manca la posizione o le coordinate, il piu vicino come data
  useEffect(() => {
    if (!eventiRaw.length) return
    const t0 = new Date(); t0.setHours(0, 0, 0, 0)
    const conCoord = eventiRaw.filter(e => e.lat !== null && e.lng !== null)
    let scelto = null as null | { titolo: string; d: Date }
    if (userPos && conCoord.length) {
      scelto = [...conCoord]
        .sort((a, b) => distanzaKm(userPos.lat, userPos.lng, a.lat as number, a.lng as number) - distanzaKm(userPos.lat, userPos.lng, b.lat as number, b.lng as number))[0]
    } else {
      scelto = [...eventiRaw].sort((a, b) => a.d.getTime() - b.d.getTime())[0]
    }
    if (scelto) {
      const diff = Math.round((scelto.d.getTime() - t0.getTime()) / 86400000)
      const quando = diff === 0 ? 'oggi' : diff === 1 ? 'domani' : `${scelto.d.getDate()} ${MESI[scelto.d.getMonth()].slice(0, 3)}`
      setProssimo({ titolo: scelto.titolo, quando })
    }
  }, [userPos, eventiRaw])

  const pieno = eventi ? Math.min(100, eventi) : 0

  // testi bianco latte, pesi leggeri uniformati al lato destro della landing
  const voceStyle = { display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 4px', color: MILK, textDecoration: 'none', borderBottom: '1px solid rgba(250,247,242,0.08)' } as const
  const cerchioStyle = { width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(250,247,242,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } as const
  const headStyle = { fontSize: '1.15rem', fontWeight: 500, letterSpacing: '-0.01em', color: MILK, marginBottom: '6px' } as const
  const subStyle = { fontSize: '.82rem', fontWeight: 300, color: 'rgba(250,247,242,0.55)', lineHeight: 1.5 } as const
  const eyebrowStyle = { fontSize: '.58rem', letterSpacing: '.18em', color: 'rgba(250,247,242,0.4)', textTransform: 'uppercase' as const, marginBottom: '6px' } as const

  return (
    <aside
      style={{
        backgroundColor: '#161616',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(250,247,242,0.04) 1px, transparent 0)',
        backgroundSize: '14px 14px',
        color: MILK,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
        padding: '40px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
        width: '300px',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {/* riga data (dinamica) */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.01em' }}>{dataLine}</div>
      </div>

      {/* giorno grande corsivo (dinamico) — rimpicciolito e centrato; font e colore INVARIATI */}
      <div style={{ fontFamily: "'Snell Roundhand','Brush Script MT',cursive", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(2.2rem,4vw,3.1rem)', lineHeight: 1.05, color: ACCENT, textAlign: 'center' }}>
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
            <span key={i} style={{ fontSize: d.oggi ? '1.4rem' : '.92rem', color: d.oggi ? MILK : 'rgba(250,247,242,0.35)', fontWeight: d.oggi ? 600 : 300 }}>{d.n}</span>
          ))}
        </div>
        <div style={{ position: 'relative', marginTop: '16px' }}>
          <div style={{ borderTop: '1px solid rgba(250,247,242,0.2)' }} />
          <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: '#161616', paddingLeft: '10px', fontSize: '1.25rem', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{ora}</span>
        </div>
      </div>

      {/* Catalogo (dinamico) */}
      <div>
        <div style={headStyle}>Catalogo</div>
        <div style={{ ...subStyle, marginBottom: '12px' }}>
          {eventi !== null ? `${eventi} eventi certificati nel territorio.` : 'Conteggio eventi\u2026'}
        </div>
        <div style={{ position: 'relative', height: '4px', borderRadius: '3px', background: 'rgba(250,247,242,0.14)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '4px', borderRadius: '3px', width: `${pieno}%`, background: ACCENT, transition: 'width 1s ease' }} />
          <div style={{ position: 'absolute', top: '-4px', left: `${pieno}%`, width: '12px', height: '12px', borderRadius: '50%', background: MILK, transform: 'translateX(-50%)' }} />
        </div>
      </div>

      {/* CANALI INGESTIONE - da qui arrivano i micro-eventi */}
      <div>
        <div style={eyebrowStyle}>Invia un evento</div>
        {CANALI.map(({ label, tipo }) => (
          <a key={label} href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/console.html" target="_blank" style={voceStyle}>
            <span style={cerchioStyle}><Icona tipo={tipo} /></span>
            <span style={{ fontSize: '.9rem', fontWeight: 300 }}>{label}</span>
          </a>
        ))}
      </div>

      {/* FONTI TERRITORIALI */}
      <div>
        <div style={eyebrowStyle}>Fonti del territorio</div>
        {FONTI.map(({ label, tipo }) => (
          <a key={label} href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/console.html" target="_blank" style={voceStyle}>
            <span style={cerchioStyle}><Icona tipo={tipo} /></span>
            <span style={{ fontSize: '.9rem', fontWeight: 300 }}>{label}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}
