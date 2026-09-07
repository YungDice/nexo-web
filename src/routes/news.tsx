import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — deli.dev" },
      {
        name: "description",
        content:
          "Release notes and progress updates from deli.dev, the small Swiss team building Nexo.",
      },
      { property: "og:title", content: "News — deli.dev" },
      {
        property: "og:description",
        content: "Release notes and progress updates from the team building Nexo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

type NewsPost = {
  id: string;
  title: string;
  body: string;
  published: boolean;
  published_at: string;
};

function useIsAdmin() {
  const [state, setState] = useState<{ userId: string | null; isAdmin: boolean; ready: boolean }>({
    userId: null,
    isAdmin: false,
    ready: false,
  });

  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id ?? null;
      if (!userId) {
        if (active) setState({ userId: null, isAdmin: false, ready: true });
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      if (active) setState({ userId, isAdmin: Boolean(isAdmin), ready: true });
    }
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") load();
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsPage() {
  const queryClient = useQueryClient();
  const { userId, isAdmin, ready } = useIsAdmin();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  const posts = useQuery({
    queryKey: ["news", isAdmin],
    queryFn: async (): Promise<NewsPost[]> => {
      const { data, error } = await supabase
        .from("news_posts")
        .select("id,title,body,published,published_at")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const createPost = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("news_posts")
        .insert({ title: title.trim(), body: body.trim(), author_id: userId });
      if (error) throw error;
    },
    onSuccess: () => {
      setTitle("");
      setBody("");
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (e: Error) => setError(e.message),
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
    onError: (e: Error) => setError(e.message),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-6 pt-20 pb-24 sm:pt-28">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="font-mono text-xs text-muted-foreground hover:text-accent">
            ← deli.dev
          </Link>
          {ready &&
            (userId ? (
              <button onClick={signOut} className="text-xs text-accent hover:underline">
                Sign out
              </button>
            ) : (
              <Link to="/auth" className="text-xs text-accent hover:underline">
                Team sign in
              </Link>
            ))}
        </div>

        <FadeUp>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            News
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What we shipped, and when
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Release notes and progress updates. Nothing here is a promise of a date.
          </p>
        </FadeUp>

        {isAdmin && (
          <section className="mt-12 rounded-lg border border-border bg-surface p-6">
            <h2 className="text-base font-semibold text-foreground">Write a post</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="post-title" className="block text-sm text-foreground">
                  Title
                </label>
                <input
                  id="post-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="post-body" className="block text-sm text-foreground">
                  Body
                </label>
                <textarea
                  id="post-body"
                  rows={5}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm leading-relaxed text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>
              <button
                onClick={() => createPost.mutate()}
                disabled={createPost.isPending || title.trim().length === 0}
                className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-soft disabled:opacity-60"
              >
                {createPost.isPending ? "Publishing…" : "Publish"}
              </button>
              {error && <p className="text-sm text-muted-foreground">{error}</p>}
            </div>
          </section>
        )}

        <div className="mt-12 space-y-px overflow-hidden rounded-lg border border-border bg-border">
          {posts.isLoading && (
            <p className="bg-surface p-8 text-sm text-muted-foreground">Loading…</p>
          )}
          {posts.data?.length === 0 && (
            <p className="bg-surface p-8 text-sm text-muted-foreground">No posts yet.</p>
          )}
          {posts.data?.map((post) => (
            <article key={post.id} className="bg-surface p-8">
              <p className="font-mono text-xs text-muted-foreground">
                {formatDate(post.published_at)}
              </p>
              <h2 className="mt-3 text-lg font-semibold text-foreground">{post.title}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {post.body}
              </p>
              {isAdmin && (
                <button
                  onClick={() => deletePost.mutate(post.id)}
                  className="mt-4 text-xs text-accent hover:underline"
                >
                  Delete
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
