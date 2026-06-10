import Link from 'next/link'
import MappaEventi from '@/components/MappaEventi'

export default function Home() {
  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden" style={{backgroundColor:'#F5F5F7',color:'#1D1D1F'}}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{backgroundColor:'rgba(245,245,247,0.8)',borderColor:'rgba(0,0,0,0.08)'}}>
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="font-semibold text-sm tracking-widest" style={{color:'#1D1D1F'}}>MAMMUTH•EVENTS™</span>
          <div className="flex gap-6 text-xs" style={{color:'rgba(29,29,31,0.6)'}}>
            <Link href="#mappa" className="hover:opacity-100 transition" style={{color:'inherit'}}>Mappa</Link>
            <Link href="#architettura" className="hover:opacity-100 transition" style={{color:'inherit'}}>Architettura</Link>
            <a href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/" target="_blank" className="hover:opacity-100 transition" style={{color:'inherit'}}>Developer Portal</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/7144155905_03751fa6fa_b.jpg')" }}
        />
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom, rgba(245,245,247,0.3), rgba(245,245,247,0.95))'}} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs font-medium tracking-widest uppercase mb-6 block" style={{color:'#FBBF24'}}>
            Territorio Pilota — Sermoneta, Provincia di Latina
          </span>
          <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter leading-tight"
            style={{background:'linear-gradient(135deg, #8B7CF6 0%, #E879A0 35%, #38BDF8 70%, #34D399 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            MAMMUTH•EVENTS™
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed" style={{color:'rgba(29,29,31,0.6)'}}>
            Where Communities Come Alive™
          </p>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{color:'rgba(29,29,31,0.4)'}}>
            Il primo sistema di scoperta eventi iperlocale con architettura certificata KUS-3620.
          </p>
          <div className="mt-10 flex items-center justify-center gap-8 text-base">
            <a href="#mappa" style={{color:'#8B7CF6'}} className="hover:underline flex items-center gap-1">
              Esplora la mappa →
            </a>
            <a href="https://mammuth-ev-production.up.railway.app/docs" target="_blank" style={{color:'#38BDF8'}} className="hover:underline flex items-center gap-1">
              Safety Engine API →
            </a>
          </div>
        </div>
      </section>

      {/* MAPPA */}
      <section id="mappa" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight mb-2" style={{color:'#1D1D1F'}}>
          Eventi nel territorio
        </h2>
        <p className="text-sm mb-8" style={{color:'rgba(29,29,31,0.5)'}}>
          23 eventi certificati ATLAS•EVENTA™ — verità territoriale, zero dati inventati.
        </p>
        <MappaEventi />
      </section>

      {/* BENTO GRID */}
      <section id="architettura" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight mb-2" style={{color:'#1D1D1F'}}>Architettura</h2>
        <p className="text-sm mb-8" style={{color:'rgba(29,29,31,0.5)'}}>KREATIO UNIVERSAL SYSTEM™ — Code 3620</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Safety Engine', value: 'v1.0.0', desc: 'Fruin LoS + Cosine Similarity storica', accent: '#8B7CF6' },
            { label: 'Risk Score', value: '0.0–1.0', desc: 'Calcolo predittivo crowd crush', accent: '#E879A0' },
            { label: 'Dataset', value: '23 eventi', desc: 'KUS-3620 certified — TCF 100%', accent: '#38BDF8' },
            { label: 'Stack', value: 'Next.js 14', desc: 'Vercel Edge CDN + Railway FastAPI', accent: '#34D399' },
            { label: 'Database', value: 'Supabase', desc: 'PostgreSQL + PostGIS ready', accent: '#FBBF24' },
            { label: 'Pipeline', value: 'ATLAS•EVENTA™', desc: 'WhatsApp → Claude → JSON certificato', accent: '#8B7CF6' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl p-6 border" style={{backgroundColor:'#fff',borderColor:'rgba(0,0,0,0.06)'}}>
              <div className="text-xs uppercase tracking-widest mb-2" style={{color:'rgba(29,29,31,0.4)'}}>{item.label}</div>
              <div className="text-2xl font-semibold mb-1" style={{color:item.accent}}>{item.value}</div>
              <div className="text-xs" style={{color:'rgba(29,29,31,0.5)'}}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-12 text-center text-xs" style={{borderColor:'rgba(0,0,0,0.08)',color:'rgba(29,29,31,0.4)'}}>
        <p className="mb-2">MAMMUTH•EVENTS™ — KREATIO UNIVERSAL SYSTEM™ Code 3620</p>
        <p>Photo: ©2012 LeonardoAdrianoChelariu — Sermoneta (Latina)</p>
      </footer>

    </div>
  )
}
