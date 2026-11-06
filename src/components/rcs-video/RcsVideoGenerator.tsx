// @ts-nocheck – UI-komponent med lösa typer
import { Check, Copy, ExternalLink, Link, Pause, Play, RotateCcw, Upload } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrayBufferTarget, Muxer } from "mp4-muxer";
import inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import inter500 from "@fontsource/inter/files/inter-latin-500-normal.woff2?url";
import inter600 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
import interExt400 from "@fontsource/inter/files/inter-latin-ext-400-normal.woff2?url";
import interExt500 from "@fontsource/inter/files/inter-latin-ext-500-normal.woff2?url";
import interExt600 from "@fontsource/inter/files/inter-latin-ext-600-normal.woff2?url";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { buildProject, canExportMp4, createRenderer, exportMp4, loadInterFontCss } from "@/lib/rcs-video/engine";
import { exampleBanner, exampleLogo } from "@/lib/rcs-video/defaults";

const STORE_KEY = "rcsv-form-v2";
const SCALE = 0.86;
const INTER_FILES = [
  { weight: 400, subset: "latin", url: inter400 }, { weight: 500, subset: "latin", url: inter500 }, { weight: 600, subset: "latin", url: inter600 },
  { weight: 400, subset: "latin-ext", url: interExt400 }, { weight: 500, subset: "latin-ext", url: interExt500 }, { weight: 600, subset: "latin-ext", url: interExt600 },
];

type Form = {
  displayName: string; brand: string; description: string; color: string; logo: string; banner: string;
  phone: string; phoneLabel: string; web: string; webLabel: string; email: string; emailLabel: string;
  contactPerson: string; contactRole: string; contactEmail: string; consent: string;
};

const EXAMPLE: Form = {
  displayName: "Nordsyn Optik", brand: "Nordsyn Optik AB", description: "Synundersökning, glasögon och linser i centrala Örebro.", color: "#1f3a5f",
  logo: exampleLogo, banner: exampleBanner,
  phone: "+46191234567", phoneLabel: "Tel", web: "https://www.example.com/", webLabel: "Hemsida", email: "kundservice@example.com", emailLabel: "Mail",
  contactPerson: "", contactRole: "", contactEmail: "", consent: "",
};

// Förslag på samtyckesbeskrivning – användaren väljer det som stämmer och justerar vid behov
const consentSuggestions = (f: Form) => [
  { label: "Formulär på webbplatsen", text: `by ticking an unchecked checkbox for SMS/RCS messages when they fill in a form on ${f.web || "the brand's website"}` },
  { label: "Kundkonto eller köp", text: `by ticking an unchecked checkbox for SMS/RCS messages when they create a customer account or make a purchase on ${f.web || "the brand's website"}` },
  { label: "Avtal eller anmälan på plats", text: `by giving written consent to receive SMS/RCS messages in an agreement or registration form signed with ${f.brand || f.displayName || "the brand"}` },
];

// ---------- gemensamt flöde (samma för alla) ----------
function makeFlow(f: Form) {
  const n = f.displayName.trim();
  const reach = f.phone && f.email ? `på ${f.phone} eller ${f.email}` : f.phone ? `på ${f.phone}` : f.email ? `på ${f.email}` : "via vår webbplats";
  const buttons = [{ label: "Kontakta mig", action: "reply" }];
  if (f.web) buttons.push({ label: "Läs mer", action: "url", target: f.web });
  if (f.phone) buttons.push({ label: "Ring oss", action: "dial", target: f.phone });
  const contacts = [
    f.phone && { type: "phone", value: f.phone.trim(), label: f.phoneLabel.trim() },
    f.web && { type: "web", value: f.web.trim(), label: f.webLabel.trim() },
    f.email && { type: "email", value: f.email.trim(), label: f.emailLabel.trim() },
  ].filter(Boolean);
  return {
    brand: { displayName: n, description: f.description, color: f.color, logo: f.logo, banner: f.banner, contacts },
    startClock: "13:16:42", showProfile: true, profileSeconds: 6, finalHold: 5,
    optin: `Du får detta meddelande eftersom du har valt att ta emot information och erbjudanden från ${n}. Du kan när som helst avregistrera dig genom att svara STOP eller STOPP.`,
    steps: [
      { role: "agent", type: "card", image: f.banner, title: `Nyheter från ${n}`, body: "Vill du veta mer eller bli kontaktad av oss? Välj ett alternativ nedan.", buttons },
      { role: "user", type: "tap", label: "Kontakta mig" },
      { role: "agent", type: "text", text: "Vilken tid på dagen passar dig bäst?", chips: [{ label: "Förmiddag" }, { label: "Eftermiddag" }, { label: "Kväll" }] },
      { role: "user", type: "tap", label: "Eftermiddag" },
      { role: "agent", type: "text", text: `Tack! Vi har tagit emot din förfrågan. ${n} återkommer till dig under eftermiddagen.` },
    ],
    help: { keyword: "HJÄLP", reply: `Behöver du hjälp? Kontakta ${n} ${reach}.` },
    optout: { keyword: "STOPP", reply: `Du är nu avregistrerad från RCS-meddelanden från ${n}. Du kommer inte att få fler RCS-meddelanden från denna avsändare om du inte väljer att registrera dig igen.` },
  };
}

// ---------- texter till ansökan (Request sender launch) ----------
function launchTexts(f: Form, flow: any) {
  const n = f.displayName.trim();
  const brand = f.brand.trim() || n;
  const card = flow.steps[0];
  const btn = (b: any) => (b.action === "url" ? `[${b.label}] – opens ${b.target}` : b.action === "dial" ? `[${b.label}] – calls ${b.target}` : `[${b.label}] – suggested reply`);
  return [
    { group: "Business details", label: "Brand website", text: f.web.trim() },
    { group: "Contact information", label: "Brand's contact person", text: f.contactPerson.trim() },
    { group: "Contact information", label: "Brand's contact person role", text: f.contactRole.trim() },
    { group: "Contact information", label: "Brand's contact email", text: f.contactEmail.trim() },
    {
      group: "Use case details", label: "Opt-in details",
      text: f.consent.trim()
        ? `Recipients opt in ${f.consent.trim()}. ${brand} only sends RCS messages to recipients who have given this consent. The first message identifies the sender and explains how to opt out: "${flow.optin}" There are no opt-in keywords; consent is only collected as described above.`
        : "",
    },
    { group: "Use case details", label: "Opt-out details", text: `Recipients can opt out at any time by replying STOPP or STOP. The opt-out instruction is included in the first message. After an opt-out keyword the recipient immediately receives a confirmation and no further messages are sent from this sender. Recipients can reply HJÄLP to get ${n}'s contact details.` },
    { group: "Use case details", label: "Opt-out response message", text: flow.optout.reply },
    {
      group: "Use case details", label: "Campaign description",
      text: `${brand} uses the RCS sender "${n}" to send information and offers in Swedish to recipients in Sweden who have opted in, and to let recipients ask to be contacted. The message is a rich card with an image, a title, a short text and buttons: ${card.buttons.map((b: any) => b.label).join(", ")}. When the recipient taps "Kontakta mig", they choose a preferred time of day and receive a confirmation that the request has been received; ${n} then follows up. This is a contact request, not a confirmed booking. Recipients can reply HJÄLP for help and STOPP or STOP to opt out.`,
    },
    {
      group: "Use case details", label: "Campaign message example",
      text: [
        `1. First message: "${flow.optin}"`,
        `2. Rich card – title: "${card.title}" – text: "${card.body}" – buttons: ${card.buttons.map(btn).join("; ")}`,
        `3. After "Kontakta mig": "${flow.steps[2].text}" – suggested replies: [Förmiddag] [Eftermiddag] [Kväll]`,
        `4. After the choice: "${flow.steps[4].text}"`,
        `5. Reply to HJÄLP: "${flow.help.reply}"`,
        `6. Reply to STOPP/STOP: "${flow.optout.reply}"`,
      ].join("\n"),
    },
  ];
}

// ---------- hjälpfunktioner ----------
const clone = <T,>(x: T): T => structuredClone(x);
async function fitImage(file: File, w: number, h: number, type: "image/png" | "image/jpeg") {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    if (type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); }
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (w - img.naturalWidth * s) / 2, (h - img.naturalHeight * s) / 2, img.naturalWidth * s, img.naturalHeight * s);
    return c.toDataURL(type, 0.9);
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ---------- UI-byggstenar ----------
function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-background p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground text-sm font-bold text-background">{n}</span>
        <div>
          <h2 className="text-xl font-extrabold leading-7">{title}</h2>
          {hint ? <p className="mt-0.5 text-sm text-muted-foreground">{hint}</p> : null}
        </div>
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
function ImagePick({ label, value, onChange, w, h, type, aspect }: { label: string; value: string; onChange: (v: string) => void; w: number; h: number; type: "image/png" | "image/jpeg"; aspect: string }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Field label={`${label} · ${w}×${h}`}>
      <button type="button" onClick={() => ref.current?.click()} className={`group relative grid w-full place-items-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/40 transition-colors hover:border-foreground/40 ${aspect}`}>
        {value ? <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" /> : null}
        <span className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${value ? "bg-background/90 opacity-0 shadow-sm transition-opacity group-hover:opacity-100" : "text-muted-foreground"}`}>
          <Upload className="size-3.5" /> {value ? "Byt bild" : "Välj bild"}
        </span>
      </button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) onChange(await fitImage(f, w, h, type)); e.target.value = ""; }} />
    </Field>
  );
}
function CopyButton({ text, label = "Kopiera" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button type="button" size="sm" variant="ghost" disabled={!text} className="h-8 shrink-0 px-2.5" onClick={async () => { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); }}>
      {done ? <Check className="size-4" /> : <Copy className="size-4" />} {done ? "Kopierad" : label}
    </Button>
  );
}
function CopyRow({ group, label, text }: { group: string; label: string; text: string }) {
  return (
    <div className="flex gap-3 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group}</p>
        <p className="text-sm font-semibold">{label}</p>
        <p className={`mt-1 whitespace-pre-wrap text-sm leading-relaxed ${text ? "text-foreground/80" : "italic text-muted-foreground"}`}>{text || "Fyll i steg 1–2 först."}</p>
      </div>
      <CopyButton text={text} />
    </div>
  );
}

// ---------- förhandsvisning ----------
function PreviewPlayer({ flow, ready }: { flow: any; ready: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dur, setDur] = useState(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!ready || !host.current) return;
    const id = setTimeout(async () => {
      try {
        const R = createRenderer(host.current!, buildProject(clone(flow)));
        rendererRef.current = R;
        setDur(R.duration);
        await R.ready;
        R.renderAt(Math.min(tRef.current, R.duration));
      } catch (e) {
        console.error(e);
      }
    }, 250);
    return () => clearTimeout(id);
  }, [flow, ready]);

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

  const seek = (v: number) => { tRef.current = v; setT(v); rendererRef.current?.renderAt(v); };

  return (
    <div>
      <div className="mx-auto overflow-hidden rounded-[32px] border-[6px] border-foreground/90 shadow-xl" style={{ width: 360 * SCALE + 12, height: 640 * SCALE + 12 }}>
        <div ref={host} style={{ width: 360, height: 640, transform: `scale(${SCALE})`, transformOrigin: "0 0" }} />
      </div>
      {!ready ? <p className="mt-3 text-center text-sm text-muted-foreground">Lägg till namn, logotyp och banner så visas videon här.</p> : null}
      <div className="mx-auto mt-4 flex items-center gap-3" style={{ width: 360 * SCALE }}>
        <Button type="button" size="icon" variant="outline" disabled={!ready} onClick={() => { if (tRef.current >= dur) seek(0); setPlaying((p) => !p); }} aria-label={playing ? "Pausa" : "Spela"}>
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
        <input type="range" min={0} max={dur || 1} step={1 / 30} value={t} disabled={!ready} onChange={(e) => { setPlaying(false); seek(parseFloat(e.target.value)); }} className="w-full accent-foreground" />
        <span className="w-24 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{t.toFixed(1)} / {dur.toFixed(1)} s</span>
      </div>
    </div>
  );
}

// ---------- huvudkomponent ----------
export function RcsVideoGenerator() {
  const [form, setForm] = useState<Form>(EXAMPLE);
  const [rights, setRights] = useState(false);
  const [canExport, setCanExport] = useState(true);
  const [exporting, setExporting] = useState<null | { done: number; total: number }>(null);
  const [error, setError] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [otherConsent, setOtherConsent] = useState(false);
  const blobRef = useRef<Blob | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try { const s = localStorage.getItem(STORE_KEY); if (s) setForm({ ...EXAMPLE, ...JSON.parse(s) }); } catch {}
    setCanExport(canExportMp4());
    loadInterFontCss(INTER_FILES).catch(() => {});
  }, []);
  useEffect(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(form)); } catch {} }, [form]);

  const set = (k: keyof Form) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const flow = useMemo(() => makeFlow(form), [form]);
  const consent = form.consent.trim() || consentSuggestions(form)[0].text;
  const suggestions = consentSuggestions(form);
  const showOtherConsent = otherConsent || !suggestions.some((x) => x.text === consent);
  const launch = useMemo(() => launchTexts({ ...form, consent }, flow), [form, consent, flow]);
  const ready = !!(form.displayName.trim() && form.logo && form.banner);
  const missing = [
    !form.displayName.trim() && "Display name", !form.brand.trim() && "Brand", !form.logo && "Logo", !form.banner && "Banner",
    !form.web.trim() && "Webbplats", !form.contactPerson.trim() && "Kontaktperson", !form.contactRole.trim() && "Roll",
    !form.contactEmail.trim() && "E-post till kontaktperson",
  ].filter(Boolean);

  const uploadVideo = async (blob: Blob, signal?: AbortSignal) => {
    setError(""); setUploading(true);
    try {
      const response = await fetch("/api/rcs-video", { method: "POST", headers: { "Content-Type": "video/mp4" }, body: blob, signal });
      if (!response.ok) {
        setError(response.status === 429 ? "Gränsen för antal videor är nådd. Försök igen senare." : "Länken kunde inte skapas.");
        return;
      }
      const data = await response.json();
      if (typeof data.url !== "string" || !data.url) throw new Error("Missing URL");
      setLink(data.url);
    } catch (e: any) {
      if (e?.name !== "AbortError") setError("Länken kunde inte skapas.");
    } finally { setUploading(false); }
  };

  const runExport = async () => {
    blobRef.current = null; setError(""); setLink(null); setUploading(false);
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const fontCss = await loadInterFontCss(INTER_FILES).catch(() => "");
      const P = buildProject(clone(flow));
      setExporting({ done: 0, total: P.video.frames });
      const blob = await exportMp4(P, { Muxer, ArrayBufferTarget, fontCss, signal: ac.signal, bitrate: 6_000_000, onProgress: (done: number, total: number) => setExporting({ done, total }) });
      blobRef.current = blob;
      setExporting(null);
      await uploadVideo(blob, ac.signal);
    } catch (e: any) {
      if (e?.name !== "AbortError") setError(e?.message || "Exporten misslyckades.");
    } finally {
      setExporting(null);
      abortRef.current = null;
    }
  };

  const allText = launch.map((x) => `${x.label}\n${x.text || "-"}`).join("\n\n") + (link ? `\n\nSender launch video URL\n${link}` : "");

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-14">
      <div className="min-w-0 space-y-6">
        <Step n={1} title="Avsändaren" hint="Skriv av avsändarens registrerade uppgifter (Sender details).">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name"><Input value={form.displayName} onChange={set("displayName")} /></Field>
            <Field label="Brand"><Input value={form.brand} placeholder="Nercia Utbildning AB" onChange={set("brand")} /></Field>
            <Field label="Description" className="sm:col-span-2"><Input value={form.description} onChange={set("description")} /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
            <ImagePick label="Logo" value={form.logo} w={224} h={224} type="image/png" aspect="aspect-square" onChange={(v) => setForm((f) => ({ ...f, logo: v }))} />
            <ImagePick label="Banner" value={form.banner} w={1440} h={448} type="image/jpeg" aspect="aspect-[1440/448] sm:aspect-auto sm:h-[140px]" onChange={(v) => setForm((f) => ({ ...f, banner: v }))} />
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            {([
              ["Telefon", "phone", "phoneLabel", "+46…"],
              ["Webbplats", "web", "webLabel", "https://…"],
              ["E-post", "email", "emailLabel", "namn@företag.se"],
            ] as const).map(([name, k, kl, ph]) => (
              <div key={k} className="grid grid-cols-[84px_1fr_96px] items-center gap-2 border-b border-border px-3 py-2 last:border-b-0 sm:grid-cols-[100px_1fr_120px]">
                <span className="text-sm font-semibold">{name}</span>
                <Input value={form[k]} placeholder={ph} onChange={set(k)} className="h-9" />
                <Input value={form[kl]} placeholder="Etikett" onChange={set(kl)} className="h-9" />
              </div>
            ))}
          </div>
          <Field label="Color">
            <div className="flex max-w-48 items-center gap-2">
              <input type="color" value={form.color} onChange={set("color")} className="size-9 shrink-0 cursor-pointer rounded-md border border-input bg-background p-0.5" />
              <Input value={form.color} onChange={set("color")} className="h-9" />
            </div>
          </Field>
        </Step>

        <Step n={2} title="Kontaktperson" hint="Det enda som inte står i avsändarprofilen.">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Namn"><Input value={form.contactPerson} onChange={set("contactPerson")} /></Field>
            <Field label="Roll"><Input value={form.contactRole} placeholder="Marknadschef" onChange={set("contactRole")} /></Field>
            <Field label="E-post (direkt)"><Input value={form.contactEmail} onChange={set("contactEmail")} /></Field>
          </div>
          <Field label="Samtycke · förvalt">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((x) => (
                <Button key={x.label} type="button" size="sm" variant={!showOtherConsent && consent === x.text ? "default" : "outline"} aria-pressed={!showOtherConsent && consent === x.text}
                  onClick={() => { setForm((f) => ({ ...f, consent: x.text })); setOtherConsent(false); }} className="h-auto whitespace-normal rounded-full px-3 py-1.5 text-xs">
                  {x.label}
                </Button>
              ))}
              <Button type="button" size="sm" variant={showOtherConsent ? "default" : "outline"} aria-pressed={showOtherConsent} onClick={() => setOtherConsent(true)} className="h-auto rounded-full px-3 py-1.5 text-xs">Annat</Button>
            </div>
            {showOtherConsent ? <Textarea rows={2} value={form.consent} placeholder="Beskriv med egna ord på engelska, t.ex. by ticking …" onChange={set("consent")} className="mt-2" /> : null}
          </Field>
        </Step>

        <Step n={3} title="Kopiera till ansökan" hint="Request sender launch. Texterna är genererade och stämmer ordagrant med videon.">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-3 py-2">
            <p className="text-sm text-muted-foreground">{missing.length ? `Saknas: ${missing.join(", ")}` : "Allt är ifyllt."}</p>
            <CopyButton text={allText} label="Kopiera alla" />
          </div>
          <div className="divide-y divide-border">
            {launch.map((x) => <CopyRow key={x.label} group={x.group} label={x.label} text={x.text} />)}
            <div className="py-4 last:pb-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Use case details</p>
              <p className="text-sm font-semibold">Sender launch video URL</p>
              {link ? <div className="mt-1 flex min-w-0 items-start gap-2"><a href={link} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 break-all text-sm underline">{link}</a><CopyButton text={link} /></div> : <p className="mt-1 text-sm text-muted-foreground">{uploading ? "Laddar upp video …" : "Ingen videolänk ännu."}</p>}
            </div>
          </div>
        </Step>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <PreviewPlayer flow={flow} ready={ready} />
        <div className="mx-auto mt-6 max-w-[310px] space-y-3">
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <Checkbox className="mt-0.5" checked={rights} onCheckedChange={(v) => setRights(!!v)} />
            <span>Jag har rätt att använda varumärket och materialet. Videon är en simulerad demonstration.</span>
          </label>
          {exporting ? (
            <div className="space-y-2">
              <Progress value={(100 * exporting.done) / Math.max(1, exporting.total)} />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Skapar video … {Math.round((100 * exporting.done) / Math.max(1, exporting.total))} %</span>
                <button type="button" className="underline" onClick={() => abortRef.current?.abort()}>Avbryt</button>
              </div>
            </div>
          ) : (
            <Button type="button" size="lg" className="w-full" disabled={!ready || !rights || !canExport || uploading} onClick={runExport}>
              <Link className="size-4" /> {uploading ? "Laddar upp …" : "Skapa videolänk"}
            </Button>
          )}
          <p className="text-center text-xs text-muted-foreground">{canExport ? "1080 × 1920 · 30 fps · H.264 · utan ljud" : "Kräver Chrome eller Edge på dator."}</p>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {error && blobRef.current && !link ? <Button type="button" variant="outline" disabled={uploading || !!exporting} onClick={() => { const blob = blobRef.current; if (blob) void uploadVideo(blob); }}>Försök igen</Button> : null}
          {link ? (
            <div className="rounded-xl border border-border p-3 text-sm">
              <p className="font-semibold">Videolänk klar</p>
              <a href={link} target="_blank" rel="noopener noreferrer" className="mt-3 block break-all underline">{link}</a>
              <div className="mt-3 flex flex-wrap gap-2"><CopyButton text={link} /><Button asChild size="sm" variant="outline"><a href={link} target="_blank" rel="noopener noreferrer"><ExternalLink className="size-4" /> Öppna</a></Button><Button type="button" size="sm" variant="outline" onClick={() => { setLink(null); setError(""); blobRef.current = null; }} aria-label="Rensa"><RotateCcw className="size-4" /></Button></div>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
