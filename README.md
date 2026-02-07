# Brian Griffey's personal website

## Technology
It's completely written and maintained by Claude Code. It's a playground for me to try new multi-agent strategies and build tools.

This web site is built on NextJS 15 and deployed to Railway using standalone mode for optimized production deployment.

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

This project uses Docker for production deployment to Railway with a multi-stage build:
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


## Railway Deployment

Railway automatically detects and builds from the `Dockerfile`. The build process:
1. Installs dependencies with `npm ci`
2. Builds Next.js application with `npm run build` in standalone mode
3. Copies standalone build to production image
4. Serves with Next.js server on port 3000 (Railway maps to public URL)

### Environment Variables
Currently no environment variables are required. For future additions, update:
- `next.config.ts` for build-time variables
- `railway.json` for deployment configuration

### Port Configuration
- Container exposes port 3000 (Next.js default)
- Railway automatically maps to public HTTPS endpoint
- Local testing: `docker run -p 3000:3000 <image>`

## Build Optimizations
- ESLint and TypeScript checking disabled during Docker builds (run in CI/CD instead)
- Multi-stage build keeps production image size minimal
- Next.js standalone mode includes only necessary dependencies
- Built-in Next.js optimizations for caching and compression  
