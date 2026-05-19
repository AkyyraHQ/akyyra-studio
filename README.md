# Akyyra Studio

Akyyra is an AI-powered YouTube automation platform focused on upload automation: upload a video, generate metadata, and publish or schedule to YouTube.

## Prerequisites
- Node.js 20+
- pnpm 9+
- Docker Desktop (for Postgres and Redis)

## Getting Started
1. Copy environment file: `cp .env.example .env`
2. Install dependencies: `pnpm install`
3. Start infrastructure: `docker compose up -d`
4. Start dev servers: `pnpm dev`

## Scripts
- `pnpm dev` - run all apps
- `pnpm build` - build all apps
- `pnpm lint` - lint all apps
- `pnpm typecheck` - typecheck all apps

## Services
- Web: Nuxt 3 app in `apps/web`
- API: Fastify app in `apps/api`
- Postgres and Redis via Docker Compose
