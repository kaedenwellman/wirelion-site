/*
 * Social icons. lucide-react no longer ships brand logos, so Instagram uses its
 * standard glyph drawn inline (rounded square, lens, flash dot), in
 * currentColor so it follows the theme. The others are generic placeholders
 * until those links exist.
 */
import { Briefcase, Code2, MessageCircle, Play } from "lucide-react";

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ICONS = {
  discord: MessageCircle,
  linkedin: Briefcase,
  github: Code2,
  youtube: Play,
} as const;

export default function SocialIcon({ name }: { name: "instagram" | keyof typeof ICONS }) {
  if (name === "instagram") return <InstagramGlyph />;
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" size={20} />;
}
