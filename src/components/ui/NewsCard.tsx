import Link from "next/link";
import { formatDate, type NewsPost } from "@/lib/content";

/** A news post as a bordered card; the whole card is one link. */
export default function NewsCard({ post, headingAs: H = "h3" }: { post: NewsPost; headingAs?: "h2" | "h3" }) {
  return (
    <Link href={`/news/${post.slug}`} className="card press group h-full">
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-butter px-4 py-2 text-[0.72rem] font-bold tracking-[0.12em] text-[#141414] sm:px-5">
        <span>{post.tag ?? "NEWS"}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <H className="text-[1.15rem] font-extrabold uppercase leading-snug tracking-[0.01em]">{post.title}</H>
        <p className="body-copy !text-[0.95rem]">{post.summary}</p>
        <span className="link-arrow mt-auto pt-2 text-sm">READ POST →</span>
      </div>
    </Link>
  );
}
