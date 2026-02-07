# Brian Griffey's personal website

## Technology
It's completely written and maintained by Claude Code. It's a playground for me to try new multi-agent strategies and build tools.

This web site is built on NextJS 15 and deployed to Railway. It uses static site generation for all of its content.

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

The static site will be generated in the `out/` directory.

## Docker Deployment

This project uses Docker for production deployment to Railway with a multi-stage build:
- **Build stage**: Node.js 20 Alpine for compiling Next.js
- **Runtime stage**: nginx Alpine for serving static files (~94MB total)

### Building Docker Image
```bash
docker build -t personalsite .
```

### Running Docker Container Locally
```bash
# Run on port 8080
docker run -p 8080:80 personalsite

# Visit http://localhost:8080
```

### Docker Configuration Files
- `Dockerfile` - Multi-stage build configuration
- `.dockerignore` - Excludes unnecessary files from build context
- `nginx.conf` - Production nginx configuration with gzip, caching, and security headers
- `railway.json` - Railway deployment configuration

### Health Check
The container includes a health check endpoint at `/health` that returns `OK`.

## Railway Deployment

Railway automatically detects and builds from the `Dockerfile`. The build process:
1. Installs dependencies with `npm ci`
2. Builds static site with `npm run build`
3. Copies static files to nginx
4. Serves on port 80 (Railway maps to public URL)

### Environment Variables
Currently no environment variables are required. For future additions, update:
- `next.config.ts` for build-time variables
- `railway.json` for deployment configuration

### Port Configuration
- Container exposes port 80 (nginx default)
- Railway automatically maps to public HTTPS endpoint
- Local testing uses port 8080 (`-p 8080:80`)

## Build Optimizations
- ESLint and TypeScript checking disabled during Docker builds (run in CI/CD instead)
- Multi-stage build reduces final image size to ~94MB
- nginx configured with gzip compression for faster load times
- Static assets cached with 1-year expiry headers  
