import MappaEventi from '@/components/MappaEventi'

export default function Home() {
  return (
    <main className="min-h-screen bg-mammuth-black">
      <header className="px-6 py-8 border-b border-mammuth-stone/20">
        <h1 className="text-2xl font-bold tracking-tight text-mammuth-cream">
          MAMMUTH•EVENTS™
        </h1>
        <p className="text-mammuth-stone text-sm mt-1">
          Where Communities Come Alive™ — Sermoneta, Provincia di Latina
        </p>
      </header>
      <section className="p-6">
        <h2 className="text-mammuth-gold text-lg font-semibold mb-4">
          Eventi nel territorio
        </h2>
        <MappaEventi />
      </section>
    </main>
  )
}
