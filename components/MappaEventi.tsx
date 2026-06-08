'use client'

import { useEffect, useRef, useState } from 'react'

const EVENTI_URL = 'https://raw.githubusercontent.com/adrianochtribo-dot/MAMMUTH-EV/main/atlas-eventa/europa/italia/lazio/latina/sermoneta/eventi.json'

export default function MappaEventi() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mapInstanceRef.current) return

    const init = async () => {
      try {
        const L = (await import('leaflet')).default

        if (!mapRef.current) return

        const map = L.map(mapRef.current).setView([41.5508, 13.0197], 14)
        mapInstanceRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map)

        const res = await fetch(EVENTI_URL)
        const data = await res.json()
        const eventi = data.eventi || []

        eventi.forEach((evento: any) => {
          if (evento.luogo?.coordinate?.lat && evento.luogo?.coordinate?.lng) {
            L.marker([evento.luogo.coordinate.lat, evento.luogo.coordinate.lng])
              .addTo(map)
              .bindPopup(`
                <b>${evento.nome}</b><br>
                ${evento.categoria || ''}<br>
                ${evento.data_inizio || ''}
              `)
          }
        })

        setLoading(false)
      } catch (err) {
        setError('Errore caricamento mappa')
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

  if (error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0A0A0A', zIndex: 1000, height: '500px'
        }}>
          <span style={{ color: '#C9A96E' }}>Caricamento eventi...</span>
        </div>
      )}
      <div ref={mapRef} style={{ height: '500px', width: '100%', borderRadius: '8px' }} />
    </div>
  )
}
