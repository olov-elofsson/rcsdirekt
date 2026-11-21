import type { CSSProperties } from "react";

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

/** The hero's frame: drops at the page's outer edges, on wide screens only. */
export function HeroGraphic() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 lg:block">
      <DropPair size={128} className="absolute" style={{ left: "3%", top: "12%" }} float={-2} />
      <Drop size={104} corner="bl" fill={blue} glyph="dots" className="absolute" style={{ right: "3%", top: "13%" }} float={-5} />
      <Drop size={52} corner="tr" fill={lavender} glyph="heart" glyphColor={navy} className="absolute" style={{ left: "14%", top: "52%" }} float={-6} />
      <Drop size={66} corner="br" fill={navy} glyph="arrow" className="absolute" style={{ right: "14%", top: "47%" }} float={-3} />
      <Drop size={112} corner="br" fill={lavender} glyph="dots" glyphColor={blue} className="absolute" style={{ left: "1%", bottom: "9%" }} float={-1} />
      <DropPair size={70} front={blue} back={navy} className="absolute" style={{ right: "5%", bottom: "11%" }} float={-4} />
      <Drop size={26} corner="tl" fill={blue} className="absolute" style={{ left: "13%", top: "36%" }} float={-7} />
      <Drop size={22} corner="br" fill={navy} className="absolute" style={{ right: "9%", bottom: "36%" }} float={-2.5} />
    </div>
  );
}
