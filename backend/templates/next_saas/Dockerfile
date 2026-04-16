FROM node:20-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

# ---------- deps ----------
FROM base AS deps

# копируем только package файлы
COPY package*.json ./

# стабильная установка зависимостей
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm install --omit=dev --no-audit --no-fund

# ---------- builder ----------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------- runner ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]