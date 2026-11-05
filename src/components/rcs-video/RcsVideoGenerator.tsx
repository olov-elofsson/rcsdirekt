// @ts-nocheck – UI-komponent med lösa typer för flödesdata
import { ArrowDown, ArrowUp, Download, FileJson, Pause, Play, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrayBufferTarget, Muxer } from "mp4-muxer";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { buildProject, canExportMp4, createRenderer, exportMp4, loadInterFontCss, replyOptions, validateFlow } from "@/lib/rcs-video/engine";
import { emptyFlow, exampleFlow, type Chip, type Flow, type Step } from "@/lib/rcs-video/defaults";

const STORE_KEY = "rcsv-profiles-v1";
const SCALE = 0.86;

// ---------- hjälpfunktioner ----------
const clone = <T,>(x: T): T => structuredClone(x);
const slug = (s: string) =>
  (s || "rcs-demo").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "rcs-demo";

function loadProfiles(): Record<string, Flow> {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveProfiles(p: Record<string, Flow>) {
  localStorage.setItem(STORE_KEY, JSON.stringify(p));
}

/** Läser en bild, beskär till exakt storlek (cover) och returnerar en data-URL. */
async function fitImage(file: File, w: number, h: number, type: "image/png" | "image/jpeg", quality = 0.9) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    if (type === "image/jpeg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
    }
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    return c.toDataURL(type, quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function downloadBlob(blob: Blob, name: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 1000);
}

// ---------- små UI-byggstenar ----------
function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}
function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
const selectCls = "h-9 w-full rounded-md border border-input bg-background px-2 text-sm";

function ImagePick({ label, value, onChange, w, h, type, hint }: { label: string; value?: string; onChange: (v: string) => void; w: number; h: number; type: "image/png" | "image/jpeg"; hint?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Field label={label} hint={hint ?? `Beskärs automatiskt till ${w} × ${h} px.`}>
      <div className="flex items-center gap-3">
        <div className="grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-muted">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <span className="text-xs text-muted-foreground">Ingen bild</span>}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
          <Upload className="size-4" /> Välj bild
        </Button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) onChange(await fitImage(f, w, h, type));
            e.target.value = "";
          }}
        />
      </div>
    </Field>
  );
}

function ChipEditor({ items, onChange, max, noun }: { items: Chip[]; onChange: (v: Chip[]) => void; max: number; noun: string }) {
  return (
    <div className="space-y-2">
      {items.map((c, i) => (
        <div key={i} className="grid grid-cols-[1fr_120px_1fr_auto] gap-2">
          <Input value={c.label} placeholder="Etikett" onChange={(e) => onChange(items.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)))} />
          <select className={selectCls} value={c.action || "reply"} onChange={(e) => onChange(items.map((x, k) => (k === i ? { ...x, action: e.target.value as Chip["action"] } : x)))}>
            <option value="reply">Svar</option>
            <option value="url">Öppna länk</option>
            <option value="dial">Ring</option>
          </select>
          <Input
            value={c.target || ""}
            disabled={(c.action || "reply") === "reply"}
            placeholder={(c.action || "reply") === "url" ? "https://…" : (c.action || "reply") === "dial" ? "+46…" : "Skickar etiketten"}
            onChange={(e) => onChange(items.map((x, k) => (k === i ? { ...x, target: e.target.value } : x)))}
          />
          <Button type="button" variant="ghost" size="icon" aria-label="Ta bort" onClick={() => onChange(items.filter((_, k) => k !== i))}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      {items.length < max ? (
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, { label: "", action: "reply" }])}>
          <Plus className="size-4" /> Lägg till {noun}
        </Button>
      ) : null}
    </div>
  );
}

const STEP_LABEL: Record<string, string> = {
  "agent:card": "Avsändare – kort med bild",
  "agent:text": "Avsändare – textmeddelande",
  "user:tap": "Användaren trycker på en svarsknapp",
  "user:type": "Användaren skriver",
};

// ---------- förhandsvisning ----------
function PreviewPlayer({ flow, valid }: { flow: Flow; valid: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dur, setDur] = useState(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!valid || !host.current) return;
    const id = setTimeout(async () => {
      try {
        const P = buildProject(clone(flow));
        const R = createRenderer(host.current!, P);
        rendererRef.current = R;
        setDur(R.duration);
        await R.ready;
        const tt = Math.min(tRef.current, R.duration);
        R.renderAt(tt);
      } catch (e) {
        console.error(e);
      }
    }, 250);
    return () => clearTimeout(id);
  }, [flow, valid]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const R = rendererRef.current;
      tRef.current = Math.min(tRef.current + (now - last) / 1000, R?.duration ?? 0);
      last = now;
      R?.renderAt(tRef.current);
      setT(tRef.current);
      if (R && tRef.current >= R.duration) setPlaying(false);
      else raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const seek = (v: number) => {
    tRef.current = v;
    setT(v);
    rendererRef.current?.renderAt(v);
  };

  return (
    <div>
      <div className="mx-auto overflow-hidden rounded-[28px] border border-border shadow-sm" style={{ width: 360 * SCALE, height: 640 * SCALE }}>
        <div ref={host} style={{ width: 360, height: 640, transform: `scale(${SCALE})`, transformOrigin: "0 0" }} />
      </div>
      {!valid ? <p className="mt-3 text-center text-sm text-muted-foreground">Fyll i de obligatoriska fälten för att se förhandsvisningen.</p> : null}
      <div className="mx-auto mt-4 flex items-center gap-3" style={{ width: 360 * SCALE }}>
        <Button type="button" size="icon" variant="outline" disabled={!valid} onClick={() => { if (tRef.current >= dur) seek(0); setPlaying((p) => !p); }} aria-label={playing ? "Pausa" : "Spela"}>
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
        <input type="range" min={0} max={dur || 1} step={1 / 30} value={t} disabled={!valid} onChange={(e) => { setPlaying(false); seek(parseFloat(e.target.value)); }} className="w-full accent-foreground" />
        <span className="w-24 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{t.toFixed(1)} / {dur.toFixed(1)} s</span>
      </div>
    </div>
  );
}

// ---------- huvudkomponent ----------
export function RcsVideoGenerator() {
  const [flow, setFlow] = useState<Flow>(() => clone(exampleFlow));
  const [profiles, setProfiles] = useState<Record<string, Flow>>({});
  const [current, setCurrent] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [consent, setConsent] = useState(false);
  const [canExport, setCanExport] = useState(true);
  const [exporting, setExporting] = useState<null | { done: number; total: number }>(null);
  const [result, setResult] = useState<null | { url: string; name: string; seconds: number; frames: number; size: number }>(null);
  const abortRef = useRef<AbortController | null>(null);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProfiles(loadProfiles());
    setCanExport(canExportMp4());
    loadInterFontCss().catch(() => {});
  }, []);

  const errors = useMemo(() => validateFlow(flow), [flow]);
  const valid = errors.length === 0;
  const upd = useCallback((fn: (f: Flow) => void) => setFlow((prev) => { const n = clone(prev); fn(n); return n; }), []);
  const setStep = (i: number, s: Step) => upd((f) => { f.steps[i] = s; });

  // profiler
  const saveProfile = () => {
    const name = (flow.name || flow.brand.displayName || "Profil").trim();
    const next = { ...profiles, [name]: clone({ ...flow, name }) };
    try {
      saveProfiles(next);
      setProfiles(next);
      setCurrent(name);
      setMsg(`Profilen ”${name}” är sparad i den här webbläsaren.`);
    } catch {
      setMsg("Kunde inte spara: webbläsarens lagring är full. Exportera profilen som fil i stället.");
    }
  };
  const openProfile = (name: string) => {
    setCurrent(name);
    if (!name) return;
    if (name === "__example") { setFlow(clone(exampleFlow)); return; }
    if (name === "__new") { setFlow(emptyFlow()); setCurrent(""); return; }
    if (profiles[name]) setFlow(clone(profiles[name]));
  };
  const deleteProfile = () => {
    if (!current || !profiles[current]) return;
    const next = { ...profiles };
    delete next[current];
    saveProfiles(next);
    setProfiles(next);
    setCurrent("");
    setMsg("Profilen är borttagen.");
  };

  // export
  const runExport = async () => {
    if (!valid) return;
    setResult(null);
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const fontCss = await loadInterFontCss().catch(() => "");
      const P = buildProject(clone(flow));
      setExporting({ done: 0, total: P.video.frames });
      const blob = await exportMp4(P, { Muxer, ArrayBufferTarget, fontCss, signal: ac.signal, bitrate: 6_000_000, onProgress: (done: number, total: number) => setExporting({ done, total }) });
      const name = `${slug(flow.brand.displayName)}-rcs-demo.mp4`;
      setResult({ url: URL.createObjectURL(blob), name, seconds: P.video.frames / 30, frames: P.video.frames, size: blob.size });
    } catch (e: any) {
      if (e?.name !== "AbortError") setMsg(e?.message || "Exporten misslyckades.");
    } finally {
      setExporting(null);
      abortRef.current = null;
    }
  };

  // ---------- render ----------
  let lastAgent: any = null;
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
      <div className="space-y-12">
        <Section title="Profil" hint="Varje varumärke sparas som en profil i den här webbläsaren. Exportera som fil för att dela eller säkerhetskopiera.">
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-56 flex-1">
              <Field label="Öppna">
                <select className={selectCls} value={current} onChange={(e) => openProfile(e.target.value)}>
                  <option value="">Välj profil…</option>
                  <option value="__new">+ Ny tom profil</option>
                  <option value="__example">Exempel (Nordsyn Optik)</option>
                  {Object.keys(profiles).sort().map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="min-w-56 flex-1">
              <Field label="Profilnamn">
                <Input value={flow.name} onChange={(e) => upd((f) => { f.name = e.target.value; })} />
              </Field>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={saveProfile}><Save className="size-4" /> Spara profil</Button>
            <Button type="button" size="sm" variant="outline" disabled={!current || !profiles[current]} onClick={deleteProfile}><Trash2 className="size-4" /> Ta bort</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => downloadBlob(new Blob([JSON.stringify(flow, null, 2)], { type: "application/json" }), `${slug(flow.name)}.rcs-profil.json`)}><FileJson className="size-4" /> Exportera fil</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => importRef.current?.click()}><Upload className="size-4" /> Importera fil</Button>
            <input ref={importRef} type="file" accept="application/json,.json" className="hidden" onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              try { const j = JSON.parse(await f.text()); setFlow({ ...emptyFlow(), ...j }); setCurrent(""); setMsg(`Importerade ”${j.name || f.name}”.`); }
              catch { setMsg("Filen kunde inte läsas som en profil."); }
            }} />
          </div>
          {msg ? <p className="text-sm text-muted-foreground">{msg}</p> : null}
        </Section>

        <Section title="Avsändare" hint="Använd exakt de uppgifter som är registrerade hos er RCS-leverantör.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Visningsnamn"><Input value={flow.brand.displayName} onChange={(e) => upd((f) => { f.brand.displayName = e.target.value; })} /></Field>
            <Field label="Varumärkesfärg" hint="Används för ikonerna i profilen.">
              <div className="flex gap-2">
                <input type="color" value={flow.brand.color} onChange={(e) => upd((f) => { f.brand.color = e.target.value; })} className="h-9 w-12 rounded-md border border-input bg-background" />
                <Input value={flow.brand.color} onChange={(e) => upd((f) => { f.brand.color = e.target.value; })} />
              </div>
            </Field>
          </div>
          <Field label="Beskrivning"><Textarea rows={2} value={flow.brand.description} onChange={(e) => upd((f) => { f.brand.description = e.target.value; })} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImagePick label="Logotyp" value={flow.brand.logo} w={224} h={224} type="image/png" onChange={(v) => upd((f) => { f.brand.logo = v; })} />
            <ImagePick label="Banner" value={flow.brand.banner} w={1440} h={448} type="image/jpeg" onChange={(v) => upd((f) => { f.brand.banner = v; })} />
          </div>
          <Field label="Kontaktuppgifter i profilen" hint="Visas i registrerad ordning. Etiketten är den text som står under värdet.">
            <div className="space-y-2">
              {flow.brand.contacts.map((c, i) => (
                <div key={i} className="grid grid-cols-[110px_1fr_1fr_auto] gap-2">
                  <select className={selectCls} value={c.type} onChange={(e) => upd((f) => { f.brand.contacts[i].type = e.target.value as any; })}>
                    <option value="phone">Telefon</option>
                    <option value="web">Webbplats</option>
                    <option value="email">E-post</option>
                  </select>
                  <Input value={c.value} placeholder="Värde" onChange={(e) => upd((f) => { f.brand.contacts[i].value = e.target.value; })} />
                  <Input value={c.label} placeholder="Etikett" onChange={(e) => upd((f) => { f.brand.contacts[i].label = e.target.value; })} />
                  <div className="flex">
                    <Button type="button" variant="ghost" size="icon" aria-label="Flytta upp" disabled={i === 0} onClick={() => upd((f) => { const a = f.brand.contacts; [a[i - 1], a[i]] = [a[i], a[i - 1]]; })}><ArrowUp className="size-4" /></Button>
                    <Button type="button" variant="ghost" size="icon" aria-label="Ta bort" onClick={() => upd((f) => { f.brand.contacts.splice(i, 1); })}><Trash2 className="size-4" /></Button>
                  </div>
                </div>
              ))}
              {flow.brand.contacts.length < 3 ? (
                <Button type="button" variant="outline" size="sm" onClick={() => upd((f) => { f.brand.contacts.push({ type: "phone", value: "", label: "" }); })}><Plus className="size-4" /> Lägg till kontaktväg</Button>
              ) : null}
            </div>
          </Field>
        </Section>

        <Section title="Samtycke" hint="Det första meddelandet i konversationen. Beskriv hur mottagaren faktiskt har gett sitt samtycke.">
          <Textarea rows={3} value={flow.optin} onChange={(e) => upd((f) => { f.optin = e.target.value; })} />
        </Section>

        <Section title="Exempelflöde" hint="Bygg dialogen i ordning. Användaren kan bara trycka på knappar av typen Svar. Länk- och ringknappar visas men används inte i videon.">
          <div className="space-y-4">
            {flow.steps.map((s, i) => {
              const key = `${s.role}:${s.type}`;
              const prevAgent = lastAgent;
              if (s.role === "agent") lastAgent = s;
              else lastAgent = null;
              const opts = replyOptions(prevAgent);
              return (
                <div key={i} className={`rounded-xl border p-4 ${s.role === "user" ? "border-foreground/30 bg-muted/40" : "border-border"}`}>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{i + 1}. {STEP_LABEL[key]}</span>
                    <div className="flex">
                      <Button type="button" variant="ghost" size="icon" aria-label="Flytta upp" disabled={i === 0} onClick={() => upd((f) => { const a = f.steps; [a[i - 1], a[i]] = [a[i], a[i - 1]]; })}><ArrowUp className="size-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" aria-label="Flytta ned" disabled={i === flow.steps.length - 1} onClick={() => upd((f) => { const a = f.steps; [a[i + 1], a[i]] = [a[i], a[i + 1]]; })}><ArrowDown className="size-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" aria-label="Ta bort" onClick={() => upd((f) => { f.steps.splice(i, 1); })}><Trash2 className="size-4" /></Button>
                    </div>
                  </div>
                  {s.role === "agent" && s.type === "card" ? (
                    <div className="space-y-3">
                      <ImagePick label="Kampanjbild" value={s.image} w={786} h={450} type="image/jpeg" hint="Separat från profilbannern. Beskärs till 786 × 450 px." onChange={(v) => setStep(i, { ...s, image: v })} />
                      <Field label="Rubrik"><Input value={s.title || ""} onChange={(e) => setStep(i, { ...s, title: e.target.value })} /></Field>
                      <Field label="Text"><Textarea rows={2} value={s.body || ""} onChange={(e) => setStep(i, { ...s, body: e.target.value })} /></Field>
                      <Field label="Knappar (högst 4)"><ChipEditor items={s.buttons || []} max={4} noun="knapp" onChange={(v) => setStep(i, { ...s, buttons: v })} /></Field>
                    </div>
                  ) : null}
                  {s.role === "agent" && s.type === "text" ? (
                    <div className="space-y-3">
                      <Textarea rows={2} value={s.text} onChange={(e) => setStep(i, { ...s, text: e.target.value })} />
                      <Field label="Förslagsknappar under meddelandet (högst 4)"><ChipEditor items={s.chips || []} max={4} noun="förslag" onChange={(v) => setStep(i, { ...s, chips: v })} /></Field>
                      {i > 0 && flow.steps[i - 1].role === "agent" ? (
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox checked={!!s.newGroup} onCheckedChange={(v) => setStep(i, { ...s, newGroup: !!v })} />
                          Nytt tillfälle (läspaus före, grupperas inte med föregående)
                        </label>
                      ) : null}
                    </div>
                  ) : null}
                  {s.role === "user" && s.type === "tap" ? (
                    <Field label="Knapp" hint={opts.length ? undefined : "Föregående steg måste vara ett avsändarmeddelande med minst en knapp av typen Svar."}>
                      <select className={selectCls} value={s.label} onChange={(e) => setStep(i, { ...s, label: e.target.value })}>
                        <option value="">Välj…</option>
                        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  ) : null}
                  {s.role === "user" && s.type === "type" ? (
                    <Field label="Text som skrivs" hint="Bara bokstäver (inklusive å, ä, ö) och mellanslag. Skrivs tecken för tecken.">
                      <Input value={s.text} onChange={(e) => setStep(i, { ...s, text: e.target.value })} />
                    </Field>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => upd((f) => { f.steps.push({ role: "agent", type: "text", text: "", chips: [] }); })}><Plus className="size-4" /> Avsändartext</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => upd((f) => { f.steps.push({ role: "agent", type: "card", title: "", body: "", buttons: [{ label: "", action: "reply" }] }); })}><Plus className="size-4" /> Kort med bild</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => upd((f) => { const prev = f.steps[f.steps.length - 1]; f.steps.push({ role: "user", type: "tap", label: prev ? replyOptions(prev)[0] || "" : "" }); })}><Plus className="size-4" /> Användaren trycker</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => upd((f) => { f.steps.push({ role: "user", type: "type", text: "" }); })}><Plus className="size-4" /> Användaren skriver</Button>
          </div>
        </Section>

        <Section title="Hjälp och avregistrering" hint="Visas alltid sist: användaren skriver hjälpordet, får svar, skriver opt-out-ordet och får bekräftelsen. Bekräftelsen är videons sista meddelande.">
          <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
            <Field label="Hjälpord"><Input value={flow.help.keyword} onChange={(e) => upd((f) => { f.help.keyword = e.target.value; })} /></Field>
            <Field label="Hjälpsvar"><Textarea rows={2} value={flow.help.reply} onChange={(e) => upd((f) => { f.help.reply = e.target.value; })} /></Field>
            <Field label="Opt-out-ord"><Input value={flow.optout.keyword} onChange={(e) => upd((f) => { f.optout.keyword = e.target.value; })} /></Field>
            <Field label="Opt-out-bekräftelse"><Textarea rows={3} value={flow.optout.reply} onChange={(e) => upd((f) => { f.optout.reply = e.target.value; })} /></Field>
          </div>
        </Section>

        <Section title="Inställningar">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 text-sm"><Switch checked={flow.showProfile} onCheckedChange={(v) => upd((f) => { f.showProfile = v; })} /> Visa avsändarprofilen i början</label>
            <Field label="Profilens visningstid (s)"><Input type="number" min={3} max={12} step={0.5} value={flow.profileSeconds} onChange={(e) => upd((f) => { f.profileSeconds = parseFloat(e.target.value) || 6; })} /></Field>
            <Field label="Starttid på klockan" hint="TT:MM:SS. Klockan går i realtid under videon."><Input value={flow.startClock} onChange={(e) => upd((f) => { f.startClock = e.target.value; })} /></Field>
            <Field label="Stilla slutläge (s)"><Input type="number" min={3} max={10} step={0.5} value={flow.finalHold} onChange={(e) => upd((f) => { f.finalHold = parseFloat(e.target.value) || 5; })} /></Field>
          </div>
        </Section>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <PreviewPlayer flow={flow} valid={valid} />
        <div className="mt-6 space-y-3">
          {errors.length ? (
            <ul className="space-y-1 rounded-lg border border-border p-3 text-sm text-muted-foreground">
              {errors.map((e) => <li key={e}>• {e}</li>)}
            </ul>
          ) : null}
          <label className="flex items-start gap-2 text-sm">
            <Checkbox className="mt-0.5" checked={consent} onCheckedChange={(v) => setConsent(!!v)} />
            <span>Jag har rätt att använda varumärket, bilderna och texterna. Videon är en simulerad demonstration.</span>
          </label>
          {exporting ? (
            <div className="space-y-2">
              <Progress value={(100 * exporting.done) / Math.max(1, exporting.total)} />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Bildruta {exporting.done} av {exporting.total}</span>
                <button type="button" className="underline" onClick={() => abortRef.current?.abort()}>Avbryt</button>
              </div>
            </div>
          ) : (
            <Button type="button" className="w-full" disabled={!valid || !consent || !canExport} onClick={runExport}>
              <Download className="size-4" /> Exportera MP4
            </Button>
          )}
          {!canExport ? <p className="text-xs text-muted-foreground">Exporten kräver Chrome eller Edge på dator.</p> : <p className="text-xs text-muted-foreground">1080 × 1920, 30 fps, H.264, utan ljud. Tar oftast under en minut.</p>}
          {result ? (
            <div className="rounded-lg border border-border p-3 text-sm">
              <p className="font-semibold">Klar: {result.name}</p>
              <p className="text-muted-foreground">{result.seconds.toFixed(3)} s · {result.frames} bildrutor · {(result.size / 1e6).toFixed(1)} MB</p>
              <div className="mt-2 flex gap-2">
                <Button asChild size="sm"><a href={result.url} download={result.name}><Download className="size-4" /> Ladda ned</a></Button>
                <Button type="button" size="sm" variant="outline" onClick={() => setResult(null)}><RotateCcw className="size-4" /> Rensa</Button>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
