import type { CSSProperties, ReactNode } from "react";

/**
 * Outlined message shapes: stacked cards, chat bubbles and round buttons, drawn in the brand kit
 * (navy lines, lavender, blue and white; never orange). They frame the centred hero text at the
 * page's outer edges, on wide screens only. Decorative; the slow drift stops with reduced motion
 * (.hero-float in styles.css).
 */
const ink = "#15115f";
const blue = "#2f7bff";
const line = { stroke: ink, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Shape({ style, delay, width, viewBox, children }: { style: CSSProperties; delay: number; width: number; viewBox: string; children: ReactNode }) {
  return (
    <svg aria-hidden="true" viewBox={viewBox} width={width} className="hero-float absolute" style={{ ...style, animationDelay: `${delay}s` }}>
      {children}
    </svg>
  );
}

function RoundButton({ fill, children }: { fill: string; children: ReactNode }) {
  return (
    <>
      <circle cx="36" cy="36" r="33" fill={fill} {...line} />
      <g transform="translate(36 36)">{children}</g>
    </>
  );
}

export function HeroGraphic() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 lg:block">
      {/* stacked rich cards, top left */}
      <Shape style={{ left: "1%", top: "12%" }} delay={-2} width={132} viewBox="0 0 150 150">
        <rect x="40" y="40" width="104" height="104" rx="18" fill={blue} {...line} />
        <rect x="22" y="22" width="104" height="104" rx="18" fill="#fff" {...line} />
        <rect x="4" y="4" width="104" height="104" rx="18" fill="#fff" {...line} />
        <rect x="18" y="18" width="76" height="34" rx="7" fill={blue} {...line} />
        <path d="M21 48l14-12 10 9 8-6 16 13" fill="none" {...line} stroke="#fff" />
        <path d="M20 68h46M20 81h30" fill="none" {...line} strokeWidth={4} />
      </Shape>

      {/* blue chat bubble with typing dots, top right */}
      <Shape style={{ right: "2%", top: "14%" }} delay={-5} width={128} viewBox="0 0 150 92">
        <path d="M28 4h96a22 22 0 0 1 22 22v32a22 22 0 0 1-22 22H40l-20 10 6-12A22 22 0 0 1 6 58V26A22 22 0 0 1 28 4z" fill={blue} {...line} />
        {[52, 76, 100].map((cx) => (
          <circle key={cx} cx={cx} cy={42} r={7} fill="#fff" {...line} strokeWidth={2} />
        ))}
      </Shape>

      {/* round buttons */}
      <Shape style={{ left: "12%", top: "56%" }} delay={-6} width={62} viewBox="0 0 72 72">
        <RoundButton fill="#fff">
          <path d="M0 11c-9-6-14-11-14-17 0-4 3-7 7-7 3 0 5 2 7 4 2-2 4-4 7-4 4 0 7 3 7 7 0 6-5 11-14 17z" fill={ink} />
        </RoundButton>
      </Shape>
      <Shape style={{ right: "13%", top: "48%" }} delay={-3} width={62} viewBox="0 0 72 72">
        <RoundButton fill={blue}>
          <path d="M-12 0h24M3-9l9 9-9 9" fill="none" {...line} strokeWidth={3.5} />
        </RoundButton>
      </Shape>
      <Shape style={{ right: "4%", bottom: "12%" }} delay={-4} width={58} viewBox="0 0 72 72">
        <RoundButton fill="#fff">
          <path d="M0 12v-24M-9-3l9-9 9 9" fill="none" {...line} strokeWidth={3.5} />
        </RoundButton>
      </Shape>

      {/* outlined bubble, bottom left */}
      <Shape style={{ left: "2%", bottom: "8%" }} delay={-1} width={134} viewBox="0 0 150 92">
        <path d="M28 4h96a22 22 0 0 1 22 22v32a22 22 0 0 1-22 22H40l-20 10 6-12A22 22 0 0 1 6 58V26A22 22 0 0 1 28 4z" fill="#fff" {...line} />
        {[52, 76, 100].map((cx) => (
          <circle key={cx} cx={cx} cy={42} r={7} fill={blue} {...line} strokeWidth={2} />
        ))}
      </Shape>
    </div>
  );
}
