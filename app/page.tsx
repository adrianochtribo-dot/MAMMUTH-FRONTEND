import Link from 'next/link'
import MappaEventi from '@/components/MappaEventi'
import WidgetTerritorio from '@/components/WidgetTerritorio'
import MammuthCommunity from '@/components/MammuthCommunity'
import SentinellaForm from '@/components/SentinellaForm'

export default function Home() {
  return (
    <>
      {/* WIDGET BARRA FISSA A SINISTRA — non strizza la home, ci galleggia sopra */}
      <div className="hidden lg:block" style={{position:'fixed',top:0,left:0,bottom:0,zIndex:40}}>
        <WidgetTerritorio />
      </div>

      {/* HOME — con margine sinistro pari alla barra (300px) per allinearsi senza sforare */}
      <div className="min-h-screen font-sans antialiased overflow-x-hidden lg:ml-[300px]" style={{backgroundColor:'#F5F5F7',color:'#1D1D1F'}}>

      {/* NAVBAR — parte dopo la barra laterale (300px) su desktop, full width su mobile */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b lg:ml-0" style={{backgroundColor:'rgba(245,245,247,0.8)',borderColor:'rgba(0,0,0,0.08)'}}>
        <div className="mx-auto px-6 h-12 flex items-center justify-between" style={{maxWidth:'64rem'}}>
          <span className="font-semibold text-sm tracking-widest" style={{color:'#1D1D1F'}}>MAMMUTH•EVENTS™</span>
          <div className="flex gap-6 text-xs" style={{color:'rgba(29,29,31,0.6)'}}>
            <Link href="#mappa" className="hover:opacity-100 transition" style={{color:'inherit'}}>Mappa</Link>
            <Link href="#community" className="hover:opacity-100 transition" style={{color:'inherit'}}>Community</Link>
            <Link href="#architettura" className="hover:opacity-100 transition" style={{color:'inherit'}}>Architettura</Link>
            <a href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/developer-index.html" target="_blank" className="hover:opacity-100 transition" style={{color:'inherit'}}>Developer Portal</a>
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
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <span className="text-xs font-medium tracking-widest uppercase mb-6 block" style={{color:'#FBBF24'}}>
            Territorio Pilota — Sermoneta, Provincia di Latina
          </span>

          <div className="w-full flex justify-center mb-0" style={{lineHeight:1}}>
            <svg
              viewBox="0 0 900 120"
              xmlns="http://www.w3.org/2000/svg"
              style={{width:'100%',maxWidth:'900px',height:'auto',overflow:'visible'}}
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#8B7CF6" />
                  <stop offset="35%"  stopColor="#E879A0" />
                  <stop offset="70%"  stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="95"
                textAnchor="middle"
                fill="url(#grad)"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                fontWeight="600"
                fontSize="96"
                letterSpacing="-3"
              >
                MAMMUTH•EVENTS™
              </text>
            </svg>
          </div>

          <p className="mt-4 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed" style={{color:'rgba(29,29,31,0.6)'}}>
            Where Communities Come Alive™
          </p>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{color:'rgba(29,29,31,0.4)'}}>
            Il primo sistema di scoperta eventi iperlocale con architettura certificata KUS-3620.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-base">
            <a href="#mappa" style={{color:'#8B7CF6'}} className="hover:underline flex items-center gap-1">
              Esplora la mappa →
            </a>
            <a href="https://mammuth-ev-production.up.railway.app/docs" target="_blank" style={{color:'#38BDF8'}} className="hover:underline flex items-center gap-1">
              Safety Engine API →
            </a>
            <a href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/pitch.html" target="_blank" className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80" style={{background:'linear-gradient(135deg, #8B7CF6, #E879A0)', color:'#fff', textDecoration:'none'}}>
              📊 Pitch Deck →
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
          73 eventi nel sistema · 69 validati ATLAS•EVENTA™ — Sermoneta, Bassiano, Sezze, Ponza (Provincia di Latina) — verità territoriale, zero dati inventati.
        </p>
        <MappaEventi />
      </section>

      {/* WE MAMMUTH COMMUNITY — mappa di copertura + candidatura Sentinella */}
      <section id="community" className="max-w-5xl mx-auto px-6 py-16">
        <MammuthCommunity />
        <SentinellaForm />
      </section>

      {/* BENTO GRID */}
      <section id="architettura" className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-2" style={{color:'#1D1D1F'}}>Architettura</h2>
            <p className="text-sm" style={{color:'rgba(29,29,31,0.5)'}}>KREATIO UNIVERSAL SYSTEM™ — Code 3620</p>
          </div>
          <img
            src="/kreatio-badge.png"
            alt="Created by KREATIO — Dove le Idee prendono forma — Nero Kaelum"
            className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Safety Engine', value: 'v1.0.0', desc: 'Fruin LoS + Cosine Similarity storica', accent: '#8B7CF6' },
            { label: 'Risk Score', value: '0.0–1.0', desc: 'Calcolo predittivo crowd crush', accent: '#E879A0' },
            { label: 'Dataset', value: '73 eventi', desc: 'KUS-3620 certified — TCF 100%', accent: '#38BDF8' },
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
        <p className="mb-2">MAMMUTH™ — KREATIO UNIVERSAL SYSTEM™ Code 3620</p>
        <p className="mb-2" style={{color:'rgba(29,29,31,0.3)'}}>KREATIO™ · "Nero Kaelum" — creative studio &amp; pseudonym of Leonardo Adriano Chelariu</p>
        <p className="mb-2">Photo: ©2012 LeonardoAdrianoChelariu — Sermoneta (Latina)</p>
        <p style={{color:'rgba(29,29,31,0.25)'}}>MAMMUTH™ · MAMMUTH•EVENTS™ are trademarks of Leonardo Adriano Chelariu. All rights reserved.</p>
      </footer>

    </div>
    </>
  )
}
