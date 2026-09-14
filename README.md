# Brian Griffey's personal website

**One page.** `index.html` is the entire site: a self-contained bundle that carries its
own scripts and fonts inline and unpacks them in the browser.

Self-hosted on `server1` as a rootless Podman container behind a Cloudflare Tunnel.
Serves `briangriffey.com` and `www.briangriffey.com`.

## Deploy

Deployment lives in the `wintermute` repo, which holds the manifest:

```bash
bin/wm deploy personal-site      # run from ~/code/wintermute
```

Replace `index.html`, push to `main`, run the deploy. There is no build step.

## What happened to the old site

Until 2026-09-14 this was a Next.js application with `/about`, `/blog`, `/projects`
and `/contact`. It was replaced wholesale by the single page above.

Nothing is lost — the full application is in this repository's history, at commit
`71d98d6` and earlier. `git log --follow` any file to read it back.

Two things were kept in the working tree deliberately rather than left only in history:

- `content/blog/` — two posts. **These are no longer served by the site.** They are
  prose rather than code, and prose should not need archaeology to find.
- `prds/` — product notes.

**`/blog`, `/about`, `/projects` and `/contact` no longer exist as routes.** Any link
to them now lands on the homepage rather than a 404, which is the kinder failure, but
they are not the pages they were.

## Requires JavaScript

The page renders client-side from an inlined bundle. With JavaScript disabled it shows
a short notice and nothing else, and crawlers that do not execute JavaScript will see
the same. That is a property of the file, noted here so it is a known trade rather
than a surprise.
