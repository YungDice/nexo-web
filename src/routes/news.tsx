import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsPage() {
  const posts = useQuery({
    queryKey: ["news"],
    queryFn: async (): Promise<NewsPost[]> => {
      const { data, error } = await supabase
        .from("news_posts")
        .select("id,title,body,published,published_at")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-6 pt-20 pb-24 sm:pt-28">
        <Link to="/" className="font-mono text-xs text-muted-foreground hover:text-accent">
          ← deli.dev
        </Link>

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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
