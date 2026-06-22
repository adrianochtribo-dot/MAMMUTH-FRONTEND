import Link from 'next/link'
import SentinellaForm from '@/components/SentinellaForm'

export default function PresidiaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{backgroundColor:'#F5F5F7'}}>
      <div style={{width:'100%',maxWidth:'640px'}}>
        <Link href="/" className="inline-block mb-6 text-sm font-medium transition-opacity hover:opacity-70" style={{color:'#1D1D1F',textDecoration:'none'}}>
          ← Torna alla Home
        </Link>
        <SentinellaForm />
      </div>
    </div>
  )
}
