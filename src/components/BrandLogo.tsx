import logoWhiteUrl from "@/assets/rcsdirekt-logo-vit.svg";
import logoUrl from "@/assets/rcsdirekt-logo.svg";
import symbolWhiteUrl from "@/assets/rcsdirekt-symbol-vit.svg";
import symbolUrl from "@/assets/rcsdirekt-symbol.svg";
import { cn } from "@/lib/utils";

export function BrandLogo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return <img src={inverse ? logoWhiteUrl : logoUrl} alt="RCS Direkt" className={cn("h-9 w-auto", className)} />;
}

export function BrandSymbol({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return <img src={inverse ? symbolWhiteUrl : symbolUrl} alt="RCS Direkt" className={cn("h-9 w-auto", className)} />;
}