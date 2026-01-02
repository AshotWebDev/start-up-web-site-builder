# Базовый образ
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Установка зависимостей (с кэшированием)
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Сборка приложения
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production-образ (минимальный, использует standalone output)
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Создаём пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем только необходимое из builder (standalone mode — нужно в next.config.js добавить output: 'standalone')
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Копируем standalone папку и статические файлы
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
