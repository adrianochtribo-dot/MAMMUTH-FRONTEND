'use client';

import { useEffect, useState } from 'react';

type Borgo = { istat_code: string; comune: string };

export default function SentinellaForm() {
  const [borghi, setBorghi] = useState<Borgo[]>([]);
  const [nome, setNome] = useState('');
  const [istat, setIstat] = useState('');
  const [contatto, setContatto] = useState('');
  const [stato, setStato] = useState<'idle' | 'invio' | 'ok' | 'errore'>('idle');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${url}/rest/v1/borghi_copertura?select=istat_code,comune&order=comune.asc`,
          { headers: { apikey: key as string, Authorization: `Bearer ${key}` } }
        );
        if (res.ok) setBorghi(await res.json());
      } catch (e) {
        // tendina vuota: il form resta usabile ma senza opzioni
      }
    })();
  }, [url, key]);

  async function invia() {
    if (!nome.trim() || !istat || !contatto.trim()) {
      setStato('errore');
      return;
    }
    const borgo = borghi.find((b) => b.istat_code === istat);
    setStato('invio');
    try {
      const res = await fetch(`${url}/rest/v1/sentinelle`, {
        method: 'POST',
        headers: {
          apikey: key as string,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          contatto: contatto.trim(),
          territorio_istat: istat,
          territorio_nome: borgo ? borgo.comune : '',
          livello: 'sentinella',
          stato: 'in_attesa',
        }),
      });
      if (!res.ok) throw new Error('post ' + res.status);
      setStato('ok');
      setNome('');
      setIstat('');
      setContatto('');
    } catch (e) {
      setStato('errore');
    }
  }

  if (stato === 'ok') {
    return (
      <div className="sf-wrap sf-done">
        <div className="sf-done-t">Candidatura ricevuta</div>
        <p className="sf-done-p">
          Grazie. La tua proposta è in valutazione: appena approvata, il tuo borgo
          si accenderà sulla mappa.
        </p>
        <button className="sf-btn-ghost" onClick={() => setStato('idle')}>
          Candida un altro borgo
        </button>
        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <div className="sf-wrap">
      <div className="sf-eyebrow">Diventa Sentinella</div>
      <h3 className="sf-title">Candidati a presidiare il tuo borgo</h3>
      <p className="sf-sub">
        Una persona, un borgo. Proponi eventi del tuo territorio: Mammuth li valida.
      </p>

      <div className="sf-field">
        <label className="sf-label">Nome</label>
        <input
          className="sf-input"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Il tuo nome (sarà il credito pubblico)"
        />
      </div>

      <div className="sf-field">
        <label className="sf-label">Borgo</label>
        <select className="sf-input" value={istat} onChange={(e) => setIstat(e.target.value)}>
          <option value="">Scegli il tuo comune…</option>
          {borghi.map((b) => (
            <option key={b.istat_code} value={b.istat_code}>
              {b.comune}
            </option>
          ))}
        </select>
      </div>

      <div className="sf-field">
        <label className="sf-label">Contatto</label>
        <input
          className="sf-input"
          type="text"
          value={contatto}
          onChange={(e) => setContatto(e.target.value)}
          placeholder="Telegram @ , email o telefono (privato)"
        />
      </div>

      {stato === 'errore' && (
        <div className="sf-err">Compila nome, borgo e contatto, poi riprova.</div>
      )}

      <button className="sf-btn" onClick={invia} disabled={stato === 'invio'}>
        {stato === 'invio' ? 'Invio…' : 'Invia candidatura'}
      </button>

      <style jsx>{styles}</style>
    </div>
  );
}

const styles = `
  .sf-wrap {
    background: linear-gradient(160deg, #0d1015 0%, #161b22 100%);
    border: 1px solid rgba(255, 210, 90, 0.18);
    border-radius: 18px;
    padding: 26px 22px;
    color: #e8eaed;
    max-width: 520px;
    margin: 18px auto 0;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
  }
  .sf-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #f7b733;
    text-align: center;
    margin-bottom: 6px;
  }
  .sf-title {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 1.15rem;
    color: #ffd25a;
    text-align: center;
    margin: 0 0 6px;
  }
  .sf-sub {
    font-family: 'Fraunces', Georgia, serif;
    font-style: italic;
    font-size: 0.85rem;
    color: #aeb4bd;
    text-align: center;
    margin: 0 0 18px;
  }
  .sf-field { margin-bottom: 12px; }
  .sf-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #8b929c;
    margin-bottom: 5px;
  }
  .sf-input {
    width: 100%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 10px 12px;
    color: #e8eaed;
    font-size: 0.9rem;
    outline: none;
    box-sizing: border-box;
  }
  .sf-input:focus { border-color: rgba(255, 210, 90, 0.5); }
  .sf-input::placeholder { color: #5b6472; }
  .sf-err {
    font-family: 'DM Mono', monospace;
    font-size: 0.74rem;
    color: #ff8a8a;
    margin: 6px 0 10px;
    text-align: center;
  }
  .sf-btn {
    width: 100%;
    margin-top: 6px;
    padding: 11px;
    border: none;
    border-radius: 999px;
    background: linear-gradient(135deg, #f7b733, #ffd25a);
    color: #0d1015;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .sf-btn:disabled { opacity: 0.6; cursor: default; }
  .sf-done { text-align: center; }
  .sf-done-t {
    font-family: 'Cinzel', Georgia, serif;
    font-size: 1.1rem;
    color: #ffd25a;
    margin-bottom: 8px;
  }
  .sf-done-p {
    font-size: 0.88rem;
    color: #aeb4bd;
    margin: 0 0 16px;
  }
  .sf-btn-ghost {
    background: transparent;
    border: 1px solid rgba(255, 210, 90, 0.4);
    color: #ffd25a;
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 0.78rem;
    cursor: pointer;
  }
`;
