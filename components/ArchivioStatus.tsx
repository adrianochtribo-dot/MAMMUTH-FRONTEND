'use client'

import { useEffect, useState } from 'react'

const SUPABASE_URL = 'https://pwfsuefyiiwnltikcdho.supabase.co'
const SUPABASE_KEY = 'sb_publishable_5sHvYKX3YL7RI_RwpJK9FQ_-A2G7H63'

type Freschezza = {
  totale_eventi: number
  totale_validati: number
  nuovi_24h: number
  nuovi_7g: number
  aggiornati_24h: number
  ultimo_inserimento: string | null
  ultimo_aggiornamento: string | null
  in_lavorazione: number
}

export default function ArchivioStatus() {
  const [data, setData] = useState<Freschezza | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/archivio_freschezza?select=*`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        )
        if (!res.ok) throw new Error(`fetch ${res.status}`)
        const rows = await res.json()
        if (active && rows && rows.length > 0) setData(rows[0] as Freschezza)
      } catch (e) {
        // silenzioso: il badge non appare se la vista non risponde
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  if (loading || !data) return null

  const riferimento = data.ultimo_aggiornamento ?? data.ultimo_inserimento
  const oreDaUltimo = riferimento
    ? (Date.now() - new Date(riferimento).getTime()) / 36e5
    : Infinity
  const isLive = oreDaUltimo <= 48
  const dataFmt = riferimento
    ? new Date(riferimento).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        borderRadius: '999px',
        background: 'rgba(20,22,28,0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        fontFamily: "'DM Mono', monospace",
        color: '#e8e8ea',
        width: 'fit-content',
        maxWidth: '100%',
      }}
    >
      <span
        style={{
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          flexShrink: 0,
          background: isLive ? '#34d399' : '#f59e0b',
          boxShadow: isLive ? '0 0 8px rgba(52,211,153,0.8)' : 'none',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
        <strong style={{ fontSize: '13px', letterSpacing: '0.02em' }}>
          {isLive ? 'Archivio in aggiornamento' : 'Archivio MAMMUTH consolidato'}
        </strong>
        <span style={{ fontSize: '11px', opacity: 0.62 }}>
          {data.totale_eventi} eventi · {data.totale_validati} validati · {data.in_lavorazione} in lavorazione · ultimo {dataFmt}
        </span>
      </div>
    </div>
  )
}
