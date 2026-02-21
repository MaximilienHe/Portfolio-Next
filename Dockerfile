# Dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# utilisateur non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
# runtime minimal
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY package*.json ./
RUN npm ci --omit=dev
USER nextjs
EXPOSE 3000
CMD ["npx","next","start","-p","3000"]
