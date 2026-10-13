/*
 * Social icons. Instagram uses the official full-color logo
 * (/public/brand/instagram.png). lucide-react no longer ships brand logos, so
 * the others are generic placeholders until those links exist.
 */
import Image from "next/image";
import { Briefcase, Code2, MessageCircle, Play } from "lucide-react";

function InstagramLogo() {
  return <Image src="/brand/instagram.png" alt="" width={26} height={26} className="block h-[26px] w-[26px]" />;
}

const ICONS = {
  discord: MessageCircle,
  linkedin: Briefcase,
  github: Code2,
  youtube: Play,
} as const;

export default function SocialIcon({ name }: { name: "instagram" | keyof typeof ICONS }) {
  if (name === "instagram") return <InstagramLogo />;
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" size={20} />;
}
