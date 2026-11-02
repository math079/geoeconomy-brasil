import { createServerFn } from "@tanstack/react-start";

export type Quote = {
  symbol: string;
  label: string;
  name: string;
  kind: "indice" | "moeda" | "acao";
  price: number | null;
  changePct: number | null;
  currency: string;
  series: number[];
};
export type MarketData = { quotes: Quote[]; selic: number | null; updatedAt: string };

const SYMBOLS: { s: string; label: string; name: string; kind: Quote["kind"] }[] = [
  { s: "^BVSP", label: "IBOV", name: "Ibovespa", kind: "indice" },
  { s: "^GSPC", label: "S&P 500", name: "S&P 500 (EUA)", kind: "indice" },
  { s: "BRL=X", label: "USD/BRL", name: "Dólar", kind: "moeda" },
  { s: "EURBRL=X", label: "EUR/BRL", name: "Euro", kind: "moeda" },
  { s: "BTC-BRL", label: "BTC", name: "Bitcoin", kind: "moeda" },
  { s: "PETR4.SA", label: "PETR4", name: "Petrobras", kind: "acao" },
  { s: "VALE3.SA", label: "VALE3", name: "Vale", kind: "acao" },
  { s: "ITUB4.SA", label: "ITUB4", name: "Itaú Unibanco", kind: "acao" },
  { s: "BBDC4.SA", label: "BBDC4", name: "Bradesco", kind: "acao" },
  { s: "BBAS3.SA", label: "BBAS3", name: "Banco do Brasil", kind: "acao" },
  { s: "ABEV3.SA", label: "ABEV3", name: "Ambev", kind: "acao" },
  { s: "WEGE3.SA", label: "WEGE3", name: "WEG", kind: "acao" },
  { s: "B3SA3.SA", label: "B3SA3", name: "B3", kind: "acao" },
];

async function fetchQuote(def: (typeof SYMBOLS)[number]): Promise<Quote> {
  const base = { symbol: def.s, label: def.label, name: def.name, kind: def.kind };
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(def.s)}?range=1mo&interval=1d`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    );
    if (!res.ok) throw new Error(String(res.status));
    const json = (await res.json()) as any;
    const r = json?.chart?.result?.[0];
    const closes: number[] = (r?.indicators?.quote?.[0]?.close ?? []).filter((n: unknown) => typeof n === "number");
    const price: number | null = r?.meta?.regularMarketPrice ?? closes.at(-1) ?? null;
    const prev = closes.length >= 2 ? closes[closes.length - 2] : (r?.meta?.chartPreviousClose ?? null);
    return {
      ...base,
      price,
      changePct: price != null && prev ? ((price - prev) / prev) * 100 : null,
      currency: r?.meta?.currency ?? "BRL",
      series: closes,
    };
  } catch (e) {
    console.error("Cotação falhou", def.s, e);
    return { ...base, price: null, changePct: null, currency: "BRL", series: [] };
  }
}

export const getMarket = createServerFn({ method: "GET" }).handler(async (): Promise<MarketData> => {
  const [quotes, selic] = await Promise.all([
    Promise.all(SYMBOLS.map(fetchQuote)),
    fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json")
      .then((r) => r.json() as Promise<{ valor: string }[]>)
      .then((d) => Number(d[0]?.valor) || null)
      .catch(() => null),
  ]);
  return { quotes, selic, updatedAt: new Date().toISOString() };
});
