// @ts-nocheck – UI-komponent med lösa typer
import { Check, Copy, Download, Pause, Play, RotateCcw, Upload } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrayBufferTarget, Muxer } from "mp4-muxer";

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

// ---------- texter till Infobips "Request sender launch" ----------
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
const slug = (s: string) =>
  (s || "rcs-demo").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "rcs-demo";

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
function ImagePick({ label, value, onChange, w, h, type }: { label: string; value: string; onChange: (v: string) => void; w: number; h: number; type: "image/png" | "image/jpeg" }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Field label={label} hint={`Samma fil som i Infobip (${w} × ${h} px).`}>
      <div className="flex items-center gap-3">
        <div className="grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-muted">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <span className="text-xs text-muted-foreground">Ingen bild</span>}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}><Upload className="size-4" /> Välj bild</Button>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) onChange(await fitImage(f, w, h, type)); e.target.value = ""; }} />
      </div>
    </Field>
  );
}
function CopyField({ label, text }: { label: string; text: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{label}</span>
        <Button type="button" size="sm" variant="outline" disabled={!text} onClick={async () => { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); }}>
          {done ? <Check className="size-4" /> : <Copy className="size-4" />} {done ? "Kopierad" : "Kopiera"}
        </Button>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{text || "Saknas – fyll i ovan."}</p>
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
      <div className="mx-auto overflow-hidden rounded-[28px] border border-border shadow-sm" style={{ width: 360 * SCALE, height: 640 * SCALE }}>
        <div ref={host} style={{ width: 360, height: 640, transform: `scale(${SCALE})`, transformOrigin: "0 0" }} />
      </div>
      {!ready ? <p className="mt-3 text-center text-sm text-muted-foreground">Fyll i namn, logotyp och banner för att se videon.</p> : null}
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
  const [result, setResult] = useState<null | { url: string; name: string; seconds: number; frames: number; size: number }>(null);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try { const s = localStorage.getItem(STORE_KEY); if (s) setForm({ ...EXAMPLE, ...JSON.parse(s) }); } catch {}
    setCanExport(canExportMp4());
    loadInterFontCss().catch(() => {});
  }, []);
  useEffect(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(form)); } catch {} }, [form]);

  const set = (k: keyof Form) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const flow = useMemo(() => makeFlow(form), [form]);
  const launch = useMemo(() => launchTexts(form, flow), [form, flow]);
  const ready = !!(form.displayName.trim() && form.logo && form.banner);
  const missing = [
    !form.displayName.trim() && "Display name", !form.brand.trim() && "Brand", !form.logo && "Logo", !form.banner && "Banner",
    !form.web.trim() && "Webbplats", !form.contactPerson.trim() && "Kontaktperson", !form.contactRole.trim() && "Roll",
    !form.contactEmail.trim() && "E-post till kontaktperson", !form.consent.trim() && "Samtycke",
  ].filter(Boolean);

  const runExport = async () => {
    setResult(null); setError("");
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const fontCss = await loadInterFontCss().catch(() => "");
      const P = buildProject(clone(flow));
      setExporting({ done: 0, total: P.video.frames });
      const blob = await exportMp4(P, { Muxer, ArrayBufferTarget, fontCss, signal: ac.signal, bitrate: 6_000_000, onProgress: (done: number, total: number) => setExporting({ done, total }) });
      setResult({ url: URL.createObjectURL(blob), name: `${slug(form.displayName)}-rcs-demo.mp4`, seconds: P.video.frames / 30, frames: P.video.frames, size: blob.size });
    } catch (e: any) {
      if (e?.name !== "AbortError") setError(e?.message || "Exporten misslyckades.");
    } finally {
      setExporting(null);
      abortRef.current = null;
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
      <div className="space-y-12">
        <Section title="1. Avsändaren" hint="Skriv av från Infobip → Sender details. Använd samma logo- och bannerfiler.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name"><Input value={form.displayName} onChange={set("displayName")} /></Field>
            <Field label="Brand"><Input value={form.brand} placeholder="t.ex. Nercia Utbildning AB" onChange={set("brand")} /></Field>
          </div>
          <Field label="Description"><Input value={form.description} onChange={set("description")} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImagePick label="Logo image" value={form.logo} w={224} h={224} type="image/png" onChange={(v) => setForm((f) => ({ ...f, logo: v }))} />
            <ImagePick label="Banner image" value={form.banner} w={1440} h={448} type="image/jpeg" onChange={(v) => setForm((f) => ({ ...f, banner: v }))} />
          </div>
          <div className="grid grid-cols-[1fr_120px] gap-3">
            <Field label="Primary phone number"><Input value={form.phone} onChange={set("phone")} /></Field>
            <Field label="Label"><Input value={form.phoneLabel} onChange={set("phoneLabel")} /></Field>
            <Field label="Primary website"><Input value={form.web} onChange={set("web")} /></Field>
            <Field label="Label"><Input value={form.webLabel} onChange={set("webLabel")} /></Field>
            <Field label="Primary email"><Input value={form.email} onChange={set("email")} /></Field>
            <Field label="Label"><Input value={form.emailLabel} onChange={set("emailLabel")} /></Field>
          </div>
          <Field label="Color">
            <div className="flex max-w-56 gap-2">
              <input type="color" value={form.color} onChange={set("color")} className="h-9 w-12 rounded-md border border-input bg-background" />
              <Input value={form.color} onChange={set("color")} />
            </div>
          </Field>
        </Section>

        <Section title="2. Kontaktperson och samtycke" hint="Det enda som inte finns i Infobip-profilen.">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Kontaktperson"><Input value={form.contactPerson} onChange={set("contactPerson")} /></Field>
            <Field label="Roll"><Input value={form.contactRole} placeholder="t.ex. Marknadschef" onChange={set("contactRole")} /></Field>
            <Field label="E-post (direkt, ej kundtjänst)"><Input value={form.contactEmail} onChange={set("contactEmail")} /></Field>
          </div>
          <Field label="Hur ger mottagarna sitt samtycke?" hint="Välj det förslag som stämmer och justera texten om det behövs. Den hamnar i Opt-in details.">
            <div className="flex flex-wrap gap-2">
              {consentSuggestions(form).map((s) => (
                <Button key={s.label} type="button" size="sm" variant={form.consent === s.text ? "default" : "outline"} onClick={() => setForm((f) => ({ ...f, consent: s.text }))}>{s.label}</Button>
              ))}
            </div>
            <Textarea rows={2} value={form.consent} placeholder="Recipients opt in …" onChange={set("consent")} />
          </Field>
        </Section>

        <Section title="3. Kopiera till Request sender launch" hint="Allt nedan är genererat och stämmer ordagrant med videon.">
          {missing.length ? <p className="text-sm text-muted-foreground">Saknas: {missing.join(", ")}.</p> : null}
          <div className="space-y-3">
            {launch.map((x) => <CopyField key={x.label} label={`${x.group} · ${x.label}`} text={x.text} />)}
            <div className="rounded-lg border border-border p-3 text-sm">
              <span className="font-semibold">Use case details · Sender launch video URL</span>
              <p className="mt-2 text-muted-foreground">Exportera videon, ladda upp den till Google Drive, dela med ”Alla med länken – Läsbehörig”, testa länken i ett privat fönster och klistra in den här.</p>
            </div>
          </div>
        </Section>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <PreviewPlayer flow={flow} ready={ready} />
        <div className="mt-6 space-y-3">
          <label className="flex items-start gap-2 text-sm">
            <Checkbox className="mt-0.5" checked={rights} onCheckedChange={(v) => setRights(!!v)} />
            <span>Jag har rätt att använda varumärket och materialet. Videon är en simulerad demonstration.</span>
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
            <Button type="button" className="w-full" disabled={!ready || !rights || !canExport} onClick={runExport}>
              <Download className="size-4" /> Exportera MP4
            </Button>
          )}
          <p className="text-xs text-muted-foreground">{canExport ? "1080 × 1920, 30 fps, H.264, utan ljud. Tar oftast under en minut." : "Exporten kräver Chrome eller Edge på dator."}</p>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
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
