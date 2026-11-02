import { createServerFn } from "@tanstack/react-start";

export type Topic = "Economia" | "Mercado" | "Geopolítica";
export type NewsItem = {
  id: string;
  title: string;
  link: string;
  summary: string;
  source: string;
  image: string | null;
  publishedAt: string | null;
  topic: Topic;
};

const gnews = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;

export const SOURCES: { name: string; url: string; topic?: Topic }[] = [
  { name: "InfoMoney", url: "https://www.infomoney.com.br/feed/" },
  { name: "Valor Econômico", url: "https://valor.globo.com/rss/valor" },
  { name: "Exame", url: "https://exame.com/feed/" },
  { name: "Money Times", url: "https://www.moneytimes.com.br/feed/" },
  { name: "CNN Brasil", url: gnews("site:cnnbrasil.com.br economia when:3d") },
  { name: "Geopolítica", url: gnews("geopolítica OR guerra comercial OR tarifas when:2d"), topic: "Geopolítica" },
];

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}
const strip = (s: string) => decode(decode(s).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? m[1] : "";
};

export function classify(text: string): Topic {
  const t = text.toLowerCase();
  if (/geopol|guerra|china|eua|trump|otan|rússia|russia|ucrânia|israel|irã|gaza|tarifa|sanç|diplomac|brics|putin|xi jinping/.test(t))
    return "Geopolítica";
  if (/ibovespa|ações|ação |bolsa|b3|dólar|dividend|fii|cripto|bitcoin|petr4|vale3|investid|mercado/.test(t))
    return "Mercado";
  return "Economia";
}

export function parseRss(xml: string, source: string, forced?: Topic): NewsItem[] {
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  return items.slice(0, 25).map((it) => {
    let title = strip(tag(it, "title"));
    if (source === "CNN Brasil" || source === "Geopolítica") title = title.replace(/\s-\s[^-]+$/, "");
    const link = strip(tag(it, "link"));
    const summary = strip(tag(it, "description")).slice(0, 260);
    const img =
      it.match(/<media:content[^>]*url="([^"]+)"/i)?.[1] ??
      it.match(/<media:thumbnail[^>]*url="([^"]+)"/i)?.[1] ??
      it.match(/<enclosure[^>]*url="([^"]+)"/i)?.[1] ??
      decode(it).match(/<img[^>]*src="([^"]+)"/i)?.[1] ??
      null;
    const pub = strip(tag(it, "pubDate"));
    const d = pub ? new Date(pub) : null;
    const realSource = source === "Geopolítica" ? strip(tag(it, "source")) || "Google Notícias" : source;
    return {
      id: link,
      title,
      link,
      summary: summary.startsWith(title.slice(0, 30)) ? "" : summary,
      source: realSource,
      image: img ? decode(img) : null,
      publishedAt: d && !isNaN(d.getTime()) ? d.toISOString() : null,
      topic: forced ?? classify(`${title} ${summary}`),
    };
  }).filter((i) => i.title && i.link);
}

export const getNews = createServerFn({ method: "GET" }).handler(async (): Promise<NewsItem[]> => {
  const results = await Promise.allSettled(
    SOURCES.map(async (s) => {
      const res = await fetch(s.url, { headers: { "User-Agent": "Mozilla/5.0 GeoEconomy" } });
      if (!res.ok) throw new Error(`${s.name} ${res.status}`);
      return parseRss(await res.text(), s.name, s.topic);
    }),
  );
  const seen = new Set<string>();
  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") {
      for (const i of r.value) {
        if (seen.has(i.title)) continue;
        seen.add(i.title);
        all.push(i);
      }
    } else console.error("Feed falhou:", r.reason);
  }
  return all.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
});
