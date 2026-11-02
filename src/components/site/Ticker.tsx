import { useQuery } from "@tanstack/react-query";
import { marketQuery, fmtNumber, fmtPct } from "@/lib/queries";

export function Ticker() {
  const { data } = useQuery(marketQuery);
  const items = data
    ? [
        ...data.quotes.filter((q) => q.price != null),
        ...(data.selic != null ? [{ label: "SELIC", price: data.selic, changePct: null, symbol: "selic" }] : []),
      ]
    : [];
  return (
    <div className="overflow-hidden border-b border-border bg-card text-xs">
      <div className="flex w-max animate-ticker gap-8 py-2 pl-4">
        {items.length === 0 && <span className="text-muted-foreground">Carregando cotações…</span>}
        {[...items, ...items].map((q, i) => (
          <span key={`${q.symbol}-${i}`} className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-semibold text-primary">{q.label}</span>
            <span>{q.symbol === "selic" ? `${fmtNumber(q.price)}% a.a.` : fmtNumber(q.price)}</span>
            {q.changePct != null && (
              <span className={q.changePct >= 0 ? "text-positive" : "text-negative"}>{fmtPct(q.changePct)}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
