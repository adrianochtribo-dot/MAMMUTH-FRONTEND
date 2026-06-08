import Link from 'next/link'
import MappaEventi from '@/components/MappaEventi'

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="font-semibold text-white text-sm tracking-widest">MAMMUTH•EVENTS™</span>
          <div className="flex gap-6 text-xs text-white/60">
            <Link href="#mappa" className="hover:text-white transition">Mappa</Link>
            <Link href="#architettura" className="hover:text-white transition">Architettura</Link>
            <a href="https://adrianochtribo-dot.github.io/MAMMUTH-EV/developer/" target="_blank" className="hover:text-white transition">Developer Portal</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/7144155905_03751fa6fa_b.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs font-medium tracking-widest text-yellow-600/80 uppercase mb-6 block">
            Territorio Pilota — Sermoneta, Provincia di Latina
          </span>
          <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter leading-tight"
            style={{background:'linear-gradient(180deg,#fff 0%,#888 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            MAMMUTH•EVENTS™
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Where Communities Come Alive™
          </p>
          <p className="mt-3 text-base text-zinc-500 max-w-xl mx-auto">
            Il primo sistema di scoperta eventi iperlocale con architettura certificata KUS-3620.
          </p>
          <div className="mt-10 flex items-center justify-center gap-8 text-base">
            <a href="#mappa" className="text-blue-400 hover:underline flex items-center gap-1">
              Esplora la mappa →
            </a>
            <a href="https://mammuth-ev-production.up.railway.app/docs" target="_blank" className="text-blue-400 hover:underline flex items-center gap-1">
              Safety Engine API →
            </a>
          </div>
        </div>
      </section>

      {/* MAPPA */}
      <section id="mappa" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">
          Eventi nel territorio
        </h2>
        <p className="text-zinc-500 text-sm mb-8">
          23 eventi certificati ATLAS•EVENTA™ — verità territoriale, zero dati inventati.
        </p>
        <MappaEventi />
      </section>

      {/* BENTO GRID */}
      <section id="architettura" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">Architettura</h2>
        <p className="text-zinc-500 text-sm mb-8">KREATIO UNIVERSAL SYSTEM™ — Code 3620</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Safety Engine', value: 'v1.0.0', desc: 'Fruin LoS + Cosine Similarity storica' },
            { label: 'Risk Score', value: '0.0–1.0', desc: 'Calcolo predittivo crowd crush' },
            { label: 'Dataset', value: '23 eventi', desc: 'KUS-3620 certified — TCF 100%' },
            { label: 'Stack', value: 'Next.js 14', desc: 'Vercel Edge CDN + Railway FastAPI' },
            { label: 'Database', value: 'Supabase', desc: 'PostgreSQL + PostGIS ready' },
            { label: 'Pipeline', value: 'ATLAS•EVENTA™', desc: 'WhatsApp → Claude → JSON certificato' },
          ].map((item) => (
            <div key={item.label} className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2">{item.label}</div>
              <div className="text-2xl font-semibold text-white mb-1">{item.value}</div>
              <div className="text-xs text-zinc-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-12 text-center text-xs text-zinc-600">
        <p className="mb-2">MAMMUTH•EVENTS™ — KREATIO UNIVERSAL SYSTEM™ Code 3620</p>
        <p>Photo: ©2012 LeonardoAdrianoChelariu — Sermoneta (Latina)</p>
      </footer>

    </div>
  )
}
