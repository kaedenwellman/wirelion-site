import type { Metadata } from "next";
import NewsCard from "@/components/ui/NewsCard";
import { news } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "News and announcements from the Wire Lion Engineering Club at UCCS.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <div className="wrap py-12 lg:py-16">
      <p className="eyebrow">UPDATES</p>
      <h1 className="h-giant mt-1">NEWS</h1>
      <hr className="rule mt-8" />
      {news.length ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {news.map((p) => (
            <li key={p.slug}>
              <NewsCard post={p} headingAs="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="body-copy mt-8">No posts yet.</p>
      )}
    </div>
  );
}
