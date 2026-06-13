'use client';

import { useState, useMemo } from 'react';
import { Drawer } from 'vaul';
import {
  Crown,
  Church,
  Wine,
  Palette,
  Clapperboard,
  Music,
  Footprints,
  Mountain,
  Store,
  Gamepad2,
  Bike,
  FlaskConical,
  Search,
  ChevronRight,
  ChevronDown,
  Check,
} from 'lucide-react';

export interface CategoryDefinition {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  subcategories: { id: string; label: string }[];
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'tradizioni_folklore',
    label: 'Tradizioni & Folklore',
    icon: Crown,
    color: '#F6D9D2',
    glow: '#FF6B5A',
    subcategories: [
      { id: 'palio_equestre', label: 'Palio Equestre' },
      { id: 'palio_remiero', label: 'Palio Remiero' },
      { id: 'palio_forza', label: 'Palio di Forza' },
      { id: 'corteo_storico', label: 'Corteo Storico' },
      { id: 'carnevale_estivo', label: 'Carnevale Estivo' },
      { id: 'processione_danzante', label: 'Processione Danzante' },
    ],
  },
  {
    id: 'feste_religiose',
    label: 'Feste Religiose & Patronali',
    icon: Church,
    color: '#E7DDF6',
    glow: '#8B5CF6',
    subcategories: [
      { id: 'solennita_nazionale', label: 'Solennità Nazionale' },
      { id: 'processione_marina', label: 'Processione Marina' },
      { id: 'festa_patronale', label: 'Festa Patronale' },
      { id: 'rito_canonici', label: 'Rito dei Canonici' },
    ],
  },
  {
    id: 'enogastronomia',
    label: 'Enogastronomia',
    icon: Wine,
    color: '#F7E3CE',
    glow: '#F59E0B',
    subcategories: [
      { id: 'festival_vino', label: 'Festival del Vino' },
      { id: 'sagra', label: 'Sagra' },
      { id: 'street_food', label: 'Street Food' },
      { id: 'prodotto_dop_igp', label: 'Prodotto DOP/IGP' },
    ],
  },
  {
    id: 'cultura_mostre',
    label: 'Cultura & Mostre',
    icon: Palette,
    color: '#DCEEF7',
    glow: '#0EA5E9',
    subcategories: [
      { id: 'mostra_arte', label: "Mostra d'Arte" },
      { id: 'architettura_open_house', label: 'Architettura / Open House' },
      { id: 'fotografia', label: 'Fotografia' },
    ],
  },
  {
    id: 'cinema_spettacolo',
    label: 'Cinema & Spettacolo',
    icon: Clapperboard,
    color: '#E0E7F7',
    glow: '#6366F1',
    subcategories: [
      { id: 'festival_cinema', label: 'Festival Cinema' },
      { id: 'arena_estiva', label: 'Arena Estiva' },
      { id: 'anteprima', label: 'Anteprima' },
    ],
  },
  {
    id: 'musica_festival',
    label: 'Musica & Festival',
    icon: Music,
    color: '#FBE0EE',
    glow: '#EC4899',
    subcategories: [
      { id: 'folk_balfolk', label: 'Folk / Balfolk' },
      { id: 'festival_alta_quota', label: 'Festival Alta Quota' },
      { id: 'musica_classica', label: 'Musica Classica' },
    ],
  },
  {
    id: 'sport_outdoor',
    label: 'Sport & Outdoor',
    icon: Footprints,
    color: '#DEF5E6',
    glow: '#22C55E',
    subcategories: [
      { id: 'maratona', label: 'Maratona' },
      { id: 'mezza_maratona', label: 'Mezza Maratona' },
      { id: 'regata_storica', label: 'Regata Storica' },
    ],
  },
  {
    id: 'montagna_natura',
    label: 'Montagna & Natura',
    icon: Mountain,
    color: '#E1F0EC',
    glow: '#14B8A6',
    subcategories: [
      { id: 'festival_quota', label: 'Festival in Quota' },
      { id: 'trekking_evento', label: 'Trekking Evento' },
      { id: 'astronomia_star_party', label: 'Astronomia / Star Party' },
    ],
  },
  {
    id: 'fiere_mercati',
    label: 'Fiere & Mercati',
    icon: Store,
    color: '#F7E9D7',
    glow: '#D97706',
    subcategories: [
      { id: 'fiera_campionaria', label: 'Fiera Campionaria' },
      { id: 'fiera_agricola', label: 'Fiera Agricola / Zootecnica' },
      { id: 'mostra_mercato_artigianato', label: 'Mostra Mercato Artigianato' },
    ],
  },
  {
    id: 'pop_culture_gaming',
    label: 'Pop Culture & Gaming',
    icon: Gamepad2,
    color: '#E5E5FB',
    glow: '#7C3AED',
    subcategories: [
      { id: 'comix_cosplay', label: 'Comix / Cosplay' },
      { id: 'giochi_tavolo', label: 'Giochi da Tavolo' },
      { id: 'escape_room', label: 'Escape Room' },
    ],
  },
  {
    id: 'motori_epoca',
    label: "Motori d'Epoca",
    icon: Bike,
    color: '#EAEAEA',
    glow: '#52525B',
    subcategories: [
      { id: 'raduno_auto_storiche', label: 'Raduno Auto Storiche' },
      { id: 'motoraduno', label: 'Motoraduno' },
      { id: 'mostra_scambio', label: 'Mostra Scambio' },
    ],
  },
  {
    id: 'convegni_scienza',
    label: 'Convegni & Scienza',
    icon: FlaskConical,
    color: '#E2F0FE',
    glow: '#3B82F6',
    subcategories: [
      { id: 'congresso_medico_tecnico', label: 'Congresso Medico/Tecnico' },
      { id: 'simposio_accademico', label: 'Simposio Accademico' },
    ],
  },
];

export interface ActiveFilters {
  macro: string[];
  sub: string[];
}

interface CategoryFilterSheetProps {
  activeFilters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
  resultCount?: number;
}

export default function CategoryFilterSheet({
  activeFilters,
  onChange,
  resultCount,
}: CategoryFilterSheetProps) {
  const [open, setOpen] = useState(false);
  const [expandedMacro, setExpandedMacro] = useState<string | null>(null);

  const totalActive = activeFilters.macro.length + activeFilters.sub.length;

  const toggleMacro = (id: string) => {
    const isActive = activeFilters.macro.includes(id);
    const category = CATEGORIES.find((c) => c.id === id);
    const subIds = category?.subcategories.map((s) => s.id) ?? [];

    if (isActive) {
      onChange({
        macro: activeFilters.macro.filter((m) => m !== id),
        sub: activeFilters.sub.filter((s) => !subIds.includes(s)),
      });
    } else {
      onChange({
        macro: [...activeFilters.macro, id],
        sub: activeFilters.sub,
      });
    }
  };

  const toggleSub = (macroId: string, subId: string) => {
    const isActive = activeFilters.sub.includes(subId);
    let newSub: string[];
    let newMacro = activeFilters.macro;

    if (isActive) {
      newSub = activeFilters.sub.filter((s) => s !== subId);
    } else {
      newSub = [...activeFilters.sub, subId];
      if (!newMacro.includes(macroId)) {
        newMacro = [...newMacro, macroId];
      }
    }
    onChange({ macro: newMacro, sub: newSub });
  };

  const clearAll = () => onChange({ macro: [], sub: [] });

  const toggleExpand = (id: string) =>
    setExpandedMacro((prev) => (prev === id ? null : id));

  return (
    <>
      {/* Pulsante flottante "Discover" */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30
                   flex items-center gap-2 rounded-full
                   bg-white/90 backdrop-blur-md
                   px-5 py-3 shadow-lg shadow-black/10
                   border border-black/5
                   text-[15px] font-medium text-[#1D1D1F]
                   transition-transform active:scale-95
                   hover:shadow-xl"
        aria-label="Esplora categorie eventi"
      >
        <Search size={18} strokeWidth={2.2} />
        <span>Esplora eventi</span>
        {totalActive > 0 && (
          <span
            className="ml-1 flex h-5 min-w-5 items-center justify-center
                       rounded-full bg-[#1D1D1F] px-1.5 text-[11px]
                       font-semibold text-white"
          >
            {totalActive}
          </span>
        )}
      </button>

      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
          <Drawer.Content
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[60vh]
                       flex-col rounded-t-2xl bg-white
                       sm:left-1/2 sm:right-auto sm:top-auto sm:bottom-6
                       sm:-translate-x-1/2 sm:w-[420px]
                       sm:max-h-[500px] sm:rounded-2xl"
          >
            {/* Drag handle */}
            <div className="mx-auto mt-2.5 h-1 w-9 rounded-full bg-black/15 sm:hidden" />

            {/* Header: titolo + Chiudi/Annulla testuale (HIG) */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <button
                onClick={clearAll}
                className={`text-[15px] font-normal ${
                  totalActive > 0 ? 'text-[#0A84FF]' : 'text-transparent pointer-events-none'
                }`}
              >
                Azzera
              </button>
              <h2 className="text-[17px] font-semibold text-[#1D1D1F]">
                Categorie
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-[15px] font-medium text-[#0A84FF]"
              >
                Chiudi
              </button>
            </div>

            {typeof resultCount === 'number' && (
              <p className="px-5 pb-2 text-[13px] text-[#86868B]">
                {resultCount} eventi corrispondenti
              </p>
            )}

            {/* Lista verticale, sfondo unico, separatori sottili */}
            <div className="flex-1 overflow-y-auto">
              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isActive = activeFilters.macro.includes(cat.id);
                const isExpanded = expandedMacro === cat.id;
                const activeSubCount = cat.subcategories.filter((s) =>
                  activeFilters.sub.includes(s.id)
                ).length;

                return (
                  <div key={cat.id}>
                    {/* Riga macro-categoria */}
                    <button
                      onClick={() => toggleExpand(cat.id)}
                      className="flex w-full items-center gap-3 px-5 py-3
                                 text-left active:bg-black/[0.03] transition-colors"
                    >
                      {/* Icona bianca su squircle colorato */}
                      <div
                        style={{ backgroundColor: cat.glow }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
                      >
                        <Icon size={17} strokeWidth={2.2} color="#FFFFFF" />
                      </div>

                      <span className="flex-1 text-[15px] text-[#1D1D1F]">
                        {cat.label}
                      </span>

                      {/* Contatore selezioni o badge attivo */}
                      {(isActive || activeSubCount > 0) && (
                        <span
                          style={{ backgroundColor: cat.glow }}
                          className="flex h-5 min-w-5 items-center justify-center
                                     rounded-full px-1.5 text-[11px] font-semibold text-white"
                        >
                          {activeSubCount > 0 ? activeSubCount : '✓'}
                        </span>
                      )}

                      {/* Freccetta (chevron) — HIG */}
                      {isExpanded ? (
                        <ChevronDown size={16} strokeWidth={2.5} className="text-[#C7C7CC]" />
                      ) : (
                        <ChevronRight size={16} strokeWidth={2.5} className="text-[#C7C7CC]" />
                      )}
                    </button>

                    {/* Separatore sottile (non a tutta larghezza) */}
                    {idx < CATEGORIES.length - 1 && (
                      <div className="ml-5 h-px bg-black/[0.06]" />
                    )}

                    {/* Sottocategorie: lista indentata, righe con checkmark */}
                    {isExpanded && (
                      <div className="bg-black/[0.015]">
                        {cat.subcategories.map((sub, subIdx) => {
                          const subActive = activeFilters.sub.includes(sub.id);
                          return (
                            <div key={sub.id}>
                              <button
                                onClick={() => toggleSub(cat.id, sub.id)}
                                className="flex w-full items-center gap-3 pl-[52px] pr-5 py-2.5
                                           text-left active:bg-black/[0.03] transition-colors"
                              >
                                <span className="flex-1 text-[14px] text-[#3A3A3C]">
                                  {sub.label}
                                </span>
                                {subActive && (
                                  <Check size={16} strokeWidth={2.5} color={cat.glow} />
                                )}
                              </button>
                              {subIdx < cat.subcategories.length - 1 && (
                                <div className="ml-[52px] h-px bg-black/[0.06]" />
                              )}
                            </div>
                          );
                        })}
                        {idx < CATEGORIES.length - 1 && (
                          <div className="ml-5 h-px bg-black/[0.06]" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer azione */}
            <div className="border-t border-black/[0.06] bg-white px-5 py-3.5 sm:rounded-b-2xl">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-[#1D1D1F] py-3
                           text-[15px] font-semibold text-white
                           transition-transform active:scale-[0.98]"
              >
                Mostra {typeof resultCount === 'number' ? resultCount : ''} eventi
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export function useFilteredEvents<T extends { categoria: string; sottocategoria?: string | null }>(events: T[], filters: ActiveFilters): T[] {
  return useMemo(() => {
    if (filters.macro.length === 0 && filters.sub.length === 0) return events;
    return events.filter((ev) => {
      const macroMatch =
        filters.macro.length === 0 ||
        filters.macro.includes(ev.categoria);
      const subMatch =
        filters.sub.length === 0 ||
        (ev.sottocategoria && filters.sub.includes(ev.sottocategoria));
      const hasSubFiltersForMacro = filters.sub.length > 0;
      return hasSubFiltersForMacro ? macroMatch && subMatch : macroMatch;
    });
  }, [events, filters]);
}
