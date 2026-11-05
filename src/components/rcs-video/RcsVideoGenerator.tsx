// @ts-nocheck – UI-komponent med lösa typer för profildata
import { ArrowUp, Check, Copy, Download, FileJson, Pause, Play, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrayBufferTarget, Muxer } from "mp4-muxer";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { buildProject, canExportMp4, createRenderer, exportMp4, loadInterFontCss, validateFlow } from "@/lib/rcs-video/engine";
import { exampleBanner, exampleLogo } from "@/lib/rcs-video/defaults";

const STORE_KEY = "rcsv-brand-profiles-v1";
const SCALE = 0.86;

type Contact = { type: "phone" | "web" | "email"; value: string; label: string };
type Profile = {
  name: string;
  brand: string;
  displayName: string;
  description: string;
  color: string;
  logo: string;
  banner: string;
  campaignImage: string;
  contacts: Contact[];
  privacyUrl: string;
  termsUrl: string;
  consent: string;
  optinKeywords: string;
  contactPerson: string;
  contactRole: string;
  contactEmail: string;
  texts: Partial<Record<TextKey, string>>;
};
type TextKey = "optin" | "cardTitle" | "cardBody" | "confirm" | "help" | "optout";

// ---------- gemensamt flöde (samma för alla avsändare) ----------
const contactOf = (p: Profile, type: Contact["type"]) => p.contacts.find((c) => c.type === type && c.value.trim())?.value.trim() || "";

function defaultTexts(p: Profile): Record<TextKey, string> {
  const n = p.displayName.trim() || "oss";
  const phone = contactOf(p, "phone");
  const email = contactOf(p, "email");
  const reach = phone && email ? `på ${phone} eller ${email}` : phone ? `på ${phone}` : email ? `på ${email}` : "via vår webbplats";
  return {
    optin: `Du får detta meddelande eftersom du har valt att ta emot information och erbjudanden från ${n}. Du kan när som helst avregistrera dig genom att svara STOP eller STOPP.`,
    cardTitle: `Nyheter från ${n}`,
    cardBody: "Vill du veta mer eller bli kontaktad av oss? Välj ett alternativ nedan.",
    confirm: `Tack! Vi har tagit emot din förfrågan. ${n} återkommer till dig under eftermiddagen.`,
    help: `Behöver du hjälp? Kontakta ${n} ${reach}.`,
    optout: `Du är nu avregistrerad från RCS-meddelanden från ${n}. Du kommer inte att få fler RCS-meddelanden från denna avsändare om du inte väljer att registrera dig igen.`,
  };
}

function profileToFlow(p: Profile) {
  const T = { ...defaultTexts(p), ...Object.fromEntries(Object.entries(p.texts || {}).filter(([, v]) => v && v.trim())) };
  const web = contactOf(p, "web");
  const phone = contactOf(p, "phone");
  const buttons = [{ label: "Kontakta mig", action: "reply" }];
  if (web) buttons.push({ label: "Läs mer", action: "url", target: web });
  if (phone) buttons.push({ label: "Ring oss", action: "dial", target: phone });
  return {
    name: p.name,
    brand: { displayName: p.displayName.trim(), description: p.description, color: p.color, logo: p.logo, banner: p.banner, contacts: p.contacts },
    startClock: "13:16:42",
    showProfile: true,
    profileSeconds: 6,
    finalHold: 5,
    optin: T.optin,
    steps: [
      { role: "agent", type: "card", image: p.campaignImage || p.banner, title: T.cardTitle, body: T.cardBody, buttons },
      { role: "user", type: "tap", label: "Kontakta mig" },
      { role: "agent", type: "text", text: "Vilken tid på dagen passar dig bäst?", chips: [{ label: "Förmiddag" }, { label: "Eftermiddag" }, { label: "Kväll" }] },
      { role: "user", type: "tap", label: "Eftermiddag" },
      { role: "agent", type: "text", text: T.confirm },
    ],
    help: { keyword: "HJÄLP", reply: T.help },
    optout: { keyword: "STOPP", reply: T.optout },
  };
}

const exampleProfile = (): Profile => ({
  name: "Exempel – Nordsyn Optik",
  displayName: "Nordsyn Optik",
  description: "Synundersökning, glasögon och linser i centrala Örebro.",
  color: "#1f3a5f",
  logo: exampleLogo,
  banner: exampleBanner,
  campaignImage: "",
  contacts: [
    { type: "phone", value: "+46191234567", label: "Nordsyn Optik" },
    { type: "web", value: "https://www.example.com/", label: "Nordsyn Optik" },
    { type: "email", value: "kundservice@example.com", label: "Kundservice" },
  ],
  brand: "Nordsyn Optik AB",
  privacyUrl: "https://www.example.com/integritetspolicy/",
  termsUrl: "https://www.example.com/villkor/",
  consent: "by ticking an unchecked consent box for SMS/RCS messages when they create a customer account or book an appointment on https://www.example.com/",
  optinKeywords: "",
  contactPerson: "",
  contactRole: "",
  contactEmail: "",
  texts: {},
});
const emptyProfile = (): Profile => ({ name: "Ny profil", brand: "", privacyUrl: "", termsUrl: "", consent: "", optinKeywords: "", contactPerson: "", contactRole: "", contactEmail: "", displayName: "", description: "", color: "#1f1f1f", logo: "", banner: "", campaignImage: "", contacts: [{ type: "phone", value: "", label: "" }, { type: "web", value: "", label: "" }, { type: "email", value: "", label: "" }], texts: {} });

// ---------- texter till Infobips "Request sender launch" ----------
function launchTexts(p: Profile, flow: any) {
  const n = p.displayName.trim();
  const brand = p.brand.trim() || n;
  const web = contactOf(p, "web");
  const card = flow.steps[0];
  const q = flow.steps[2];
  const conf = flow.steps[4];
  const kw = p.optinKeywords.trim();
  const btn = (b: any) => (b.action === "url" ? `[${b.label}] – opens ${b.target}` : b.action === "dial" ? `[${b.label}] – calls ${b.target}` : `[${b.label}] – suggested reply`);
  return [
    { key: "website", label: "Brand website", text: web },
    { key: "person", label: "Brand's contact person", text: p.contactPerson.trim() },
    { key: "role", label: "Brand's contact person role", text: p.contactRole.trim() },
    { key: "email", label: "Brand's contact email", text: p.contactEmail.trim() },
    {
      key: "optin",
      label: "Opt-in details",
      text:
        `Recipients opt in ${p.consent.trim() || "[BESKRIV HUR MOTTAGAREN GER SAMTYCKE]"}. ${brand} only sends RCS messages to recipients who have given this consent. ` +
        `The first message identifies the sender and explains how to opt out: "${flow.optin}" ` +
        (kw ? `Supported opt-in keywords: ${kw}.` : "There are no opt-in keywords; consent is only collected as described above.") +
        (p.privacyUrl.trim() ? ` Privacy policy: ${p.privacyUrl.trim()}` : ""),
    },
    {
      key: "optout",
      label: "Opt-out details",
      text:
        `Recipients can opt out at any time by replying ${flow.optout.keyword} or STOP. The opt-out instruction is included in the first message. ` +
        `After an opt-out keyword the recipient immediately receives a confirmation and no further messages are sent from this sender. ` +
        `Recipients can reply ${flow.help.keyword} to get ${n}'s contact details.`,
    },
    { key: "optoutmsg", label: "Opt-out response message", text: flow.optout.reply },
    {
      key: "campaign",
      label: "Campaign description",
      text:
        `${brand} uses the RCS sender "${n}" to send information and offers in Swedish to recipients in Sweden who have opted in, and to let recipients ask to be contacted. ` +
        `The message is a rich card with an image, a title, a short text and buttons: ${card.buttons.map((b: any) => b.label).join(", ")}. ` +
        `When the recipient taps "${card.buttons[0].label}", they choose a preferred time of day and receive a confirmation that the request has been received; ${n} then follows up. ` +
        `This is a contact request, not a confirmed booking. Recipients can reply ${flow.help.keyword} for help and ${flow.optout.keyword} or STOP to opt out.`,
    },
    {
      key: "example",
      label: "Campaign message example",
      text: [
        `1. First message: "${flow.optin}"`,
        `2. Rich card – title: "${card.title}" – text: "${card.body}" – buttons: ${card.buttons.map(btn).join("; ")}`,
        `3. After "${card.buttons[0].label}": "${q.text}" – suggested replies: ${q.chips.map((c: any) => `[${c.label}]`).join(" ")}`,
        `4. After the choice: "${conf.text}"`,
        `5. Reply to ${flow.help.keyword}: "${flow.help.reply}"`,
        `6. Reply to ${flow.optout.keyword}/STOP: "${flow.optout.reply}"`,
      ].join("\n"),
    },
    { key: "video", label: "Sender launch video URL", text: "" },
  ];
}

function CopyField({ label, text, hint }: { label: string; text: string; hint?: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{label}</span>
        <Button type="button" size="sm" variant="outline" disabled={!text} onClick={async () => { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); }}>
          {done ? <Check className="size-4" /> : <Copy className="size-4" />} {done ? "Kopierad" : "Kopiera"}
        </Button>
      </div>
      {text ? <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{text}</p> : <p className="mt-2 text-sm text-muted-foreground">{hint || "Fyll i fältet ovan."}</p>}
    </div>
  );
}

// ---------- hjälpfunktioner ----------
const clone = <T,>(x: T): T => structuredClone(x);
const slug = (s: string) =>
  (s || "rcs-demo").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "rcs-demo";

function loadProfiles(): Record<string, Profile> {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

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
const selectCls = "h-9 w-full rounded-md border border-input bg-background px-2 text-sm";

function ImagePick({ label, value, onChange, w, h, type, hint, onClear }: { label: string; value?: string; onChange: (v: string) => void; w: number; h: number; type: "image/png" | "image/jpeg"; hint?: string; onClear?: () => void }) {
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
        {value && onClear ? (
          <Button type="button" variant="ghost" size="icon" aria-label="Ta bort bild" onClick={onClear}><Trash2 className="size-4" /></Button>
        ) : null}
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

// ---------- förhandsvisning ----------
function PreviewPlayer({ flow, valid }: { flow: any; valid: boolean }) {
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
        R.renderAt(Math.min(tRef.current, R.duration));
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
      {!valid ? <p className="mt-3 text-center text-sm text-muted-foreground">Fyll i namn, logotyp och banner för att se förhandsvisningen.</p> : null}
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

const TEXT_FIELDS: { key: TextKey; label: string; rows: number }[] = [
  { key: "optin", label: "Opt-in (första meddelandet)", rows: 3 },
  { key: "cardTitle", label: "Kampanjkortets rubrik", rows: 1 },
  { key: "cardBody", label: "Kampanjkortets text", rows: 2 },
  { key: "confirm", label: "Bekräftelse efter vald tid", rows: 2 },
  { key: "help", label: "Svar på HJÄLP", rows: 2 },
  { key: "optout", label: "Svar på STOPP", rows: 3 },
];

// ---------- huvudkomponent ----------
export function RcsVideoGenerator() {
  const [profile, setProfile] = useState<Profile>(() => exampleProfile());
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [current, setCurrent] = useState("");
  const [msg, setMsg] = useState("");
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

  const flow = useMemo(() => profileToFlow(profile), [profile]);
  const defaults = useMemo(() => defaultTexts(profile), [profile.displayName, profile.contacts]);
  const errors = useMemo(() => validateFlow(flow), [flow]);
  const launch = useMemo(() => launchTexts(profile, flow), [profile, flow]);
  const valid = errors.length === 0;
  const upd = (fn: (p: Profile) => void) => setProfile((prev) => { const n = clone(prev); fn(n); return n; });

  const saveProfile = () => {
    const name = (profile.name || profile.displayName || "Profil").trim();
    const next = { ...profiles, [name]: clone({ ...profile, name }) };
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
      setProfiles(next);
      setCurrent(name);
      setMsg(`Profilen ”${name}” är sparad i den här webbläsaren.`);
    } catch {
      setMsg("Kunde inte spara: webbläsarens lagring är full. Exportera profilen som fil i stället.");
    }
  };
  const openProfile = (name: string) => {
    setCurrent(name);
    setResult(null);
    if (name === "__example") { setProfile(exampleProfile()); setCurrent(""); return; }
    if (name === "__new") { setProfile(emptyProfile()); setCurrent(""); return; }
    if (profiles[name]) setProfile({ ...emptyProfile(), ...clone(profiles[name]) });
  };
  const deleteProfile = () => {
    if (!current || !profiles[current]) return;
    const next = { ...profiles };
    delete next[current];
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
    setProfiles(next);
    setCurrent("");
    setMsg("Profilen är borttagen.");
  };

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
      const name = `${slug(profile.displayName)}-rcs-demo.mp4`;
      setResult({ url: URL.createObjectURL(blob), name, seconds: P.video.frames / 30, frames: P.video.frames, size: blob.size });
    } catch (e: any) {
      if (e?.name !== "AbortError") setMsg(e?.message || "Exporten misslyckades.");
    } finally {
      setExporting(null);
      abortRef.current = null;
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
      <div className="space-y-12">
        <Section title="Profil" hint="Spara en profil per avsändare i den här webbläsaren, eller exportera den som fil.">
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
                <Input value={profile.name} onChange={(e) => upd((p) => { p.name = e.target.value; })} />
              </Field>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={saveProfile}><Save className="size-4" /> Spara profil</Button>
            <Button type="button" size="sm" variant="outline" disabled={!current || !profiles[current]} onClick={deleteProfile}><Trash2 className="size-4" /> Ta bort</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => downloadBlob(new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" }), `${slug(profile.name)}.rcs-profil.json`)}><FileJson className="size-4" /> Exportera fil</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => importRef.current?.click()}><Upload className="size-4" /> Importera fil</Button>
            <input ref={importRef} type="file" accept="application/json,.json" className="hidden" onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              try { const j = JSON.parse(await f.text()); setProfile({ ...emptyProfile(), ...j, texts: j.texts || {} }); setCurrent(""); setMsg(`Importerade ”${j.name || f.name}”.`); }
              catch { setMsg("Filen kunde inte läsas som en profil."); }
            }} />
          </div>
          {msg ? <p className="text-sm text-muted-foreground">{msg}</p> : null}
        </Section>

        <Section title="Avsändare" hint="Fyll i exakt det som är registrerat hos er RCS-leverantör. Resten av videon byggs automatiskt.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name"><Input value={profile.displayName} onChange={(e) => upd((p) => { p.displayName = e.target.value; })} /></Field>
            <Field label="Brand (juridiskt namn)"><Input value={profile.brand} placeholder="t.ex. Nercia Utbildning AB" onChange={(e) => upd((p) => { p.brand = e.target.value; })} /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Color" hint="Används för ikonerna i profilen.">
              <div className="flex gap-2">
                <input type="color" value={profile.color} onChange={(e) => upd((p) => { p.color = e.target.value; })} className="h-9 w-12 rounded-md border border-input bg-background" />
                <Input value={profile.color} onChange={(e) => upd((p) => { p.color = e.target.value; })} />
              </div>
            </Field>
          </div>
          <Field label="Description"><Textarea rows={2} value={profile.description} onChange={(e) => upd((p) => { p.description = e.target.value; })} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImagePick label="Logo image" value={profile.logo} w={224} h={224} type="image/png" onChange={(v) => upd((p) => { p.logo = v; })} />
            <ImagePick label="Banner image" value={profile.banner} w={1440} h={448} type="image/jpeg" onChange={(v) => upd((p) => { p.banner = v; })} />
          </div>
          <ImagePick label="Kampanjbild (valfri)" value={profile.campaignImage} w={786} h={450} type="image/jpeg" hint="Bilden i meddelandekortet. Lämnas den tom används bannern." onChange={(v) => upd((p) => { p.campaignImage = v; })} onClear={() => upd((p) => { p.campaignImage = ""; })} />
          <Field label="Kontaktuppgifter" hint="Visas i profilen i denna ordning. Etiketten står under värdet. Telefon och webb används också för knapparna i kortet och i hjälpsvaret.">
            <div className="space-y-2">
              {profile.contacts.map((c, i) => (
                <div key={i} className="grid grid-cols-[110px_1fr_1fr_auto] gap-2">
                  <select className={selectCls} value={c.type} onChange={(e) => upd((p) => { p.contacts[i].type = e.target.value as any; })}>
                    <option value="phone">Telefon</option>
                    <option value="web">Webbplats</option>
                    <option value="email">E-post</option>
                  </select>
                  <Input value={c.value} placeholder="Värde" onChange={(e) => upd((p) => { p.contacts[i].value = e.target.value; })} />
                  <Input value={c.label} placeholder="Etikett" onChange={(e) => upd((p) => { p.contacts[i].label = e.target.value; })} />
                  <div className="flex">
                    <Button type="button" variant="ghost" size="icon" aria-label="Flytta upp" disabled={i === 0} onClick={() => upd((p) => { const a = p.contacts; [a[i - 1], a[i]] = [a[i], a[i - 1]]; })}><ArrowUp className="size-4" /></Button>
                    <Button type="button" variant="ghost" size="icon" aria-label="Ta bort" onClick={() => upd((p) => { p.contacts.splice(i, 1); })}><Trash2 className="size-4" /></Button>
                  </div>
                </div>
              ))}
              {profile.contacts.length < 3 ? (
                <Button type="button" variant="outline" size="sm" onClick={() => upd((p) => { p.contacts.push({ type: "phone", value: "", label: "" }); })}><Plus className="size-4" /> Lägg till kontaktväg</Button>
              ) : null}
            </div>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Privacy policy URL"><Input value={profile.privacyUrl} onChange={(e) => upd((p) => { p.privacyUrl = e.target.value; })} /></Field>
            <Field label="Terms of service"><Input value={profile.termsUrl} onChange={(e) => upd((p) => { p.termsUrl = e.target.value; })} /></Field>
          </div>
        </Section>

        <Section title="Uppgifter till ansökan" hint="Det här går inte att hämta ur profilen. Beskriv samtycket som det faktiskt går till – Infobip och operatörerna granskar det.">
          <Field label="Hur och var ger mottagaren sitt samtycke? (engelska)" hint='Fortsätter meningen "Recipients opt in …". Exempel: "by ticking an unchecked consent box for SMS/RCS when they submit an application on https://nercia.se/".'>
            <Textarea rows={2} value={profile.consent} onChange={(e) => upd((p) => { p.consent = e.target.value; })} />
          </Field>
          <Field label="Opt-in-nyckelord (valfritt)" hint="Bara om mottagare faktiskt kan anmäla sig genom att skicka ett ord, t.ex. START.">
            <Input value={profile.optinKeywords} onChange={(e) => upd((p) => { p.optinKeywords = e.target.value; })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Kontaktperson"><Input value={profile.contactPerson} onChange={(e) => upd((p) => { p.contactPerson = e.target.value; })} /></Field>
            <Field label="Roll"><Input value={profile.contactRole} onChange={(e) => upd((p) => { p.contactRole = e.target.value; })} /></Field>
            <Field label="E-post (direkt, ej kundtjänst)"><Input value={profile.contactEmail} onChange={(e) => upd((p) => { p.contactEmail = e.target.value; })} /></Field>
          </div>
        </Section>

        <details className="group rounded-xl border border-border p-5">
          <summary className="cursor-pointer select-none text-base font-semibold">Justera texter (valfritt)</summary>
          <p className="mt-2 text-sm text-muted-foreground">
            Flödet är samma för alla: profilvisning, kampanjkort, ”Kontakta mig”, val av tid, bekräftelse, HJÄLP och STOPP. Tomma fält använder standardtexten,
            som fylls i med avsändarens namn och kontaktuppgifter. Se till att opt-in-texten stämmer med hur mottagarna faktiskt har gett sitt samtycke.
          </p>
          <div className="mt-5 space-y-4">
            {TEXT_FIELDS.map((f) => (
              <Field key={f.key} label={f.label}>
                <Textarea rows={f.rows} value={profile.texts?.[f.key] || ""} placeholder={defaults[f.key]} onChange={(e) => upd((p) => { p.texts = { ...(p.texts || {}), [f.key]: e.target.value }; })} />
              </Field>
            ))}
          </div>
        </details>

        <Section title="Texter till Request sender launch" hint="Kopiera fält för fält till Infobip. Meddelandeexemplen är exakt de texter som visas i videon.">
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline" onClick={() => downloadBlob(new Blob([launch.map((f) => `${f.label}\n${f.text || "-"}\n`).join("\n")], { type: "text/plain;charset=utf-8" }), `${slug(profile.displayName)}-infobip-ansokan.txt`)}>
              <FileJson className="size-4" /> Ladda ned alla som textfil
            </Button>
          </div>
          <div className="space-y-3">
            {launch.map((f) => (
              <CopyField key={f.key} label={f.label} text={f.text} hint={f.key === "video" ? "Exportera MP4, ladda upp till Google Drive (Alla med länken – Läsbehörig), testa utloggad och klistra in länken i Infobip." : undefined} />
            ))}
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
