import type { NewsItem } from "@/lib/news.functions";
import { timeAgo } from "@/lib/queries";

export function NewsCard({ item, compact }: { item: NewsItem; compact?: boolean }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 border-t border-border pt-4"
    >
      {!compact && item.image && (
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="kicker">{item.topic}</span>
        <span className="text-xs text-muted-foreground">· {item.source} · {timeAgo(item.publishedAt)}</span>
      </div>
      <h3 className="text-lg leading-snug transition group-hover:text-primary">{item.title}</h3>
      {!compact && item.summary && <p className="line-clamp-3 text-sm text-muted-foreground">{item.summary}</p>}
    </a>
  );
}
