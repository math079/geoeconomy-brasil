import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Ticker } from "./Ticker";

const NAV = [
  { to: "/noticias", label: "Notícias" },
  { to: "/bolsa", label: "Bolsa" },
  { to: "/guia", label: "Guia" },
  { to: "/forum", label: "Fórum" },
] as const;

export function SiteHeader() {
  const { session } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  async function signOut() {
    await qc.cancelQueries();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <header>
      <Ticker />
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3 text-xs text-muted-foreground">
          <span className="capitalize">{today}</span>
          {session ? (
            <button onClick={signOut} className="hover:text-primary">Sair</button>
          ) : (
            <Link to="/auth" className="hover:text-primary">Entrar / Cadastrar</Link>
          )}
        </div>
        <Link to="/" className="block text-center">
          <span className="font-serif text-4xl font-bold tracking-tight md:text-6xl">
            Geo<span className="text-primary">Economy</span>
          </span>
        </Link>
        <p className="mt-1 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Economia · Mercado · Geopolítica
        </p>
        <nav className="mt-4 flex justify-center gap-6 overflow-x-auto border-y border-border py-3 text-sm font-medium">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="whitespace-nowrap text-foreground/80 hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border py-10 text-center text-xs text-muted-foreground">
      <p className="font-serif text-lg text-foreground">Geo<span className="text-primary">Economy</span></p>
      <p className="mt-2">Notícias agregadas com link para as fontes originais. Cotações com possível atraso. Não é recomendação de investimento.</p>
    </footer>
  );
}
