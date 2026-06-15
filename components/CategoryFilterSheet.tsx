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
    id: 'palio',
    label: 'Palio',
    icon: Crown,
    color: '#F6D9D2',
    glow: '#FF6B5A',
    subcategories: [
      { id: 'palio_equestre', label: 'Palio Equestre' },
      { id: 'palio_remiero', label: 'Palio Remiero' },
      { id: 'palio_forza', label: 'Palio di Forza' },
      { id: 'palio_rievocazione', label: 'Palio Storico / Rievocazione' },
    ],
  },
  {
    id: 'tradizioni_folklore',
    label: 'Tradizioni & Folklore',
    icon: Crown,
    color: '#EDE9FE',
    glow: '#A78BFA',
    subcategories: [
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
    id: 'sagra',
    label: 'Sagra',
    icon: Wine,
    color: '#F7E3CE',
    glow: '#F59E0B',
    subcategories: [
      { id: 'sagra_gastronomica', label: 'Sagra Gastronomica' },
      { id: 'sagra_territoriale', label: 'Sagra Territoriale' },
      { id: 'festival_vino', label: 'Festival del Vino' },
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
  categoryCounts?: Record<string, number>;
}

// Schiarisce un colore hex (#RRGGBB) miscelandolo con bianco in proporzione
// `amount` (0-1). Usato per generare lo stop "chiaro" del riflesso in alto
// a partire dal colore base (cat.glow).
const lighten = (hex: string, amount: number) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

// Stile "glossy" calibrato sui pixel campionati da _Control.png — badge
// verde "5" e arancio "12" di Taaks, 4 quadranti ciascuno: in ENTRAMBI il
// pattern e' un gradiente DIAGONALE 135deg, chiaro in alto-sinistra ->
// colore base in basso-destra, con un riflesso di ~+20% verso il bianco
// (verde #61DD94->#3AD579, arancio #F4AD70->#F0A165, entrambi ~18-20% su
// tutti i canali). Ombra esterna nella stessa tonalita' del cerchio
// (misurata sotto il badge verde: ~#48A77F, non grigia), offset in basso
// a destra, per l'effetto "galleggia sulla card".
// `size` (px) scala offset/blur dell'ombra in proporzione al cerchio.
const iconCircle = (color: string, size: number = 40) => {
  const highlight = lighten(color, 0.2);
  const offsetY = +(size * 0.07).toFixed(1);
  const blur = +(size * 0.22).toFixed(1);
  return {
    background: `linear-gradient(135deg, ${highlight} 0%, ${color} 100%)`,
    boxShadow: `0 ${offsetY}px ${blur}px ${color}66`,
  };
};

export default function CategoryFilterSheet({
  activeFilters,
  onChange,
  resultCount,
  categoryCounts = {},
}: CategoryFilterSheetProps) {
  const [open, setOpen] = useState(false);
  const [expandedMacro, setExpandedMacro] = useState<string | null>(null);

  const totalActive = activeFilters.macro.length + activeFilters.sub.length;

  // Triade fissa: identita del progetto — SAGRA, FESTA RELIGIOSA, PALIO.
  // Non le prime 3 per conteggio. Le altre 10 (incluse quelle a 0) vanno
  // nella griglia, ordinate per conteggio.
  const FEATURED_IDS = ['sagra', 'feste_religiose', 'palio'];

  const topThree = useMemo(() => {
    return FEATURED_IDS.map((id) => CATEGORIES.find((c) => c.id === id)!).filter(Boolean);
  }, []);

  const rest = useMemo(() => {
    return CATEGORIES.filter((c) => !FEATURED_IDS.includes(c.id)).sort(
      (a, b) => (categoryCounts[b.id] ?? 0) - (categoryCounts[a.id] ?? 0)
    );
  }, [categoryCounts]);

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

  const clearAll = () => {
    onChange({ macro: [], sub: [] });
    setExpandedMacro(null);
  };

  const toggleExpand = (id: string) =>
    setExpandedMacro((prev) => (prev === id ? null : id));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30
                   flex items-center gap-2 rounded-full
                   bg-white/60 backdrop-blur-xl backdrop-saturate-150
                   px-5 py-3 shadow-lg shadow-black/10
                   border border-white/40
                   text-[15px] font-medium text-[#1D1D1F]
                   transition-transform active:scale-95
                   hover:shadow-xl hover:bg-white/70"
        aria-label="Esplora categorie eventi"
      >
        <Search size={18} strokeWidth={2.2} />
        <span>Esplora eventi</span>
        {totalActive > 0 && (
          <span
            className="ml-1 flex h-5 min-w-5 items-center justify-center
                       rounded-full bg-[#1D1D1F]/80 backdrop-blur px-1.5 text-[11px]
                       font-semibold text-white"
          >
            {totalActive}
          </span>
        )}
      </button>

      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-40 backdrop-blur-[2px]"
            style={{
              background:
                'radial-gradient(circle at 12% 8%,  #FCEBE3 0%, transparent 45%),' +
                'radial-gradient(circle at 88% 15%, #87AAC6 0%, transparent 50%),' +
                'radial-gradient(circle at 75% 55%, #456D91 0%, transparent 55%),' +
                'radial-gradient(circle at 25% 92%, #C2D0DD 0%, transparent 45%),' +
                'rgba(0,0,0,0.10)',
            }}
          />
          <Drawer.Content
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh]
                       flex-col rounded-t-2xl
                       bg-white/75 backdrop-blur-2xl backdrop-saturate-150
                       border border-white/40 border-b-0
                       shadow-[0_-8px_40px_rgba(0,0,0,0.12)]
                       sm:left-1/2 sm:right-auto sm:top-auto sm:bottom-6
                       sm:-translate-x-1/2 sm:w-[420px]
                       sm:max-h-[700px] sm:rounded-2xl sm:border-b"
          >
            <div className="mx-auto mt-2.5 h-1 w-9 rounded-full bg-black/15 sm:hidden" />

            <div className="flex items-center justify-between px-5 pt-4">
              <button
                onClick={clearAll}
                className={`text-[15px] font-normal ${
                  totalActive > 0 ? 'text-[#0A84FF]' : 'text-transparent pointer-events-none'
                }`}
              >
                Azzera
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-[15px] font-medium text-[#0A84FF]"
              >
                Chiudi
              </button>
            </div>

            <div className="px-5 pt-1 pb-3 text-center">
              <h2
                className="text-[22px] font-bold tracking-tight bg-clip-text text-transparent
                           bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B]"
              >
                Event•Control
              </h2>
              {typeof resultCount === 'number' && (
                <p className="text-[12px] text-[#3A3A3C]/70 mt-0.5">
                  {resultCount} eventi corrispondenti
                </p>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-2">
              {/* 3 BARRE: identità del progetto, rilievo marcato */}
              <div className="space-y-2">
                {topThree.map((cat) => {
                  const Icon = cat.icon;
                  const count = categoryCounts[cat.id] ?? 0;
                  const isActive = activeFilters.macro.includes(cat.id);
                  const isExpanded = expandedMacro === cat.id;
                  const activeSubCount = cat.subcategories.filter((s) =>
                    activeFilters.sub.includes(s.id)
                  ).length;
                  const hasSelection = isActive || activeSubCount > 0;

                  return (
                    <div key={cat.id}>
                      <div
                        onClick={() => toggleMacro(cat.id)}
                        style={{ backgroundColor: cat.color }}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3.5
                                    shadow-[0_14px_32px_-8px_rgba(0,0,0,0.28)] cursor-pointer
                                    transition-transform active:scale-[0.98]
                                    ${hasSelection ? 'ring-2 ring-[#1D1D1F]/25' : ''}`}
                      >
                        <div
                          style={iconCircle(cat.glow, 44)}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                        >
                          <Icon size={21} strokeWidth={2.2} color="#FFFFFF" />
                        </div>

                        <span className="flex-1 text-[16px] font-bold text-[#1D1D1F]">
                          {cat.label}
                        </span>

                        {hasSelection && (
                          <Check size={18} strokeWidth={2.5} color={cat.glow} />
                        )}

                        <div
                          style={iconCircle(cat.glow, 32)}
                          className="flex h-8 min-w-8 items-center justify-center
                                     rounded-full px-2.5 text-[14px] font-bold text-white"
                        >
                          {count}
                        </div>

                        {cat.subcategories.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(cat.id);
                            }}
                            aria-label="Mostra sottocategorie"
                            className="flex h-7 w-7 items-center justify-center rounded-full
                                       hover:bg-black/5 transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDown size={18} strokeWidth={2.5} className="text-[#1D1D1F]/45" />
                            ) : (
                              <ChevronRight size={18} strokeWidth={2.5} className="text-[#1D1D1F]/45" />
                            )}
                          </button>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="mt-1.5 mb-1 grid grid-cols-2 gap-1.5 px-0.5">
                          {cat.subcategories.map((sub) => {
                            const subActive = activeFilters.sub.includes(sub.id);
                            return (
                              <button
                                key={sub.id}
                                onClick={() => toggleSub(cat.id, sub.id)}
                                style={{
                                  backgroundColor: subActive ? cat.glow : 'rgba(255,255,255,0.7)',
                                  color: subActive ? '#FFFFFF' : '#3A3A3C',
                                }}
                                className="rounded-xl px-3 py-2.5 text-[13px] font-medium text-left
                                           shadow-sm transition-colors active:scale-[0.98]"
                              >
                                {sub.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* GRIGLIA 2 COLONNE: le restanti 9 categorie, sempre visibili
                  (incluse quelle a 0 eventi - verità territoriale certificata) */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {rest.map((cat) => {
                  const Icon = cat.icon;
                  const count = categoryCounts[cat.id] ?? 0;
                  const isActive = activeFilters.macro.includes(cat.id);
                  const activeSubCount = cat.subcategories.filter((s) =>
                    activeFilters.sub.includes(s.id)
                  ).length;
                  const hasSelection = isActive || activeSubCount > 0;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => toggleMacro(cat.id)}
                      style={{ backgroundColor: cat.color }}
                      className={`flex items-center gap-2.5 rounded-2xl px-3 py-3
                                  shadow-[0_8px_20px_-6px_rgba(0,0,0,0.22)] cursor-pointer
                                  transition-transform active:scale-[0.97]
                                  ${count === 0 ? 'opacity-65' : ''}
                                  ${hasSelection ? 'ring-2 ring-[#1D1D1F]/25 opacity-100' : ''}`}
                    >
                      <div
                        style={iconCircle(cat.glow, 36)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      >
                        <Icon size={16} strokeWidth={2.2} color="#FFFFFF" />
                      </div>
                      <span className="flex-1 text-[13px] font-semibold text-[#1D1D1F] leading-tight">
                        {cat.label}
                      </span>
                      <div
                        style={iconCircle(cat.glow, 24)}
                        className="flex h-6 min-w-6 items-center justify-center
                                   rounded-full px-1.5 text-[12px] font-bold text-white"
                      >
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/40 bg-white/50 backdrop-blur-xl px-5 py-3.5 sm:rounded-b-2xl">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-[#1D1D1F]/90 backdrop-blur py-3
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
