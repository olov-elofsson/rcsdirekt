// Icons that editors can pick in the CMS. Keep the names in sync with
// cms/src/fields/icon.ts so every option in the CMS has an icon here, and in
// PHONE_ICONS (InteractiveRcsDemo.tsx), which uses the phone's Material icons.
import {
  BarChart3,
  Check,
  Code2,
  Globe,
  Image as ImageIcon,
  Layers3,
  MessageSquare,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const contentIcons: Record<string, LucideIcon> = {
  "trending-up": TrendingUp,
  "bar-chart": BarChart3,
  wallet: Wallet,
  globe: Globe,
  code: Code2,
  image: ImageIcon,
  layers: Layers3,
  pointer: MousePointerClick,
  message: MessageSquare,
  shield: ShieldCheck,
  check: Check,
  sparkles: Sparkles,
};

export function contentIcon(name: string): LucideIcon {
  return contentIcons[name] ?? Sparkles;
}
