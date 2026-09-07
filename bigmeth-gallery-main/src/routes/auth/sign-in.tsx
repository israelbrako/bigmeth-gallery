import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/sign-in")({
  head: () => ({
    meta: [{ title: "Sign In — BigMeth Photography" }],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    await navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="display text-4xl">Bigmeth</p>
          <p className="eyebrow mt-3">Admin access</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label className="eyebrow text-foreground/70">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
              placeholder="you@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="eyebrow text-foreground/70">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="eyebrow mt-2 border border-accent px-6 py-4 text-accent transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
