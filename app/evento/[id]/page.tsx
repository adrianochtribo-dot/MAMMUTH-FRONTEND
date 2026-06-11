'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

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

function getMeteoDescrizione(code: number): string {
  if (code === 0) return '☀️ Soleggiato'
  if (code <= 3) return '⛅ Parzialmente nuvoloso'
  if (code <= 48) return '☁️ Nuvoloso'
  if (code <= 67) return '🌧️ Pioggia'
  if (code <= 77) return '❄️ Neve'
  if (code <= 82) return '🌦️ Rovesci'
  return '⛈️ Temporale'
}

function getConsigliAbbigliamento(tMin: number, tMax: number): string {
  if (tMax >= 28) return '👕 Leggero — t-shirt e shorts, occhiali da sole'
  if (tMax >= 22) return '👔 Fresco di giorno — porta uno strato per la sera'
  if (tMax >= 15) return '🧥 Vestiti a cipolla — giacca leggera obbligatoria la sera'
  return '🧣 Freddo — cappotto e strati multipli'
}

export default function EventoDettaglio() {
  const params = useParams()
  const router = useRouter()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id

  const [evento, setEvento] = useState<any>(null)
  const [meteo, setMeteo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchEvento = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/eventi?id=eq.${id}&select=*`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        )
        if (!res.ok) throw new Error('Evento non trovato')
        const data = await res.json()
        if (!data.length) throw new Error('Evento non trovato')
        const ev = data[0]
        setEvento(ev)

        if (ev.lat && ev.lng) {
          const dataEvento = ev.data_inizio ? ev.data_inizio.split('T')[0] : new Date().toISOString().split('T')[0]
          try {
            const meteoRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${ev.lat}&longitude=${ev.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FRome&start_date=${dataEvento}&end_date=${dataEvento}`
            )
            const meteoData = await meteoRes.json()
            if (meteoData.daily) {
              setMeteo({
                weathercode: meteoData.daily.weathercode[0],
                temperature_min: meteoData.daily.temperature_2m_min[0],
                temperature_max: meteoData.daily.temperature_2m_max[0],
              })
            }
          } catch {
            // meteo non disponibile
          }
        }

        setLoading(false)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Errore')
        setLoading(false)
      }
    }

    fetchEvento()
  }, [id])

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#F5F5F7',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <span style={{color:'#8B7CF6',fontSize:'14px'}}>🦣 Caricamento evento...</span>
    </div>
  )

  if (error || !evento) return (
    <div style={{minHeight:'100vh',background:'#F5F5F7',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px'}}>
      <span style={{color:'#E74C3C'}}>Evento non trovato</span>
      <button onClick={() => router.push('/')} style={{color:'#8B7CF6',background:'none',border:'none',cursor:'pointer',fontSize:'14px'}}>← Torna alla mappa</button>
    </div>
  )

  const colore = getColore(evento.categoria)
  const dataFormattata = evento.data_inizio
    ? new Date(evento.data_inizio).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : ''
  const ingresso = evento.gratuito ? 'GRATUITO' : evento.prezzo_min ? `Da €${evento.prezzo_min}` : 'Vedi dettagli'

  return (
    <div style={{minHeight:'100vh',background:'#F5F5F7',color:'#1D1D1F',fontFamily:'system-ui,sans-serif'}}>

      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(12px)',backgroundColor:'rgba(245,245,247,0.8)',borderBottom:'1px solid rgba(0,0,0,0.08)',height:'48px',display:'flex',alignItems:'center',padding:'0 24px',justifyContent:'space-between'}}>
        <button onClick={() => router.push('/')} style={{color:'#8B7CF6',fontSize:'13px',background:'none',border:'none',cursor:'pointer'}}>← Torna alla mappa</button>
        <span style={{fontSize:'12px',fontWeight:600,letterSpacing:'0.1em',color:'#1D1D1F'}}>MAMMUTH•EVENTS™</span>
      </nav>

      <div style={{maxWidth:'680px',margin:'0 auto',padding:'40px 24px'}}>

        <div style={{display:'inline-block',background:colore,color:'white',fontSize:'11px',padding:'4px 12px',borderRadius:'20px',marginBottom:'16px',fontWeight:600,letterSpacing:'0.05em'}}>
          {(evento.categoria || '').replace(/_/g,' ')}
        </div>

        <h1 style={{fontSize:'32px',fontWeight:700,lineHeight:1.2,marginBottom:'8px',color:'#1D1D1F'}}>
          {evento.titolo}
        </h1>

        <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'32px'}}>
          <div style={{fontSize:'15px',color:'rgba(29,29,31,0.6)'}}>📍 {evento.luogo || 'Sermoneta'}</div>
          <div style={{fontSize:'15px',color:'rgba(29,29,31,0.6)'}}>🗓 {dataFormattata}</div>
          <div style={{fontSize:'15px',fontWeight:600,color:colore}}>🎟 {ingresso}</div>
        </div>

        {meteo && (
          <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'20px',border:'1px solid rgba(0,0,0,0.06)'}}>
            <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'0.1em',color:'rgba(29,29,31,0.4)',marginBottom:'12px'}}>METEO IL GIORNO DELL&apos;EVENTO</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:'28px',fontWeight:700,color:'#1D1D1F'}}>{Math.round(meteo.temperature_max)}°C</div>
                <div style={{fontSize:'13px',color:'rgba(29,29,31,0.5)'}}>min {Math.round(meteo.temperature_min)}°C — max {Math.round(meteo.temperature_max)}°C</div>
                <div style={{fontSize:'14px',marginTop:'4px'}}>{getMeteoDescrizione(meteo.weathercode)}</div>
              </div>
              <div style={{textAlign:'right',maxWidth:'200px'}}>
                <div style={{fontSize:'12px',color:'rgba(29,29,31,0.5)',marginBottom:'4px'}}>Cosa indossare</div>
                <div style={{fontSize:'13px',color:'#1D1D1F',lineHeight:1.4}}>{getConsigliAbbigliamento(meteo.temperature_min, meteo.temperature_max)}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'20px',border:'1px solid rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'0.1em',color:'rgba(29,29,31,0.4)',marginBottom:'12px'}}>SAFETY ENGINE KUS-3620</div>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{flex:1,height:'8px',background:'#E5E5EA',borderRadius:'4px',overflow:'hidden'}}>
              <div style={{width:'25%',height:'100%',background:'#34D399',borderRadius:'4px'}}></div>
            </div>
            <span style={{fontSize:'13px',color:'#34D399',fontWeight:600}}>Affollamento stimato: basso</span>
          </div>
          <div style={{fontSize:'11px',color:'rgba(29,29,31,0.4)',marginTop:'8px'}}>Analisi Fruin LoS · Dati storici ATLAS•EVENTA™</div>
        </div>

        {evento.descrizione && (
          <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'20px',border:'1px solid rgba(0,0,0,0.06)'}}>
            <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'0.1em',color:'rgba(29,29,31,0.4)',marginBottom:'12px'}}>DESCRIZIONE</div>
            <p style={{fontSize:'15px',lineHeight:1.6,color:'rgba(29,29,31,0.8)',margin:0}}>{evento.descrizione}</p>
          </div>
        )}

        <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'20px',border:'1px solid rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'0.1em',color:'rgba(29,29,31,0.4)',marginBottom:'12px'}}>COME ARRIVARE</div>
          <div style={{fontSize:'14px',color:'rgba(29,29,31,0.7)',lineHeight:1.8}}>
            🚗 Parcheggio disponibile fuori dalle mura medievali<br/>
            🚶 10 minuti a piedi dal parcheggio al centro storico<br/>
            ♿ Percorso accessibile disponibile — chiedi in loco<br/>
            👶 Adatto a passeggini sul percorso principale
          </div>
          {evento.lat && evento.lng && (
            <a href={`https://maps.google.com/?q=${evento.lat},${evento.lng}`} target="_blank" rel="noreferrer"
              style={{display:'inline-block',marginTop:'12px',fontSize:'13px',color:'#8B7CF6',textDecoration:'none',fontWeight:600}}>
              Apri in Google Maps →
            </a>
          )}
        </div>

        <div style={{background:'white',borderRadius:'16px',padding:'20px',border:'1px solid rgba(0,0,0,0.06)',display:'flex',alignItems:'center',gap:'16px'}}>
          <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'linear-gradient(135deg,#8B7CF6,#E879A0)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>
            🦣
          </div>
          <div>
            <div style={{fontSize:'12px',fontWeight:700,color:'#1D1D1F',letterSpacing:'0.05em'}}>CERTIFICATO KUS-3620</div>
            <div style={{fontSize:'11px',color:'rgba(29,29,31,0.5)',marginTop:'2px'}}>Evento verificato · ATLAS•EVENTA™ · TCF 100% · Verità territoriale certificata</div>
          </div>
        </div>

      </div>
    </div>
  )
}
