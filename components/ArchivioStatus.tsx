'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Freschezza = {
  totale_eventi: number;
  totale_validati: number;
  nuovi_24h: number;
  nuovi_7g: number;
  aggiornati_24h: number;
  ultimo_inserimento: string | null;
  ultimo_aggiornamento: string | null;
  in_lavorazione: number;
};

export default function ArchivioStatus() {
  const [data, setData] = useState<Freschezza | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: row, error } = await supabase
        .from('archivio_freschezza')
        .select('*')
        .single();
      if (!active) return;
      if (!error && row) setData(row as Freschezza);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="archivio-status archivio-status--loading">
        <span className="archivio-dot archivio-dot--idle" />
        <span>Caricamento archivio…</span>
      </div>
    );
  }

  if (!data) return null;

  // Calcolo freschezza reale: ore dall'ultimo aggiornamento
  const riferimento = data.ultimo_aggiornamento ?? data.ultimo_inserimento;
  const oreDaUltimo = riferimento
    ? (Date.now() - new Date(riferimento).getTime()) / 36e5
    : Infinity;

  const isLive = oreDaUltimo <= 48; // verde se < 48h, altrimenti ambra
  const dataFmt = riferimento
    ? new Date(riferimento).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  return (
    <div className={`archivio-status ${isLive ? 'is-live' : 'is-consolidated'}`}>
      <span
        className={`archivio-dot ${
          isLive ? 'archivio-dot--live' : 'archivio-dot--amber'
        }`}
      />
      <div className="archivio-status__text">
        <strong>
          {isLive
            ? 'Archivio in aggiornamento'
            : 'Archivio MAMMUTH consolidato'}
        </strong>
        <span className="archivio-status__meta">
          {data.totale_eventi} eventi · {data.totale_validati} validati ·{' '}
          {data.in_lavorazione} in lavorazione · ultimo {dataFmt}
        </span>
      </div>

      <style jsx>{`
        .archivio-status {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(20, 22, 28, 0.72);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: 'DM Mono', monospace;
          color: #e8e8ea;
          width: fit-content;
          max-width: 100%;
        }
        .archivio-status__text {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }
        .archivio-status__text strong {
          font-size: 13px;
          letter-spacing: 0.02em;
        }
        .archivio-status__meta {
          font-size: 11px;
          opacity: 0.62;
        }
        .archivio-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .archivio-dot--live {
          background: #34d399;
          box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
          animation: pulse 2s infinite;
        }
        .archivio-dot--amber {
          background: #f59e0b;
        }
        .archivio-dot--idle {
          background: #6b7280;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
          }
          70% {
            box-shadow: 0 0 0 7px rgba(52, 211, 153, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
          }
        }
      `}</style>
    </div>
  );
}
