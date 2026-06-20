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
            <Link href="#console" className="hover:opacity-100 transition" style={{color:'inherit'}}>Console</Link>
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
          68 eventi verificati ATLAS•EVENTA™ — Sermoneta, Bassiano, Sezze, Ponza (Provincia di Latina) — verità territoriale, zero dati inventati.
        </p>
        <MappaEventi />
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
            { label: 'Dataset', value: '68 eventi', desc: 'KUS-3620 certified — TCF 100%', accent: '#38BDF8' },
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

      {/* CONSOLE TERRITORIO — replica della console.html */}
      <section id="console" style={{backgroundColor:'#141210'}}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,700&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <div style={{display:'flex',minHeight:'560px',fontFamily:"'DM Mono',monospace",flexWrap:'wrap'}}>

          {/* LATO SINISTRO — nero antracite */}
          <div style={{flex:'1 1 380px',background:'#121212',padding:'48px 40px',position:'relative'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'.62rem',letterSpacing:'.34em',color:'#e23744',textTransform:'uppercase'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#e23744',boxShadow:'0 0 10px #e23744'}} />
              MAMMUTH•EV™ · Code 3620
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontStyle:'italic',fontWeight:700,fontSize:'clamp(3.2rem,7vw,5.4rem)',lineHeight:.92,color:'#e23744',margin:'30px 0 0'}}>
              Territorio
              <small style={{display:'block',fontStyle:'normal',fontFamily:"'DM Mono',monospace",fontSize:'.66rem',letterSpacing:'.18em',color:'#8a8178',textTransform:'uppercase',marginTop:'14px'}}>Interroga la mappa, non l&apos;etichetta</small>
            </h2>
            <p style={{fontSize:'.72rem',lineHeight:1.9,color:'#8a8178',marginTop:'24px',maxWidth:'340px'}}>
              Scrivi un comune nella <b style={{color:'#ece3d6',fontWeight:400}}>Dynamic Island</b> a destra. Il motore cerca tra gli eventi certificati e verifica, per ognuno, se le coordinate cadono davvero dentro i confini ISTAT del territorio. La <b style={{color:'#ece3d6',fontWeight:400}}>cucitura</b> al centro porta la richiesta dal lato dell&apos;archivio a quello della mappa.
            </p>
          </div>

          {/* CUCITURA */}
          <div style={{width:'18px',background:'#2a2017',position:'relative',flexShrink:0}}>
            <div style={{position:'absolute',top:0,bottom:0,left:'5px',width:'1px',backgroundImage:'repeating-linear-gradient(to bottom, #cfc2ad 0 4px, transparent 4px 8px)'}} />
            <div style={{position:'absolute',top:0,bottom:0,right:'5px',width:'1px',backgroundImage:'repeating-linear-gradient(to bottom, #cfc2ad 0 4px, transparent 4px 8px)'}} />
          </div>

          {/* LATO DESTRO — rosso */}
          <div style={{flex:'1 1 380px',background:'linear-gradient(135deg,#c41420,#8f0d16)',padding:'48px 40px',display:'flex',alignItems:'center'}}>
            <div style={{width:'100%',background:'rgba(10,10,10,.55)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'18px',padding:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <div style={{fontSize:'.62rem',color:'#ece3d6',letterSpacing:'.06em'}}>Target Territory</div>
                  <div style={{fontSize:'.66rem',color:'#e23744',fontWeight:500,marginTop:'3px',letterSpacing:'.1em',textTransform:'uppercase'}}>◎ In attesa · nessun territorio</div>
                </div>
                <div style={{textAlign:'right',fontSize:'.56rem',color:'#8a8178'}}>
                  <div>Sab · 20 giu</div>
                  <div style={{color:'#5a544c',marginTop:'2px'}}>Crawl window</div>
                </div>
              </div>
              <div style={{padding:'14px 0',display:'flex',alignItems:'baseline',gap:'10px'}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontStyle:'italic',fontWeight:700,fontSize:'1.7rem',color:'#e23744'}}>Mammuth</span>
                <span style={{fontSize:'.58rem',color:'#8a8178',letterSpacing:'.04em'}}>[v2.4_geo]</span>
              </div>
              <div style={{fontSize:'.62rem',lineHeight:1.7,color:'#8a8178',borderTop:'1px solid rgba(255,255,255,.05)',paddingTop:'12px'}}>
                <div style={{fontSize:'.5rem',letterSpacing:'.2em',color:'#5a544c',textTransform:'uppercase',marginBottom:'5px'}}>T.C.F. Context Filter</div>
                Tolleranza di precisione geografica impostata a <u style={{color:'#ece3d6',textDecoration:'underline dashed #e23744',textUnderlineOffset:'3px'}}>punto-nel-poligono</u>. Apri la Console per agganciare un comune.
              </div>
              <div style={{marginTop:'14px',paddingTop:'12px',borderTop:'1px solid rgba(255,255,255,.05)'}}>
                <a href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/console.html" target="_blank" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 20px',borderRadius:'999px',background:'#e23744',color:'#141210',fontSize:'.62rem',fontWeight:500,letterSpacing:'.08em',textTransform:'uppercase',textDecoration:'none'}}>
                  Apri la Console Territorio →
                </a>
              </div>
            </div>
          </div>

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
  )
}
