export function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  if (data.length < 2) return <div className="h-10" />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const w = 120;
  const h = 40;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`h-10 w-full ${up ? "text-positive" : "text-negative"}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
