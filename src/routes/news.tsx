import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — deli.dev" },
      {
        name: "description",
        content:
          "Latest updates from deli.dev, the small Swiss team building Nexo.",
      },
      { property: "og:title", content: "News — deli.dev" },
      {
        property: "og:description",
        content: "Latest updates from the team building Nexo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

const embeds = [
  {
    src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7500513814459629569?collapsed=1",
    height: 627,
    width: 504,
  },
  {
    src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7500824328016617472?collapsed=1",
    height: 668,
    width: 504,
  },
  {
    src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7500823891540353024?collapsed=1",
    height: 668,
    width: 504,
  },
  {
    src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7502688324067717120?collapsed=1",
    height: 627,
    width: 504,
  },
];

function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1100px] px-6 pt-20 pb-24 sm:pt-28">
        <Link
          to="/"
          className="font-mono text-xs text-muted-foreground hover:text-accent"
        >
          ← deli.dev
        </Link>

        <FadeUp>
          <p className="mt-12 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            News
          </p>
          <h1 className="mx-auto mt-4 max-w-2xl text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Updates from LinkedIn
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted-foreground">
            We post progress and notes on LinkedIn. The cards below load directly from there.
          </p>
        </FadeUp>

        <div className="mt-12 grid justify-items-center gap-8">
          {embeds.map((embed, index) => (
            <FadeUp key={embed.src} delay={index * 0.05}>
              <div className="mx-auto w-full max-w-[504px] overflow-hidden rounded-lg border border-border bg-surface">
                <iframe
                  src={embed.src}
                  height={embed.height}
                  width={embed.width}
                  frameBorder="0"
                  allowFullScreen
                  title="Embedded post"
                  loading="lazy"
                  className="block w-full max-w-full border-0"
                  style={{
                    aspectRatio: `${embed.width} / ${embed.height}`,
                    height: "auto",
                  }}
                />
              </div>
            </FadeUp>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
          LinkedIn serves these embeds and may set cookies when you view them. We do not track you here.
        </p>
      </div>
    </main>
  );
}
