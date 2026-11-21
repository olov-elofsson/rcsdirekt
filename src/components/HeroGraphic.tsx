import type { CSSProperties } from "react";

import { icon } from "@/lib/rcs-video/engine";

/**
 * The site's illustration language, built from the logo symbol (brand/SVG/symbol.svg): a round
 * speech drop with one square corner, flat, in the brand kit's navy, blue, lavender or white.
 * Drops come in many sizes, turns and fills, alone or paired like the logo (a large drop with a
 * smaller one tucked behind it, separated by a thin gap), sometimes with typing dots, an arrow, a
 * check or a heart. Never orange, never outlines with shadows. Decorative only; the slow drift
 * (.hero-float in styles.css) stops with reduced motion.
 */
const navy = "#15115f";
const blue = "#2f7bff";
const lavender = "#efeefc";

type Corner = "bl" | "br" | "tl" | "tr";
type Glyph = "dots" | "arrow" | "check" | "heart";

/** The logo's drop in a 100 × 100 box: a circle whose square corner points to `corner`. */
function dropPath(corner: Corner) {
  // Built for the bottom-left corner as in the logo, then turned for the others.
  return { path: "M0 100V50A50 50 0 0 1 50 0A50 50 0 0 1 100 50A50 50 0 0 1 50 100Z", turn: { bl: 0, tl: 90, tr: 180, br: 270 }[corner] };
}

function GlyphMark({ glyph, color }: { glyph: Glyph; color: string }) {
  if (glyph === "dots") return <g fill={color}>{[30, 50, 70].map((cx) => <circle key={cx} cx={cx} cy={50} r={6.5} />)}</g>;
  if (glyph === "arrow") return <path d="M32 50h36M54 36l14 14-14 14" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />;
  if (glyph === "check") return <path d="M32 51l12 12 24-26" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />;
  return <path d="M50 70C36 61 29 54 29 45c0-6 5-11 11-11 4 0 7 2 10 6 3-4 6-6 10-6 6 0 11 5 11 11 0 9-7 16-21 25z" fill={color} />;
}

type ShapeProps = { size: number; className?: string; style?: CSSProperties; float?: number };

function floatStyle(style: CSSProperties | undefined, float: number | undefined): CSSProperties | undefined {
  return float === undefined ? style : { ...style, animationDelay: `${float}s` };
}

/** One drop. `fill` is a colour; `glyph` sits upright inside, in `glyphColor`. */
export function Drop({ size, corner = "bl", fill = navy, glyph, glyphColor = "#fff", text, className, style, float }: ShapeProps & { corner?: Corner; fill?: string; glyph?: Glyph; glyphColor?: string; text?: string }) {
  const { path, turn } = dropPath(corner);
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" width={size} height={size} className={[float !== undefined ? "hero-float" : "", className ?? ""].join(" ").trim() || undefined} style={floatStyle(style, float)}>
      <path d={path} fill={fill} transform={`rotate(${turn} 50 50)`} />
      {glyph ? <GlyphMark glyph={glyph} color={glyphColor} /> : null}
      {text ? <text x="50" y="52" textAnchor="middle" dominantBaseline="middle" fill={glyphColor} fontFamily="Archivo, sans-serif" fontWeight={800} fontSize={38}>{text}</text> : null}
    </svg>
  );
}

/**
 * Two drops as in the logo: a large one and a smaller one behind its top right, with a gap in
 * the colour behind them (`gap`). Colours can be swapped for variety.
 */
export function DropPair({ size, front = navy, back = blue, gap = "#fff", className, style, float }: ShapeProps & { front?: string; back?: string; gap?: string }) {
  // Proportions of brand/SVG/symbol.svg: 86 × 80, large drop r 33, small drop r 22, gap 4.
  return (
    <svg aria-hidden="true" viewBox="0 0 86 80" width={size} height={(size * 80) / 86} className={[float !== undefined ? "hero-float" : "", className ?? ""].join(" ").trim() || undefined} style={floatStyle(style, float)}>
      <path d="M86 44H64A22 22 0 0 1 42 22A22 22 0 0 1 64 0A22 22 0 0 1 86 22Z" fill={back} />
      <path d="M0 80V47A33 33 0 0 1 33 14A33 33 0 0 1 66 47A33 33 0 0 1 33 80Z" fill={front} stroke={gap} strokeWidth={8} paintOrder="stroke" />
    </svg>
  );
}

export const dropColors = { navy, blue, lavender };

/**
 * A flat tile: a circle or a rounded square in a brand colour, with a Material icon from the
 * phone's icon set (engine.ts) in the middle. Used beside the drops for variety.
 */
export function Tile({ size, shape = "circle", fill = blue, glyph, glyphColor = "#fff", turn = 0, className, style, float }: ShapeProps & { shape?: "circle" | "square"; fill?: string; glyph: string; glyphColor?: string; turn?: number }) {
  const inner = icon(glyph, Math.round(size * 0.46), glyphColor);
  return (
    <div
      aria-hidden="true"
      className={[float !== undefined ? "hero-float" : "", className ?? ""].join(" ").trim() || undefined}
      style={{ ...floatStyle(style, float), width: size, height: size }}
    >
      <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", background: fill, borderRadius: shape === "circle" ? "50%" : size * 0.28, transform: turn ? `rotate(${turn}deg)` : undefined }}>
        <span style={{ display: "block", lineHeight: 0, transform: turn ? `rotate(${-turn}deg)` : undefined }} dangerouslySetInnerHTML={{ __html: inner }} />
      </div>
    </div>
  );
}

/** A small message card: an image area, two lines and a button, flat. */
export function MiniCard({ size, className, style, float }: ShapeProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 120" width={size} height={size * 1.2} className={[float !== undefined ? "hero-float" : "", className ?? ""].join(" ").trim() || undefined} style={floatStyle(style, float)}>
      <rect width="100" height="120" rx="18" fill={lavender} />
      <rect x="10" y="10" width="80" height="48" rx="10" fill="#d9d7f7" />
      <path d="M16 52l18-16 13 11 10-7 23 12" fill="none" stroke={blue} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="70" cy="24" r="6" fill="#fff" />
      <rect x="12" y="68" width="56" height="7" rx="3.5" fill={navy} />
      <rect x="12" y="81" width="38" height="7" rx="3.5" fill={navy} opacity=".35" />
      <rect x="10" y="96" width="80" height="14" rx="7" fill="#fff" />
    </svg>
  );
}

/**
 * The hero's frame: four quiet shapes at the outer edges, wide screens only. Most are lavender;
 * only the logo pair carries the brand blue, so the headline stays the loudest thing.
 */
export function HeroGraphic() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 lg:block">
      <DropPair size={96} className="absolute" style={{ left: "4%", top: "16%" }} float={-2} />
      <MiniCard size={84} className="absolute opacity-80" style={{ left: "6%", bottom: "12%" }} float={-1} />
      <Drop size={88} corner="bl" fill={lavender} glyph="dots" glyphColor={blue} className="absolute" style={{ right: "4%", top: "18%" }} float={-5} />
      <Tile size={52} shape="square" turn={8} fill={lavender} glyph="event" glyphColor={navy} className="absolute" style={{ right: "8%", bottom: "16%" }} float={-4} />
    </div>
  );
}
