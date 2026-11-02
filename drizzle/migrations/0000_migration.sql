CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'Membro',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles public read" ON public.profiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "profiles own insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles own update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NULLIF(NEW.raw_user_meta_data->>'display_name',''), NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1), 'Membro'))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.forum_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category text NOT NULL CHECK (category IN ('economia-br','bolsa','geopolitica','iniciantes','cripto')),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 200),
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 10000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.forum_threads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_threads TO authenticated;
GRANT ALL ON public.forum_threads TO service_role;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "threads read" ON public.forum_threads FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "threads insert own" ON public.forum_threads FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "threads update own" ON public.forum_threads FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "threads delete own" ON public.forum_threads FOR DELETE TO authenticated USING (auth.uid() = author_id);

CREATE TABLE public.forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.forum_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.forum_posts TO authenticated;
GRANT ALL ON public.forum_posts TO service_role;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts read" ON public.forum_posts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "posts insert own" ON public.forum_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts update own" ON public.forum_posts FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "posts delete own" ON public.forum_posts FOR DELETE TO authenticated USING (auth.uid() = author_id);
CREATE INDEX ON public.forum_posts(thread_id, created_at);
CREATE INDEX ON public.forum_threads(created_at DESC);