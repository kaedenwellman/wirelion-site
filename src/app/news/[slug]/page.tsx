import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import { formatDate, getPost, news } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/news/${p.slug}` },
    openGraph: { type: "article", title: `${p.title} · Wire Lion`, description: p.summary, url: `/news/${p.slug}`, publishedTime: p.date },
  };
}

export default async function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const others = news.filter((o) => o.slug !== p.slug).slice(0, 3);

  return (
    <>
      <article className="wrap py-8 lg:py-12">
        <nav aria-label="Breadcrumb" className="text-sm tracking-[0.06em]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="inline-block py-2 text-muted hover:text-ink hover:underline">
                HOME
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li>
              <Link href="/news" className="inline-block py-2 text-muted hover:text-ink hover:underline">
                NEWS
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mt-6 max-w-[68ch]">
          <p className="flex flex-wrap items-center gap-3">
            <span className="tag bg-butter !text-[#141414]">{p.tag ?? "NEWS"}</span>
            <time dateTime={p.date} className="eyebrow">
              {formatDate(p.date)}
            </time>
          </p>
          <h1 className="mt-5 text-[clamp(2.1rem,6vw,4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.02em]">{p.title}</h1>
          <p className="mt-6 text-[1.12rem] leading-relaxed">{p.summary}</p>

          <div className="mt-8 grid gap-6 text-[1.02rem] leading-[1.8] text-muted">
            {p.body.map((block, i) =>
              typeof block === "string" ? (
                <p key={i}>{block}</p>
              ) : (
                <figure key={i} className="brutal bg-mint p-6 text-ink">
                  <blockquote className="text-[clamp(1.1rem,2.4vw,1.4rem)] font-extrabold leading-snug tracking-tight">
                    <p>“{block.quote}”</p>
                  </blockquote>
                  {block.cite && <figcaption className="mt-3 text-sm font-medium">— {block.cite}</figcaption>}
                </figure>
              ),
            )}
          </div>

          {p.source && (
            <p className="mt-10 border-t-2 border-ink pt-5 text-sm leading-relaxed text-muted">
              <span className="font-bold text-ink">SOURCE: </span>
              {p.source.href ? (
                <a href={p.source.href} target="_blank" rel="noopener noreferrer" className="prose-link">
                  {p.source.label}
                  <ArrowUpRight aria-hidden="true" size={14} className="ml-1 inline" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                p.source.label
              )}
            </p>
          )}
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t-2 border-ink py-14 lg:py-20">
          <div className="wrap">
            <h2 className="h-section">MORE NEWS</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {others.map((o) => (
                <li key={o.slug}>
                  <NewsCard post={o} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
