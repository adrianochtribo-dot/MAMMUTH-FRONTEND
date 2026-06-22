'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryFilterSheet, { ActiveFilters, useFilteredEvents } from './CategoryFilterSheet';

const SUPABASE_URL = 'https://pwfsuefyiiwnltikcdho.supabase.co';
const SUPABASE_KEY = 'sb_publishable_5sHvYKX3YL7RI_RwpJK9FQ_-A2G7H63';

type Ev = { categoria: string; sottocategoria: string | null };

export default function EsploraEventiHero() {
  const router = useRouter();
  const [eventi, setEventi] = useState<Ev[]>([]);
  const [filters, setFilters] = useState<ActiveFilters>({ macro: [], sub: [] });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/eventi_view?select=categoria,sottocategoria`,
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

  const resultCount = useFilteredEvents(eventi, filters).length;

  return (
    <CategoryFilterSheet
      variant="hero"
      activeFilters={filters}
      onChange={setFilters}
      categoryCounts={categoryCounts}
      resultCount={resultCount}
      onShowResults={() => router.push('/mappa')}
    />
  );
}
