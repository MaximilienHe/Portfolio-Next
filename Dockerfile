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
ARG TARGETARCH
RUN if [ "$TARGETARCH" = "arm64" ]; then \
      echo "Skipping CV generation on arm64 build"; \
      node scripts/generate-version.mjs && npx next build; \
    else \
      npm run build; \
    fi

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# utilisateur non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
# runtime minimal
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY package*.json ./
RUN npm ci --omit=dev && \
    mkdir -p .next/cache/images .next/cache/fetch-cache && \
    chown -R nextjs:nodejs .next
USER nextjs
EXPOSE 3000
CMD ["node","node_modules/next/dist/bin/next","start","-p","3000"]
