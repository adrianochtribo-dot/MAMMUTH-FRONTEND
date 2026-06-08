'use client'

import { useEffect, useRef, useState } from 'react'

const EVENTI_URL = 'https://raw.githubusercontent.com/adrianochtribo-dot/MAMMUTH-EV/main/atlas-eventa/europa/italia/lazio/latina/sermoneta/eventi.json'

const CATEGORIA_COLORI: Record<string, string> = {
  'Spirituale': '#C9A96E',
  'Religioso': '#C9A96E',
  'Sagra': '#E67E22',
  'Gastronomia': '#E67E22',
  'Cultura': '#3498DB',
  'Storico': '#3498DB',
  'Musica': '#9B59B6',
  'Sport': '#2ECC71',
  'Teatro': '#E91E63',
  'default': '#8B7355',
}

function getColore(categoria: string): string {
  if (!categoria) return CATEGORIA_COLORI.default
  const key = Object.keys(CATEGORIA_COLORI).find(k =>
    categoria.toLowerCase().includes(k.toLowerCase())
  )
  return key ? CATEGORIA_COLORI[key] : CATEGORIA_COLORI.default
}

function creaIcona(L: any, colore: string) {
  return L.divIcon({
    html: `<div style="
      width:12px;height:12px;
      border-radius:50%;
      background:${colore};
      border:2px solid white;
      box-shadow:0 0 4px rgba(0,0,0,0.5);
    "></div>`,
    className: '',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
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

        const map = L.map(mapRef.current).setView([41.5508, 13.0197], 13)
        mapInstanceRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        const res = await fetch(EVENTI_URL)
        const data = await res.json()
        const eventi = data.eventi || []
        setTotale(eventi.length)

        eventi.forEach((evento: any) => {
          const lat = evento.luogo?.coordinate?.lat
          const lng = evento.luogo?.coordinate?.lng
          if (!lat || !lng) return

          const categoria = evento.categoria || ''
          const colore = getColore(categoria)
          const icona = creaIcona(L, colore)

          L.marker([lat, lng], { icon: icona })
            .addTo(map)
            .bindPopup(`
              <div style="font-family:system-ui;min-width:180px">
                <div style="font-weight:700;font-size:14px;margin-bottom:4px">${evento.nome}</div>
                <div style="color:${colore};font-size:12px;margin-bottom:4px">${categoria}</div>
                <div style="font-size:12px;color:#666">${evento.data_inizio || ''}</div>
                ${evento.luogo?.nome ? `<div style="font-size:11px;color:#999;margin-top:4px">${evento.luogo.nome}</div>` : ''}
              </div>
            `)
        })

        setLoading(false)
      } catch (err) {
        setError('Errore caricamento eventi')
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
        <div style={{
          display:'flex', gap:'16px', marginBottom:'12px',
          fontSize:'13px', color:'#8B7355'
        }}>
          <span>🦣 <b style={{color:'#C9A96E'}}>{totale}</b> eventi verificati</span>
          <span style={{color:'#C9A96E'}}>●</span>
          <span style={{color:'#C9A96E'}}>Spirituale</span>
          <span style={{color:'#E67E22'}}>●</span>
          <span style={{color:'#E67E22'}}>Sagre</span>
          <span style={{color:'#3498DB'}}>●</span>
          <span style={{color:'#3498DB'}}>Cultura</span>
          <span style={{color:'#8B7355'}}>●</span>
          <span style={{color:'#8B7355'}}>Altro</span>
        </div>
      )}
      <div style={{ position: 'relative' }}>
        {loading && (
          <div style={{
            position:'absolute', inset:0,
            display:'flex', alignItems:'center', justifyContent:'center',
            background:'#0A0A0A', zIndex:1000, height:'500px', borderRadius:'8px'
          }}>
            <span style={{color:'#C9A96E', fontSize:'14px'}}>
              🦣 Caricamento eventi ATLAS•EVENTA™...
            </span>
          </div>
        )}
        <div
          ref={mapRef}
          style={{ height:'500px', width:'100%', borderRadius:'8px' }}
        />
      </div>
    </div>
  )
}
