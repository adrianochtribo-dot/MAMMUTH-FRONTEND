'use client';

import { useEffect, useRef, useState } from 'react';

function loadLeaflet(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'));
    const w = window as any;
    if (w.L) return resolve(w.L);
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    const existing = document.getElementById('leaflet-js') as HTMLScriptElement | null;
    if (existing) {
      const t = setInterval(() => {
        if (w.L) { clearInterval(t); resolve(w.L); }
      }, 100);
      return;
    }
    const s = document.createElement('script');
    s.id = 'leaflet-js';
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.async = true;
    s.onload = () => resolve(w.L);
    s.onerror = () => reject(new Error('leaflet load failed'));
    document.body.appendChild(s);
  });
}

type Borgo = {
  istat_code: string;
  comune: string;
  lat: number | null;
  lng: number | null;
  presidiato: boolean;
  sentinella_nome: string | null;
  sentinella_livello: string | null;
  eventi_validati: number;
};

export default function MammuthCommunity() {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const [stato, setStato] = useState<'loading' | 'ok' | 'errore'>('loading');
  const [tot, setTot] = useState(0);
  const [presidiati, setPresidiati] = useState(0);

  useEffect(() => {
    let annullato = false;

    (async () => {
      try {
        const L = await loadLeaflet();
        if (annullato || !mapEl.current || mapRef.current) return;

        const map = L.map(mapEl.current, { scrollWheelZoom: false, attributionControl: true })
          .setView([41.35, 13.1], 9);
        mapRef.current = map;

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          maxZoom: 19,
        }).addTo(map);

        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const res = await fetch(
          `${url}/rest/v1/borghi_copertura?select=istat_code,comune,lat,lng,presidiato,sentinella_nome,sentinella_livello,eventi_validati&order=comune.asc`,
          { headers: { apikey: key as string, Authorization: `Bearer ${key}` } }
        );
        if (!res.ok) throw new Error('fetch ' + res.status);
        const rows: Borgo[] = await res.json();

        const punti: [number, number][] = [];
        let nPres = 0;

        rows.forEach((b) => {
          if (b.lat == null || b.lng == null) return;
          punti.push([b.lat, b.lng]);
          const acceso = !!b.presidiato;
          if (acceso) nPres++;

          const marker = L.circleMarker([b.lat, b.lng], {
            radius: acceso ? 8 : 6,
            color: acceso ? '#f7b733' : '#5b6472',
            fillColor: acceso ? '#ffd25a' : '#2c333d',
            fillOpacity: acceso ? 0.95 : 0.55,
            weight: acceso ? 2 : 1,
          }).addTo(map);

          const popup = acceso
            ? `<div class="mc-pop">
                 <div class="mc-pop-t">${b.comune}</div>
                 <div class="mc-pop-s">Sentinella: <b>${b.sentinella_nome ?? ''}</b></div>
                 <div class="mc-pop-l">${b.sentinella_livello ?? 'sentinella'} · ${b.eventi_validati} eventi validati</div>
               </div>`
            : `<div class="mc-pop">
                 <div class="mc-pop-t">${b.comune}</div>
                 <div class="mc-pop-cerca">Cerchiamo la Sentinella di ${b.comune}</div>
               </div>`;
          marker.bindPopup(popup);
        });

        if (punti.length) map.fitBounds(punti as any, { padding: [30, 30] });

        if (!annullato) {
          setTot(rows.length);
          setPresidiati(nPres);
          setStato('ok');
        }
      } catch (e) {
        if (!annullato) setStato('errore');
      }
    })();

    return () => {
      annullato = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <section className="mc-wrap">
      <div className="mc-head">
        <h2 className="mc-title">We Mammuth Community</h2>
        <p className="mc-claim">Ogni borgo merita una Sentinella. Accendi il tuo.</p>
      </div>

      <div className="mc-map-frame">
        <div ref={mapEl} className="mc-map" />
        {stato === 'loading' && <div className="mc-overlay">Carico la rete territoriale…</div>}
        {stato === 'errore' && <div className="mc-overlay">Mappa non disponibile al momento.</div>}
      </div>

      <div className="mc-foot">
        <div className="mc-count">
          <span className="mc-count-n">{presidiati}</span> / {tot} borghi presidiati
        </div>
        <div className="mc-legend">
          <span className="mc-dot mc-on" /> presidiato
          <span className="mc-dot mc-off" /> cerca Sentinella
        </div>
      </div>

      <style jsx>{`
        .mc-wrap {
          background: linear-gradient(160deg, #0d1015 0%, #161b22 100%);
          border: 1px solid rgba(255, 210, 90, 0.18);
          border-radius: 18px;
          padding: 28px 22px 22px;
          color: #e8eaed;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
        }
        .mc-head { text-align: center; margin-bottom: 18px; }
        .mc-title {
          font-family: 'Cinzel', Georgia, serif;
          font-size: 1.6rem;
          letter-spacing: 0.06em;
          margin: 0 0 6px;
          color: #ffd25a;
        }
        .mc-claim {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          margin: 0;
          color: #aeb4bd;
        }
        .mc-map-frame {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .mc-map { width: 100%; height: 480px; background: #0d1015; }
        .mc-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          color: #8b929c;
          background: rgba(13, 16, 21, 0.7);
        }
        .mc-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
          font-family: 'DM Mono', monospace;
          font-size: 0.82rem;
          color: #aeb4bd;
        }
        .mc-count-n { color: #ffd25a; font-size: 1.1rem; font-weight: 700; }
        .mc-legend { display: flex; align-items: center; gap: 8px; }
        .mc-dot {
          display: inline-block;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          margin: 0 4px 0 12px;
          vertical-align: middle;
        }
        .mc-on { background: #ffd25a; box-shadow: 0 0 8px #f7b733; }
        .mc-off { background: #2c333d; border: 1px solid #5b6472; }
      `}</style>
    </section>
  );
}
