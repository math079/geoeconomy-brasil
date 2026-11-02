import { queryOptions } from "@tanstack/react-query";
import { getNews } from "./news.functions";
import { getMarket } from "./market.functions";

export const newsQuery = queryOptions({
  queryKey: ["news"],
  queryFn: () => getNews(),
  staleTime: 5 * 60_000,
});

export const marketQuery = queryOptions({
  queryKey: ["market"],
  queryFn: () => getMarket(),
  staleTime: 2 * 60_000,
});

export const fmtNumber = (n: number | null, digits = 2) =>
  n == null ? "—" : n.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const fmtPct = (n: number | null) =>
  n == null ? "—" : `${n >= 0 ? "+" : ""}${n.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}%`;

export function timeAgo(iso: string | null) {
  if (!iso) return "";
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "agora";
  if (m < 60) return `há ${m} min`;
  const h = Math.round(m / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${Math.round(h / 24)} d`;
}
