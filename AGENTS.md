<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop Client

Next.js 16 App Router frontend for HireLoop. Better Auth is the only backend code here; user data lives in MongoDB.

## Commands

- `npm run dev` — Turbopack dev server (default in Next 16); writes `.next/dev` and re-adds the managed block above.
- `npm run build` — Turbopack build; runs TypeScript but **not** ESLint.
- `npm run lint` — ESLint flat config. Single file: `npx eslint components/navbar.tsx`.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run format` — Prettier on `**/*.{ts,tsx}` only. For other files run `npx prettier --write <path>`.
- There is no test runner or CI. Verify with `npm run lint` and `npm run typecheck` (plus `npm run build` for routing/config changes).

## Layout

- `app/` is the App Router; there is no `src/`. `@/*` maps to the **repo root**, so `@/components/ui/button`, `@/lib/auth`, `@/app/images/logo.png`.
- `components/ui/` holds shadcn-generated primitives; `components/` holds app components. `lib/` holds auth and utils; `hooks/` is empty.
- Only `/` has a page today. Navbar links to `/jobs`, `/company`, `/pricing` are placeholders with no routes yet.
- Images live in `app/images/` and are imported (`import logo from "@/app/images/logo.png"`), not served from the empty `public/`.

## UI conventions (non-default)

- shadcn style is **base-nova on Base UI** (`@base-ui/react`), not Radix. Compose with the `render` prop (`<SheetTrigger render={<Button />}>`); there is no `asChild`. Use `nativeButton={false}` when rendering a link.
- Import `cn` from the **`cn` package** (`import { cn } from "cn"`), matching generated UI files. `lib/utils.ts` only re-exports it and is currently unused.
- Add components with `npx shadcn@latest add <name>`; they land in `components/ui/`.
- Tailwind is **v4 and CSS-first**: no `tailwind.config.*`. Theme tokens and the radius scale live in `app/globals.css` (`@theme inline`, `.dark`).
- The landing UI mixes theme tokens with hard-coded brand hexes (`#010103` page, `#1A1A1F` surface, `#5C53FE` accent, `#EDEDEF` text). Match nearby styles instead of re-theming.
- Prettier: no semicolons, double quotes, 80 columns, Tailwind class sorting for `cn`/`cva`.

## Auth and data

- `lib/auth.ts` configures Better Auth (email/password, Google, Mongo adapter); `app/api/auth/[...all]/route.ts` mounts it via `toNextJsHandler`.
- MongoDB is hardcoded to `mongodb://localhost:27017` and DB `hireloop` (`client.db("hireloop")` overrides the URL path). Auth needs a local `mongod`; there is no fallback.
- `.env` is gitignored and must supply `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. Google login also needs `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`; without them the build warns `Social provider google is missing clientId or clientSecret` and Google sign-in fails.
- Only `NEXT_PUBLIC_*` vars reach client bundles. `lib/auth-client.ts` passes `BETTER_AUTH_URL` to `createAuthClient`, so it is effectively same-origin in the browser. That file also exports `signIn`/`signUp`/`useSession` from a second, unconfigured `createAuthClient()`; prefer `authClient.*`.

## Next.js 16 gotchas

- `next lint` was removed; lint is a separate ESLint run. The middleware convention is now `proxy.ts` (Node runtime), not `middleware.ts`.
- `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are async-only. Route type helpers (`PageProps<'/route'>`, `LayoutProps<'/route'>`) come from `npx next typegen`.
- APIs have changed from older training data (e.g. `revalidateTag(tag)` now requires a cache-life profile argument). Read the version-matched guide in `node_modules/next/dist/docs/` before using unfamiliar Next APIs.
- `next dev` and `next build` can run concurrently; dev output is `.next/dev`, build output is `.next`.
