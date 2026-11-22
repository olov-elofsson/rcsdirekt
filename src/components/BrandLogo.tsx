import logoWhiteUrl from "../../brand/SVG/rcsdirekt-vit.svg";
import logoUrl from "../../brand/SVG/rcsdirekt.svg";
import symbolWhiteUrl from "../../brand/SVG/symbol-vit.svg";
import symbolUrl from "../../brand/SVG/symbol.svg";
import { cn } from "@/lib/utils";

export function BrandLogo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return <img src={inverse ? logoWhiteUrl : logoUrl} alt="rcsdirekt.se" width={542} height={102} className={cn("h-9 w-auto", className)} />;
}

export function BrandSymbol({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return <img src={inverse ? symbolWhiteUrl : symbolUrl} alt="rcsdirekt.se" className={cn("h-9 w-auto", className)} />;
}