'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import CategoryFilterSheet, { ActiveFilters, useFilteredEvents } from './CategoryFilterSheet';

const SUPABASE_URL = 'https://pwfsuefyiiwnltikcdho.supabase.co';
const SUPABASE_KEY = 'sb_publishable_5sHvYKX3YL7RI_RwpJK9FQ_-A2G7H63';

type Ev = {
  id: number | string;
  titolo: string;
  categoria: string;
  sottocategoria: string | null;
  luogo: string | null;
  data_inizio: string | null;
  gratuito: boolean | null;
  prezzo_min: number | null;
};

function formattaData(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

function etichettaCategoria(c: string): string {
  return c
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function EsploraEventiHero() {
  const [eventi, setEventi] = useState<Ev[]>([]);
  const [filters, setFilters] = useState<ActiveFilters>({ macro: [], sub: [] });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/eventi_view?select=id,titolo,categoria,sottocategoria,luogo,data_inizio,gratuito,prezzo_min&order=data_inizio.asc`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        );
        if (res.ok) setEventi(await res.json());
      } catch (e) {
        // silenzioso: i conteggi restano a 0 ma il bottone resta usabile
      }
    })();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    eventi.forEach((ev) => {
      counts[ev.categoria] = (counts[ev.categoria] || 0) + 1;
    });
    return counts;
  }, [eventi]);

  const filtrati = useFilteredEvents(eventi, filters);

  return (
    <>
      <CategoryFilterSheet
        variant="hero"
        activeFilters={filters}
        onChange={setFilters}
        categoryCounts={categoryCounts}
        resultCount={filtrati.length}
        onShowResults={() => setOpen(true)}
      />

      {/* OVERLAY LISTA EVENTI — stile Apple, nero su bianco */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '24px 16px', overflowY: 'auto',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '640px', marginTop: '4vh',
              background: 'rgba(255,255,255,0.98)', borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              color: '#1D1D1F', overflow: 'hidden',
            }}
          >
            {/* header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)',
              position: 'sticky', top: 0, background: 'rgba(255,255,255,0.98)', zIndex: 1,
            }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600 }}>Eventi nel territorio</div>
                <div style={{ fontSize: '12px', color: 'rgba(29,29,31,0.5)', marginTop: '2px' }}>
                  {filtrati.length} {filtrati.length === 1 ? 'evento' : 'eventi'}
                  {(filters.macro.length > 0 || filters.sub.length > 0) ? ' · filtrati' : ' · certificati'}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontSize: '14px', fontWeight: 500, color: '#007AFF',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
                }}
              >
                Chiudi
              </button>
            </div>

            {/* lista */}
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {filtrati.length === 0 ? (
                <div style={{ padding: '48px 20px', textAlign: 'center', color: 'rgba(29,29,31,0.5)', fontSize: '14px' }}>
                  Nessun evento per i filtri selezionati.
                </div>
              ) : (
                filtrati.map((ev) => {
                  const data = formattaData(ev.data_inizio);
                  return (
                    <Link
                      key={ev.id}
                      href={`/evento/${ev.id}`}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: '12px', padding: '16px 20px', textDecoration: 'none',
                        color: 'inherit', borderBottom: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.3 }}>{ev.titolo}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(29,29,31,0.55)', marginTop: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {[ev.luogo, etichettaCategoria(ev.categoria)].filter(Boolean).join(' · ')}
                        </div>
                        {data && (
                          <div style={{ fontSize: '12px', color: 'rgba(29,29,31,0.4)', marginTop: '3px' }}>{data}</div>
                        )}
                      </div>
                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        {ev.gratuito ? (
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1D7A3E' }}>Gratuito</span>
                        ) : ev.prezzo_min != null ? (
                          <span style={{ fontSize: '12px', color: 'rgba(29,29,31,0.6)' }}>da €{ev.prezzo_min}</span>
                        ) : null}
                        <div style={{ fontSize: '16px', color: 'rgba(29,29,31,0.25)', marginTop: '2px' }}>›</div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
