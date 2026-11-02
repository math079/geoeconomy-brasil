import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthCtx = { session: Session | null; loading: boolean };
const Ctx = createContext<AuthCtx>({ session: null, loading: true });

export function AuthProvider({ children, onChange }: { children: ReactNode; onChange?: () => void }) {
  const [state, setState] = useState<AuthCtx>({ session: null, loading: true });
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setState({ session, loading: false });
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") onChange?.();
    });
    supabase.auth.getSession().then(({ data }) => setState({ session: data.session, loading: false }));
    return () => data.subscription.unsubscribe();
  }, []);
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
