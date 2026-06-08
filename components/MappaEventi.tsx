'use client'

import { useEffect, useRef, useState } from 'react'

const EVENTI_URL = 'https://raw.githubusercontent.com/adrianochtribo-dot/MAMMUTH-EV/main/atlas-eventa/europa/italia/lazio/latina/sermoneta/eventi.json'

const CATEGORIA_COLORI: Record<string, string> = {
  'FESTA_RELIGIOSA': '#C9A96E',
  'SAGRA_GASTRONOMICA': '#E67E22',
  'FESTIVAL_MUSICA': '#9B59B6',
  'FESTIVAL_ARTE': '#3498DB',
  'RIEVOCAZIONE_STORICA': '#E74C3C',
  'FIERA': '#2ECC71',
  'default': '#8B7355',
}

function getColore(categoria: string): string {
  return CATEGORIA_COLORI[categoria] || CATEGORIA_COLORI.default
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

        const res = await fetch(EVENTI_URL)
        const data = await res.json()
        const events = data.events || []
        setTotale(events.length)

        const coordCount: Record<string, number> = {}

        events.forEach((evento: any, i: number) => {
          const payload = evento['___PAYLOAD___']
          if (!payload) return
          const baseLat = payload.luogo?.lat
          const baseLng = payload.luogo?.lng
          if (!baseLat || !baseLng) return

          const key = `${baseLat},${baseLng}`
          coordCount[key] = (coordCount[key] || 0) + 1
          const idx = coordCount[key] - 1

          const [lat, lng] = idx === 0 ? [baseLat, baseLng] : jitter(baseLat, baseLng, idx)

          const nome = payload.nome_evento || ''
          const categoria = payload.categoria_primaria || ''
          const periodo = payload.periodo_ricorrenza || ''
          const venue = payload.venue || ''
          const ingresso = payload.ingresso || ''
          const colore = getColore(categoria)
          const icona = creaIcona(L, colore)

          L.marker([lat, lng], { icon: icona })
            .addTo(map)
            .bindPopup(`
              <div style="font-family:system-ui;min-width:200px;max-width:260px">
                <div style="font-weight:700;font-size:14px;margin-bottom:6px;line-height:1.3">${nome}</div>
                <div style="display:inline-block;background:${colore};color:white;font-size:10px;padding:2px 8px;border-radius:10px;margin-bottom:8px">${categoria.replace(/_/g,' ')}</div>
                <div style="font-size:12px;color:#555;margin-bottom:3px">📍 ${venue}</div>
                <div style="font-size:12px;color:#555;margin-bottom:3px">🗓 ${periodo}</div>
                <div style="font-size:12px;color:#555">🎟 ${ingresso}</div>
              </div>
            `)
        })

        setLoading(false)
      } catch (err) {
        setError('Errore caricamento eventi ATLAS•EVENTA™')
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
          <span>🦣 <b style={{color:'#C9A96E'}}>{totale}</b> eventi certificati KUS-3620</span>
          {Object.entries(CATEGORIA_COLORI).filter(([k])=>k!=='default').map(([cat, colore]) => (
            <span key={cat} style={{display:'flex',alignItems:'center',gap:'4px'}}>
              <span style={{width:'10px',height:'10px',borderRadius:'50%',background:colore,display:'inline-block'}}></span>
              <span style={{color:'#8B7355',fontSize:'11px'}}>{cat.replace(/_/g,' ')}</span>
            </span>
          ))}
        </div>
      )}
      <div style={{position:'relative'}}>
        {loading && (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#0A0A0A',zIndex:1000,height:'500px',borderRadius:'8px'}}>
            <span style={{color:'#C9A96E',fontSize:'14px'}}>🦣 Caricamento ATLAS•EVENTA™...</span>
          </div>
        )}
        <div ref={mapRef} style={{height:'500px',width:'100%',borderRadius:'8px'}} />
      </div>
    </div>
  )
}
