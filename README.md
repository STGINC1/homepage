# Samarkand Transport Group website

Marketing site for Samarkand Transport Group Inc (USDOT 3986498), Mason, OH.

Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4. Every page is
prerendered as static HTML.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
npm test           # unit tests (vitest)
npm run lint
```

## Set up before going live

Copy `.env.example` to `.env.local` (or set the same variables in your host):

| Variable | Why |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your real domain. Used for canonical URLs, sitemap and social previews. |
| `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` | Sends quote-form requests by email through [Resend](https://resend.com). Until set, the form asks visitors to call. |

## Where things live

| Path | What |
| --- | --- |
| `src/lib/site.ts` | Company facts: name, phone, address, USDOT/MC. Change them here only. |
| `src/lib/content.ts` | Services, process steps, reasons, FAQ copy. |
| `src/app/*/page.tsx` | Pages: home, services, about, careers, contact. |
| `src/app/motion.css` | All animation. Scroll effects use CSS scroll-driven animations (no JS). |
| `src/components/hero/hero.tsx` | Full-screen photo hero: load zoom, scroll push-in, line-by-line headline. |
| `src/assets/hero-truck-dusk.jpg` | Hero photo. Replace this file with your own truck photo any time (keep the name). |
| `src/app/contact/actions.ts` | Quote form server action: validation, spam honeypot, rate limit. |
| `src/components/apply/application-embed.tsx` | Driver application (Zeus white-label form) shown inside `/apply`. |
| `src/components/scroll-effects.tsx` | Scroll-effect backup for browsers without CSS scroll animations. |

## Driver application (Zeus white-label)

`/apply` shows the Zeus application (`APPLY_URL` in `src/lib/site.ts`) inside the
page. Every hour the site checks Zeus's `frame-ancestors` header: if Zeus allows
stgincs.com the form is embedded; if not, a "Start your application" card links
to it instead. Nothing needs to change here once Zeus allows the domain.

## Animation rule of thumb

Never put `overflow: hidden` on a container with scroll-animated children
(`.reveal*`, `.story`, `.band-row-*`): it turns the container into its own
scroll box and freezes the animation. Use `overflow-clip` instead.

## Performance and accessibility

- Scroll effects run in CSS on the compositor; browsers without support get a
  small IntersectionObserver fallback.
- `prefers-reduced-motion` turns animation off.
- The hero photo is served as AVIF/WebP at each screen size (about 7 KB on phones, 51 KB at 1920px). Map and icons are inline SVG.
- Lighthouse (mobile, home page): Performance 94, Accessibility 100, Best Practices 100, SEO 100.

## Credits

Hero photo: "Trucks drive on a highway at sunset" by Vitalii Onyshchuk on
[Unsplash](https://unsplash.com/photos/trucks-drive-on-a-highway-at-sunset-qms-kprAgJM),
used under the Unsplash License (free for commercial use, no attribution required).
