/**
 * Bordered 16:9 YouTube player. Uses the privacy-enhanced youtube-nocookie
 * domain and lazy loading, so nothing loads until it scrolls near view.
 */
export default function YouTubeEmbed({ id, start, title }: { id: string; start?: number; title: string }) {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (start) params.set("start", String(start));
  return (
    <div className="brutal relative aspect-video overflow-hidden bg-black">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
