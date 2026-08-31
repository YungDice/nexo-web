# Nexo Messenger

Build a single-page marketing site for Nexo, an open-source end-to-end encrypted messenger for Windows.

Stack: React + Vite + Tailwind. Static, no backend, no forms, no analytics, no cookie banner — it collects nothing, so it needs none of that.

Voice

Plain, precise, quietly confident. This is a security product for people who read carefully. No marketing superlatives — no "revolutionary", "military-grade", "unhackable", "bank-level". No stock photos of padlocks or hooded figures. State facts and let them be the argument. Where something isn't private, say so plainly on the page; that candour is the pitch.

Design

Dark by default, light mode via prefers-color-scheme. One neutral grey scale plus one violet accent, used only for the primary action, links, and the active state. Everything else is greyscale.

--surface-0: #0e0e10   page
--surface-1: #131315   cards
--text-hi:   #f2f2f4   headings
--text-lo:   #7d7d86   secondary
--accent:    hsl(255 93% 67%)
--accent-soft: hsl(255 100% 78%)


Inter for everything, JetBrains Mono for code and the safety-number sample. Generous whitespace, ~1100px max content width, restrained motion — a subtle fade-up on scroll and nothing else. It should feel like a well-set technical document, not a SaaS landing page.

Sections

1. Hero. Wordmark "Nexo" (large, tight tracking, a violet full stop after it). Headline: An end-to-end encrypted messenger for Windows. Sub: Messages are encrypted with MLS. The feed is not, and Nexo says so. Primary button Download for Windows → https://github.com/YungDice/nexo/releases/latest. Secondary ghost button View source → https://github.com/YungDice/nexo. Small line beneath: Windows 10 1809+ · MIT licensed · No phone number required.

2. What it does. Four cards, icon + heading + two sentences:

Private conversations — End-to-end encrypted with MLS (RFC 9420) via OpenMLS. The server stores and forwards ciphertext it cannot read.

A public feed — Posts, images, links, votes and threaded comments, visible to anyone signed in.

Handles, not phone numbers — Accounts are a handle and a password. Nexo never asks for a phone number or an email address.

Local storage is encrypted — History lives in a SQLCipher database whose key is held by Windows for your account alone.

3. "What Nexo does not protect" — the most important section on the page. Give it equal visual weight to the section above; do not tuck it away. Intro: Every messenger has limits. Most do not list them. Then four plain items:

The feed is not end-to-end encrypted. Posts and profiles are readable by the server and public to anyone signed in. Content written for strangers cannot also be encrypted to a closed group.

Conversation metadata is visible. Who talks to whom, when, and message sizes. That is the honest limit of the design.

One device per account. Signing in elsewhere signs this machine out and wipes its local history.

There is no account recovery. Forget your password and the account is gone. That is what holding no recovery key means.

4. How the encryption works. Three short technical points with a monospace sample of a safety number (twelve groups of five digits, e.g. 48210 93117 60482 ...). Explain that identity keys are Ed25519, that a safety number is a fingerprint over both parties' keys, and that Nexo warns you when a contact's key changes so the comparison stays meaningful.

5. Download. Repeat the button. Below it, in a bordered note, exactly this — do not soften it:

The installer is not yet code-signed. Windows will show "Windows protected your PC". Choose More info → Run anyway. We would rather tell you that here than have you meet it unexplained.

Add: Nexo updates itself. Later versions install on their own.

6. Footer. MIT licence, link to the repo, link to the threat model at https://github.com/YungDice/nexo/blob/main/docs/THREAT-MODEL.md. No newsletter, no social icons.

Constraints

Accessible: 4.5:1 contrast minimum, real focus rings, semantic headings. Fully responsive down to 360px. Respect prefers-reduced-motion. No external requests beyond a font CDN — no trackers, no embeds.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7c322c95-a709-4c1e-a7a6-33af7faf60f1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
