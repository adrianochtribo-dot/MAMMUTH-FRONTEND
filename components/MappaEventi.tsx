'use client'

import { useEffect, useRef } from 'react'

const EVENTI = [
  {
    id: 'SERM-2026-001',
    nome: 'Processione del Venerdì Santo',
    categoria: 'Spirituale',
    data: '2026-04-03',
    lat: 41.5508,
    lng: 13.0197,
  },
  {
    id: 'SERM-2026-002',
    nome: 'Sagra della Fragola',
    categoria: 'Sagre',
    data: '2026-05-15',
    lat: 41.5515,
    lng: 13.0205,
  },
  {
    id: 'SERM-2026-003',
    nome: 'Palio dei Comuni',
    categoria: 'Tradizioni',
    data: '2026-06-20',
    lat: 41.5502,
    lng: 13.0189,
  },
]

export default function MappaEventi() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mapInstanceRef.current) return

    import('leaflet').then((L) => {
      if (!mapRef.current) return

      const map = L.map(mapRef.current).setView([41.5508, 13.0197], 14)
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      EVENTI.forEach((evento) => {
        L.marker([evento.lat, evento.lng])
          .addTo(map)
          .bindPopup(`<b>${evento.nome}</b><br>${evento.categoria}<br>${evento.data}`)
      })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={mapRef}
      style={{ height: '500px', width: '100%', borderRadius: '8px' }}
    />
  )
}
