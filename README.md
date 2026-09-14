# Brian Griffey's personal website

## Technology
It's completely written and maintained by Claude Code. It's a playground for me to try new multi-agent strategies and build tools.

This web site is built on NextJS 15 in standalone mode, and is self-hosted on `server1` as a rootless Podman container behind a Cloudflare Tunnel.

## Development

### Local Development
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to view the site.

### Building for Production
```bash
npm run build
```

The standalone build will be generated in the `.next/standalone/` directory.

## Docker Deployment

Production uses a multi-stage build:
- **Build stage**: Node.js 20 Alpine for compiling Next.js
- **Runtime stage**: Node.js 20 Alpine running Next.js standalone server

### Building Docker Image
```bash
docker build -t personalsite .
```

### Running Docker Container Locally
```bash
# Run on port 3000
docker run -p 3000:3000 personalsite

# Visit http://localhost:3000
```

### Docker Configuration Files
- `Dockerfile` - Multi-stage build configuration
- `.dockerignore` - Excludes unnecessary files from build context


## Deployment

Self-hosted on `server1`, managed from the `wintermute` repo. That repo holds the
deployment manifest; this one stays the source of truth for the site itself.

```bash
bin/wm deploy personal-site     # run from the wintermute repo
```

It checks this repository out, builds with the `Dockerfile` here, tags the image with
this repo's commit sha, restarts the container, health-checks `/api/health`, and rolls
back automatically if that check fails.

To ship a change: push to `main` here, then run the deploy.

### Runtime
- The container listens on `$PORT` (3000) and binds `$HOSTNAME` (0.0.0.0). Both are
  set by the deployment manifest — the `ENV` lines in this Dockerfile's builder stage
  are **not** inherited by the runtime stage, and a Next standalone server that
  defaults to binding localhost is unreachable from outside its own container.
- It binds `127.0.0.1` on the host. A Cloudflare Tunnel is the only ingress; no
  inbound port is open.

### Environment Variables
None required. Add them to the deployment manifest's `env` table, not to an image.

## Build Optimizations
- ESLint and TypeScript checking disabled during Docker builds (run in CI/CD instead)
- Multi-stage build keeps production image size minimal
- Next.js standalone mode includes only necessary dependencies
- Built-in Next.js optimizations for caching and compression  
