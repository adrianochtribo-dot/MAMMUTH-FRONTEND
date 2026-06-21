import Link from 'next/link'
import MappaEventi from '@/components/MappaEventi'
import MammuthCommunity from '@/components/MammuthCommunity'
import SentinellaForm from '@/components/SentinellaForm'

export default function EventiPage() {
  return (
    <div className="min-h-screen font-sans antialiased" style={{backgroundColor:'#F5F5F7',color:'#1D1D1F'}}>
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{backgroundColor:'rgba(245,245,247,0.8)',borderColor:'rgba(0,0,0,0.08)'}}>
        <div className="mx-auto px-6 h-12 flex items-center justify-between" style={{maxWidth:'64rem'}}>
          <Link href="/" className="font-semibold text-sm tracking-widest" style={{color:'#1D1D1F',textDecoration:'none'}}>← MAMMUTH•EVENTS™</Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-2" style={{color:'#1D1D1F'}}>
          Eventi nel territorio
        </h1>
        <p className="text-sm mb-8" style={{color:'rgba(29,29,31,0.5)'}}>
          73 eventi nel sistema · 69 validati ATLAS•EVENTA™ — Sermoneta, Bassiano, Sezze, Ponza (Provincia di Latina) — verità territoriale, zero dati inventati.
        </p>
        <MappaEventi />
      </section>

      <section id="presidia" className="max-w-5xl mx-auto px-6 py-16">
        <MammuthCommunity />
        <SentinellaForm />
      </section>

      <footer className="border-t py-12 text-center text-xs" style={{borderColor:'rgba(0,0,0,0.08)',color:'rgba(29,29,31,0.4)'}}>
        <p className="mb-2">MAMMUTH™ — KREATIO UNIVERSAL SYSTEM™ Code 3620</p>
        <p style={{color:'rgba(29,29,31,0.25)'}}>MAMMUTH™ · MAMMUTH•EVENTS™ are trademarks of Leonardo Adriano Chelariu.</p>
      </footer>
    </div>
  )
}
