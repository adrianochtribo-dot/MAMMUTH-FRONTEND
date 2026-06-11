'use client'

import { useEffect, useRef, useState } from 'react'

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

function creaIcona(L: any, colore: string) {
  return L.divIcon({
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${colore};border:2px solid white;box-shadow:0 0 6px rgba(0,0,0,0.4);cursor:pointer"></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

export default function MappaEventi() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [totale, setTotale] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mapInstanceRef.current) return

    const init = async () => {
      try {
        const L = (await import('leaflet')).default
        if (!mapRef.current) return

        const map = L.map(mapRef.current).setView([41.550, 12.983], 14)
        mapInstanceRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/eventi?select=id,titolo,categoria,luogo,indirizzo,data_inizio,data_fine,gratuito,prezzo_min,descrizione,lat,lng`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        )

        if (!res.ok) throw new Error(`Errore fetch: ${res.status}`)
        const events = await res.json()
        setTotale(events.length)

        const coordCount: Record<string, number> = {}

        events.forEach((evento: any) => {
          if (!evento.lat || !evento.lng) return

          const lat = parseFloat(evento.lat)
          const lng = parseFloat(evento.lng)
          if (isNaN(lat) || isNaN(lng)) return

          const key = `${lat},${lng}`
          coordCount[key] = (coordCount[key] || 0) + 1
          const idx = coordCount[key] - 1
          const [jLat, jLng] = idx === 0 ? [lat, lng] : jitter(lat, lng, idx)

          const colore = getColore(evento.categoria)
          const icona = creaIcona(L, colore)
          const ingresso = evento.gratuito ? 'GRATUITO' : evento.prezzo_min ? `Da €${evento.prezzo_min}` : 'Vedi dettagli'
          const dataInizio = evento.data_inizio
            ? new Date(evento.data_inizio).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
            : ''

          L.marker([jLat, jLng], { icon: icona })
            .addTo(map)
            .bindPopup(`
              <div style="font-family:system-ui;min-width:200px;max-width:260px">
                <div style="font-weight:700;font-size:14px;margin-bottom:6px;line-height:1.3">${evento.titolo}</div>
                <div style="display:inline-block;background:${colore};color:white;font-size:10px;padding:2px 8px;border-radius:10px;margin-bottom:8px">${(evento.categoria || '').replace(/_/g,' ')}</div>
                <div style="font-size:12px;color:#555;margin-bottom:3px">📍 ${evento.luogo || ''}</div>
                <div style="font-size:12px;color:#555;margin-bottom:3px">🗓 ${dataInizio}</div>
                <div style="font-size:12px;color:#555;margin-bottom:8px">🎟 ${ingresso}</div>
                <a href="/evento/${evento.id}" style="display:block;text-align:center;background:#8B7CF6;color:white;font-size:12px;font-weight:600;padding:6px 12px;border-radius:8px;text-decoration:none">Scopri di più →</a>
              </div>
            `)
        })

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

  if (error) return <div style={{color:'#E74C3C',padding:'16px'}}>{error}</div>

  return (
    <div>
      {!loading && (
        <div style={{display:'flex',gap:'12px',marginBottom:'12px',fontSize:'13px',flexWrap:'wrap',alignItems:'center'}}>
          <span>🦣 <b style={{color:'#8B7CF6'}}>{totale}</b> eventi certificati KUS-3620</span>
          {Object.entries(CATEGORIA_COLORI).filter(([k])=>k!=='default').map(([cat, colore]) => (
            <span key={cat} style={{display:'flex',alignItems:'center',gap:'4px'}}>
              <span style={{width:'10px',height:'10px',borderRadius:'50%',background:colore,display:'inline-block'}}></span>
              <span style={{color:'rgba(29,29,31,0.5)',fontSize:'11px'}}>{cat.replace(/_/g,' ')}</span>
            </span>
          ))}
        </div>
      )}
      <div style={{position:'relative'}}>
        {loading && (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#F5F5F7',zIndex:1000,height:'500px',borderRadius:'8px'}}>
            <span style={{color:'#8B7CF6',fontSize:'14px'}}>🦣 Caricamento ATLAS•EVENTA™...</span>
          </div>
        )}
        <div ref={mapRef} style={{height:'500px',width:'100%',borderRadius:'8px'}} />
      </div>
    </div>
  )
}
