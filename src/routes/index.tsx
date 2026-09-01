import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import {
  MessageSquareLock,
  Globe,
  AtSign,
  Database,
  Linkedin,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "deli.dev — Software built plainly in Switzerland" },
      {
        name: "description",
        content:
          "deli.dev is a small Swiss development team building open-source software. Nexo, our current project, is an end-to-end encrypted messenger for Windows.",
      },
      {
        property: "og:title",
        content: "deli.dev — Software built plainly in Switzerland",
      },
      {
        property: "og:description",
        content:
          "A small Swiss team shipping open-source tools with their limits stated in plain text. Current project: Nexo, an end-to-end encrypted messenger for Windows.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const RELEASES = "https://github.com/YungDice/nexo/releases/latest";
const REPO = "https://github.com/YungDice/nexo";
const THREAT_MODEL = "https://github.com/YungDice/nexo/blob/main/docs/THREAT-MODEL.md";
const LINKEDIN = "https://www.linkedin.com/in/deli-dev/";

function PrimaryButton({
  children,
  href = RELEASES,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-soft"
    >
      {children}
    </a>
  );
}

function GhostButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}

const capabilities = [
  {
    icon: MessageSquareLock,
    title: "Private conversations",
    body: "End-to-end encrypted with MLS (RFC 9420) via OpenMLS. The server stores and forwards ciphertext it cannot read.",
  },
  {
    icon: Globe,
    title: "A public feed",
    body: "Posts, images, links, votes and threaded comments, visible to anyone signed in.",
  },
  {
    icon: AtSign,
    title: "Handles, not phone numbers",
    body: "Accounts are a handle and a password. Nexo never asks for a phone number or an email address.",
  },
  {
    icon: Database,
    title: "Local storage is encrypted",
    body: "History lives in a SQLCipher database whose key is held by Windows for your account alone.",
  },
];

const limits = [
  {
    title: "The feed is not end-to-end encrypted.",
    body: "Posts and profiles are readable by the server and public to anyone signed in. Content written for strangers cannot also be encrypted to a closed group.",
  },
  {
    title: "Conversation metadata is visible.",
    body: "Who talks to whom, when, and message sizes. That is the honest limit of the design.",
  },
  {
    title: "One device per account.",
    body: "Signing in elsewhere signs this machine out and wipes its local history.",
  },
  {
    title: "There is no account recovery.",
    body: "Forget your password and the account is gone. That is what holding no recovery key means.",
  },
];

const cryptoPoints = [
  {
    title: "Identity keys are Ed25519.",
    body: "Each account holds a long-term Ed25519 identity key pair generated on your machine. The private half never leaves it.",
  },
  {
    title: "A safety number is a fingerprint.",
    body: "It is computed over both parties' identity keys, so the same sixty digits appear on both machines and nowhere else. Read them aloud or compare them in person.",
  },
  {
    title: "Key changes are announced.",
    body: "If a contact's identity key changes, Nexo tells you and marks the conversation until you compare again. A fingerprint you never re-check is not a check.",
  },
];

const safetyNumber = [
  "48210",
  "93117",
  "60482",
  "17559",
  "20834",
  "76192",
  "35708",
  "84261",
  "09473",
  "51826",
  "63940",
  "27185",
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeUp>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
        </FadeUp>
        {children}
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <header className="mx-auto max-w-[1100px] px-6 pt-24 pb-20 sm:pt-36 sm:pb-28">
        <FadeUp>
          <p className="text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">
            deli.dev
          </p>
        </FadeUp>
        <FadeUp delay={80}>
          <h1 className="mt-10 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Software, built plainly. From Switzerland.
          </h1>
        </FadeUp>
        <FadeUp delay={160}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We ship small, open-source tools and state their limits in plain text. Nexo is our current project.
          </p>
        </FadeUp>
        <FadeUp delay={240}>
          <div className="mt-10 flex flex-wrap gap-3">
            <PrimaryButton href="#projects">View project</PrimaryButton>
            <GhostButton href={LINKEDIN}>Contact on LinkedIn</GhostButton>
          </div>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            Based in Switzerland · No trackers · No cookies
          </p>
        </FadeUp>
      </header>

      {/* Projects */}
      <Section id="projects" eyebrow="01 — Projects" title="Selected work">
        <FadeUp>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            One project at a time. Currently shipping Nexo.
          </p>
        </FadeUp>
        <FadeUp delay={80}>
          <article className="mt-12 rounded-lg border border-border bg-surface p-8 sm:p-10">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Nexo
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              An end-to-end encrypted messenger for Windows. Open source, MIT licensed, no phone number required. Messages use MLS; the feed does not, and Nexo says so.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                Windows
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                Open source
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                MLS encryption
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton>Download for Windows</PrimaryButton>
              <GhostButton href={REPO}>View source</GhostButton>
              <GhostButton href={THREAT_MODEL}>Threat model</GhostButton>
            </div>
          </article>
        </FadeUp>
      </Section>

      {/* What it does */}
      <Section id="what-it-does" eyebrow="02 — Overview" title="What Nexo does">
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {capabilities.map(({ icon: Icon, title, body }, i) => (
            <FadeUp as="li" key={title} delay={i * 60} className="bg-surface p-8">
              <Icon aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </FadeUp>
          ))}
        </ul>
      </Section>

      {/* Limits */}
      <Section id="limits" eyebrow="03 — Limits" title="What Nexo does not protect">
        <FadeUp>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Every messenger has limits. Most do not list them.
          </p>
        </FadeUp>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {limits.map((item, i) => (
            <FadeUp as="li" key={item.title} delay={i * 60} className="bg-surface p-8">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </FadeUp>
          ))}
        </ul>
      </Section>

      {/* Encryption */}
      <Section id="encryption" eyebrow="04 — Cryptography" title="How the encryption works">
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(0,420px)]">
          <ul className="space-y-8">
            {cryptoPoints.map((p, i) => (
              <FadeUp as="li" key={p.title} delay={i * 60}>
                <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </FadeUp>
            ))}
          </ul>
          <FadeUp delay={120}>
            <figure className="rounded-lg border border-border bg-surface p-6">
              <figcaption className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Safety number
              </figcaption>
              <p className="mt-5 grid grid-cols-3 gap-x-4 gap-y-3 font-mono text-sm text-foreground sm:text-base">
                {safetyNumber.map((g) => (
                  <span key={g}>{g}</span>
                ))}
              </p>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Sixty digits, twelve groups. Identical on both machines when the keys are the ones
                you expect.
              </p>
            </figure>
          </FadeUp>
        </div>
      </Section>

      {/* Download */}
      <Section id="download" eyebrow="05 — Install" title="Download">
        <FadeUp>
          <div className="mt-10 flex flex-wrap gap-3">
            <PrimaryButton>Download for Windows</PrimaryButton>
            <GhostButton href={REPO}>View source</GhostButton>
          </div>
        </FadeUp>
        <FadeUp delay={80}>
          <div className="mt-10 max-w-2xl rounded-lg border border-border p-6">
            <p className="text-sm leading-relaxed text-foreground">
              The installer is not yet code-signed. Windows will show &ldquo;Windows protected your
              PC&rdquo;. Choose <span className="font-mono">More info → Run anyway</span>. We would
              rather tell you that here than have you meet it unexplained.
            </p>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Nexo updates itself. Later versions install on their own.
          </p>
        </FadeUp>
      </Section>

      {/* Team / Contact */}
      <Section id="contact" eyebrow="06 — Team" title="About deli.dev">
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(0,420px)]">
          <FadeUp>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              We are a small development team based in Switzerland. We design, build, and maintain
              Nexo with a focus on clarity, honest limits, and code that can be inspected.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              There is no newsletter, no analytics, and no cookie banner. The site collects nothing.
            </p>
          </FadeUp>
          <FadeUp delay={80}>
            <div className="rounded-lg border border-border bg-surface p-6">
              <h3 className="text-base font-semibold text-foreground">Get in touch</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                For questions, collaboration, or a walkthrough of the threat model, reach out on LinkedIn.
              </p>
              <a
                href={LINKEDIN}
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
                Contact on LinkedIn
              </a>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-4 px-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>deli.dev · Switzerland</p>
          <nav className="flex flex-wrap gap-6">
            <a href={REPO} className="text-accent hover:underline">
              Source repository
            </a>
            <a href={THREAT_MODEL} className="text-accent hover:underline">
              Threat model
            </a>
            <a href={LINKEDIN} className="text-accent hover:underline">
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
