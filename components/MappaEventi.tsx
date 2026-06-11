'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const SUPABASE_URL = 'https://pwfsuefyiiwnltikcdho.supabase.co'
const SUPABASE_KEY = 'sb_publishable_5sHvYKX3YL7RI_RwpJK9FQ_-A2G7H63'

const CATEGORIA_COLORI: Record<string, string> = {
  'FESTA_RELIGIOSA': '#C9A96E',
  'SAGRA_GASTRONOMICA': '#E67E22',
  'FESTIVAL_MUSICA': '#9B59B6',
  'FESTIVAL_ARTE': '#3498DB',
  'RIEVOCAZIONE_STORICA': '#E74C3C',
  'FIERA': '#2ECC71',
  'CULTURA': '#1ABC9C',
  'MUSICA': '#9B59B6',
  'ENOGASTRONOMIA': '#E67E22',
  'default': '#8B7355',
}

function getColore(categoria: string): string {
  return CATEGORIA_COLORI[categoria?.toUpperCase()] || CATEGORIA_COLORI.default
}

function jitter(lat: number, lng: number, index: number): [number, number] {
  const angle = (index * 137.5 * Math.PI) / 180
  const radius = 0.0003 + (index % 5) * 0.0001
  return [lat + Math.cos(angle) * radius, lng + Math.sin(angle) * radius]
}

const categorie = ['TUTTE', ...Object.keys(CATEGORIA_COLORI).filter(k => k !== 'default')]

interface Evento {
  id: number
  titolo: string
  categoria: string
  luogo: string
  data_inizio: string
  gratuito: boolean
  prezzo_min: number | null
  descrizione: string
  lat: number
  lng: number
}

export default function MappaEventi() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const leafletRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [loading, setLoading] = useState(true)
  const [eventi, setEventi] = useState<Evento[]>([])
  const [error, setError] = useState<string | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState<string>('TUTTE')
  const [filtroGratuito, setFiltroGratuito] = useState<boolean>(false)
  const [filtroTesto, setFiltroTesto] = useState<string>('')
  const [eventoSelezionato, setEventoSelezionato] = useState<Evento | null>(null)

  const aggiornaMarker = useCallback((eventiDaFiltrare: Evento[]) => {
    const L = leafletRef.current
    const map = mapInstanceRef.current
    if (!L || !map) return

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const eventiFiltrati = eventiDaFiltrare.filter(ev => {
      if (filtroCategoria !== 'TUTTE' && ev.categoria?.toUpperCase() !== filtroCategoria) return false
      if (filtroGratuito && !ev.gratuito) return false
      if (filtroTesto && !ev.titolo?.toLowerCase().includes(filtroTesto.toLowerCase()) && !ev.luogo?.toLowerCase().includes(filtroTesto.toLowerCase())) return false
      return true
    })

    const coordCount: Record<string, number> = {}

    eventiFiltrati.forEach((evento: Evento) => {
      if (!evento.lat || !evento.lng) return
      const lat = parseFloat(String(evento.lat))
      const lng = parseFloat(String(evento.lng))
      if (isNaN(lat) || isNaN(lng)) return

      const key = `${lat},${lng}`
      coordCount[key] = (coordCount[key] || 0) + 1
      const idx = coordCount[key] - 1
      const [jLat, jLng] = idx === 0 ? [lat, lng] : jitter(lat, lng, idx)

      const colore = getColore(evento.categoria)
      const icona = L.divIcon({
        html: `<div style="width:16px;height:16px;border-radius:50%;background:${colore};border:2px solid white;box-shadow:0 0 8px rgba(0,0,0,0.3);cursor:pointer;transition:transform 0.2s"></div>`,
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })

      const marker = L.marker([jLat, jLng], { icon: icona })
        .addTo(map)
        .on('click', () => {
          setEventoSelezionato(evento)
        })

      markersRef.current.push(marker)
    })
  }, [filtroCategoria, filtroGratuito, filtroTesto])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mapInstanceRef.current) return

    const init = async () => {
      try {
        const L = (await import('leaflet')).default
        leafletRef.current = L
        if (!mapRef.current) return

        const map = L.map(mapRef.current).setView([41.550, 12.983], 14)
        mapInstanceRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/eventi?select=id,titolo,categoria,luogo,data_inizio,gratuito,prezzo_min,descrizione,lat,lng`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        )

        if (!res.ok) throw new Error(`Errore fetch: ${res.status}`)
        const data = await res.json()
        setEventi(data)
        setLoading(false)
      } catch (err: any) {
        setError(`Errore: ${err.message}`)
        setLoading(false)
      }
    }

    init()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (eventi.length > 0 && leafletRef.current) {
      aggiornaMarker(eventi)
    }
  }, [eventi, aggiornaMarker])

  if (error) return <div style={{color:'#E74C3C',padding:'16px'}}>{error}</div>

  const eventiFiltrati = eventi.filter(ev => {
    if (filtroCategoria !== 'TUTTE' && ev.categoria?.toUpperCase() !== filtroCategoria) return false
    if (filtroGratuito && !ev.gratuito) return false
    if (filtroTesto && !ev.titolo?.toLowerCase().includes(filtroTesto.toLowerCase()) && !ev.luogo?.toLowerCase().includes(filtroTesto.toLowerCase())) return false
    return true
  })

  const coloreSelezionato = eventoSelezionato ? getColore(eventoSelezionato.categoria) : '#8B7CF6'
  const dataFormattata = eventoSelezionato?.data_inizio
    ? new Date(eventoSelezionato.data_inizio).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : ''
  const ingresso = eventoSelezionato?.gratuito ? 'GRATUITO' : eventoSelezionato?.prezzo_min ? `Da €${eventoSelezionato.prezzo_min}` : 'Vedi dettagli'

  return (
    <div style={{position:'relative'}}>

      {/* FILTRI */}
      <div style={{marginBottom:'16px',display:'flex',flexDirection:'column',gap:'12px'}}>
        <input
          type="text"
          placeholder="🔍 Cerca evento o luogo..."
          value={filtroTesto}
          onChange={e => setFiltroTesto(e.target.value)}
          style={{width:'100%',padding:'10px 16px',borderRadius:'12px',border:'1px solid rgba(0,0,0,0.1)',fontSize:'14px',background:'white',outline:'none',boxSizing:'border-box'}}
        />
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {categorie.map(cat => (
            <button key={cat} onClick={() => setFiltroCategoria(cat)}
              style={{padding:'4px 12px',borderRadius:'20px',border:'none',cursor:'pointer',fontSize:'11px',fontWeight:600,
                background: filtroCategoria === cat ? (CATEGORIA_COLORI[cat] || '#8B7CF6') : 'rgba(0,0,0,0.06)',
                color: filtroCategoria === cat ? 'white' : 'rgba(29,29,31,0.6)',transition:'all 0.2s'}}>
              {cat === 'TUTTE' ? '🦣 Tutte' : cat.replace(/_/g,' ')}
            </button>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <button onClick={() => setFiltroGratuito(!filtroGratuito)}
            style={{padding:'4px 12px',borderRadius:'20px',border:'none',cursor:'pointer',fontSize:'11px',fontWeight:600,
              background: filtroGratuito ? '#34D399' : 'rgba(0,0,0,0.06)',
              color: filtroGratuito ? 'white' : 'rgba(29,29,31,0.6)',transition:'all 0.2s'}}>
            🎟 Solo gratuiti
          </button>
          <span style={{fontSize:'12px',color:'rgba(29,29,31,0.4)'}}>
            {loading ? '...' : `${eventiFiltrati.length} eventi`}
          </span>
        </div>
      </div>

      {/* MAPPA */}
      <div style={{position:'relative'}}>
        {loading && (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#F5F5F7',zIndex:1000,height:'500px',borderRadius:'8px'}}>
            <span style={{color:'#8B7CF6',fontSize:'14px'}}>🦣 Caricamento ATLAS•EVENTA™...</span>
          </div>
        )}
        <div ref={mapRef} style={{height:'500px',width:'100%',borderRadius:'8px'}} />
      </div>

      {/* MAMMUTH•KeySLIDE™ */}
      {eventoSelezionato && (
        <>
          {/* OVERLAY */}
          <div
            onClick={() => setEventoSelezionato(null)}
            style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.3)',zIndex:1000,backdropFilter:'blur(2px)'}}
          />

          {/* PANEL */}
          <div style={{
            position:'fixed',
            bottom:0,
            left:0,
            right:0,
            zIndex:1001,
            background:'white',
            borderRadius:'20px 20px 0 0',
            padding:'0 24px 40px',
            boxShadow:'0 -4px 40px rgba(0,0,0,0.15)',
            animation:'slideUp 0.3s cubic-bezier(0.32,0.72,0,1)',
            maxHeight:'85vh',
            overflowY:'auto',
          }}>

            {/* HANDLE */}
            <div style={{display:'flex',justifyContent:'center',paddingTop:'12px',paddingBottom:'16px'}}>
              <div style={{width:'36px',height:'4px',borderRadius:'2px',background:'rgba(0,0,0,0.15)'}}></div>
            </div>

            {/* CATEGORIA */}
            <div style={{display:'inline-block',background:coloreSelezionato,color:'white',fontSize:'11px',padding:'4px 12px',borderRadius:'20px',marginBottom:'12px',fontWeight:600,letterSpacing:'0.05em'}}>
              {(eventoSelezionato.categoria || '').replace(/_/g,' ')}
            </div>

            {/* TITOLO */}
            <h2 style={{fontSize:'22px',fontWeight:700,lineHeight:1.2,marginBottom:'12px',color:'#1D1D1F',margin:'0 0 12px 0'}}>
              {eventoSelezionato.titolo}
            </h2>

            {/* META */}
            <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'20px'}}>
              <div style={{fontSize:'14px',color:'rgba(29,29,31,0.6)'}}>📍 {eventoSelezionato.luogo || 'Sermoneta'}</div>
              <div style={{fontSize:'14px',color:'rgba(29,29,31,0.6)'}}>🗓 {dataFormattata}</div>
              <div style={{fontSize:'14px',fontWeight:600,color:coloreSelezionato}}>🎟 {ingresso}</div>
            </div>

            {/* DESCRIZIONE */}
            {eventoSelezionato.descrizione && (
              <p style={{fontSize:'14px',lineHeight:1.6,color:'rgba(29,29,31,0.7)',marginBottom:'24px'}}>
                {eventoSelezionato.descrizione}
              </p>
            )}

            {/* BOTTONI */}
            <div style={{display:'flex',gap:'12px'}}>
              <a href={`/evento/${eventoSelezionato.id}`}
                style={{flex:1,display:'block',textAlign:'center',background:'#8B7CF6',color:'white',fontSize:'14px',fontWeight:600,padding:'14px',borderRadius:'14px',textDecoration:'none'}}>
                Scopri di più →
              </a>
              <button onClick={() => setEventoSelezionato(null)}
                style={{padding:'14px 20px',borderRadius:'14px',border:'none',background:'rgba(0,0,0,0.06)',cursor:'pointer',fontSize:'14px',color:'rgba(29,29,31,0.6)'}}>
                ✕
              </button>
            </div>

            {/* LABEL */}
            <div style={{textAlign:'center',marginTop:'16px',fontSize:'10px',color:'rgba(29,29,31,0.3)',letterSpacing:'0.1em'}}>
              MAMMUTH•KeySLIDE™
            </div>
          </div>

          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
        </>
      )}
    </div>
  )
}
