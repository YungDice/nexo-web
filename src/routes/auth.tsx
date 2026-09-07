import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — deli.dev" },
      { name: "description", content: "Sign in to manage deli.dev news and roadmap entries." },
      { property: "og:title", content: "Sign in — deli.dev" },
      { property: "og:description", content: "Sign in to manage deli.dev news and roadmap entries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/news", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/news" },
      });
      setStatus(error ? error.message : "Check your inbox to confirm the address, then sign in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setStatus(error.message);
      else navigate({ to: "/news", replace: true });
    }
    setBusy(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-mono text-xs text-muted-foreground hover:text-accent">
          ← deli.dev
        </Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          {mode === "signin" ? "Sign in" : "Create an account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Publishing news and roadmap changes is restricted to the team.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-soft disabled:opacity-60"
          >
            {busy ? "Working…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-muted-foreground">{status}</p>}
        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setStatus(null);
          }}
          className="mt-6 text-sm text-accent hover:underline"
        >
          {mode === "signin" ? "Create an account" : "I already have an account"}
        </button>
      </div>
    </main>
  );
}
