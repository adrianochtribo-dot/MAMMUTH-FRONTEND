import Link from 'next/link'
import WidgetTerritorio from '@/components/WidgetTerritorio'
import ArchivioStatus from '@/components/ArchivioStatus'
import EsploraEventiHero from '@/components/EsploraEventiHero'

const DEVELOPER_PORTAL = 'https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/developer-index.html'
const DATI_VALIDATI = 'https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/validati.html'
const CONSOLE_TERRITORIO = 'https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/console.html'

export default function Home() {
  return (
    <>
      {/* WIDGET BARRA FISSA A SINISTRA — intatta */}
      <div className="hidden lg:block" style={{position:'fixed',top:0,left:0,bottom:0,zIndex:40}}>
        <WidgetTerritorio />
      </div>

      {/* HOME */}
      <div className="min-h-screen font-sans antialiased overflow-x-hidden lg:ml-[300px]" style={{backgroundColor:'#F5F5F7',color:'#1D1D1F'}}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b lg:ml-0" style={{backgroundColor:'rgba(245,245,247,0.8)',borderColor:'rgba(0,0,0,0.08)'}}>
        <div className="mx-auto px-6 h-12 flex items-center justify-between" style={{maxWidth:'64rem'}}>
          <span className="font-semibold text-sm tracking-widest" style={{color:'#1D1D1F'}}>MAMMUTH™</span>
          <div className="flex gap-6 text-xs" style={{color:'rgba(29,29,31,0.6)'}}>
            <Link href="/presidia" className="hover:opacity-100 transition" style={{color:'inherit'}}>Presidia il tuo Borgo</Link>
            <Link href="/community" className="hover:opacity-100 transition" style={{color:'inherit'}}>Community</Link>
            <Link href="/mappa" className="hover:opacity-100 transition" style={{color:'inherit'}}>Mappa</Link>
            <a href={CONSOLE_TERRITORIO} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition" style={{color:'inherit'}}>Territorio</a>
            <a href={DEVELOPER_PORTAL} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition" style={{color:'inherit'}}>Developer Portal</a>
          </div>
        </div>
      </nav>

      {/* HERO — titolo + foto + tasti */}
      <section className="px-6 pt-10 pb-16" style={{maxWidth:'72rem',margin:'0 auto'}}>
        <div className="text-center mb-8">
          <span className="text-xs font-medium tracking-widest uppercase mb-4 block" style={{color:'#FBBF24'}}>
            Territorio Pilota — Sermoneta, Provincia di Latina
          </span>
          <div className="w-full flex justify-center" style={{lineHeight:1}}>
            <svg viewBox="0 0 900 120" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'760px',height:'auto',overflow:'visible'}}>
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B7CF6" />
                  <stop offset="35%" stopColor="#E879A0" />
                  <stop offset="70%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
              <text x="50%" y="95" textAnchor="middle" fill="url(#grad)" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" fontWeight="600" fontSize="96" letterSpacing="-3">
                MAMMUTH•EVENTS™
              </text>
            </svg>
          </div>
          <p className="mt-2 text-xl font-light" style={{color:'rgba(29,29,31,0.6)'}}>Where Communities Come Alive™</p>
        </div>

        {/* FOTO HERO + TIMBRO KREATIO (angolo alto destro) */}
        <div style={{position:'relative',borderRadius:'24px',overflow:'hidden',border:'1px solid rgba(0,0,0,0.08)',boxShadow:'0 10px 40px rgba(0,0,0,0.12)'}}>
          <img
            src="/259F52F8-A996-4991-AA2A-10402167F511_1_201_a.jpeg"
            alt="MAMMUTH•EVENTS — territorio"
            style={{width:'100%',height:'auto',display:'block'}}
          />
          <img
            src="/kreatio-badge.png"
            alt="Created by KREATIO — Nero Kaelum"
            style={{
              position:'absolute',
              top:'clamp(12px, 3%, 28px)',
              right:'clamp(12px, 3%, 28px)',
              width:'clamp(64px, 12%, 128px)',
              height:'auto',
              filter:'drop-shadow(0 2px 10px rgba(0,0,0,0.35))',
              pointerEvents:'none',
            }}
          />
        </div>

        {/* TASTI — Esplora eventi (Event•Control) + Eventi nel territorio (→ Dati Validati) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <EsploraEventiHero />
          <a href={DATI_VALIDATI} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full text-sm font-medium transition-opacity hover:opacity-80" style={{background:'rgba(0,0,0,0.06)', color:'#1D1D1F', textDecoration:'none'}}>
            Eventi nel territorio →
          </a>
        </div>

        {/* BADGE LIVE */}
        <div className="mt-8 flex justify-center">
          <ArchivioStatus />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-12 text-center text-xs" style={{borderColor:'rgba(0,0,0,0.08)',color:'rgba(29,29,31,0.4)'}}>
        <p className="mb-2">MAMMUTH™ — KREATIO UNIVERSAL SYSTEM™ Code 3620</p>
        <p className="mb-2" style={{color:'rgba(29,29,31,0.3)'}}>KREATIO™ · "Nero Kaelum" — creative studio &amp; pseudonym of Leonardo Adriano Chelariu</p>
        <p className="mb-2">Photo: ©2025 Leonardo Adriano Chelariu</p>
        <p style={{color:'rgba(29,29,31,0.25)'}}>MAMMUTH™ · MAMMUTH•EVENTS™ are trademarks of Leonardo Adriano Chelariu. All rights reserved.</p>
      </footer>

      </div>
    </>
  )
}
