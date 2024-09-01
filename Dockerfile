FROM oven/bun:latest AS builder

WORKDIR /app

COPY package*.json ./

# RUN bun install --production
RUN bun install

COPY . .

ARG SERVICE_MODE
ARG URL

ENV NODE_ENV=production \
    NEXT_PUBLIC_API_URL=http://localhost:9000 \
    NEXT_PUBLIC_SERVICE_MODE=$SERVICE_MODE \
    NEXTAUTH_SECRET=mYVHbltlMgS5Q6sRi9RQZPGUiSS+ukRou2fzVZN5 \
    NEXTAUTH_URL=$URL


FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_PUBLIC_API_URL=http://localhost:9000 \
    NEXT_PUBLIC_SERVICE_MODE=$SERVICE_MODE \
    NEXTAUTH_SECRET=mYVHbltlMgS5Q6sRi9RQZPGUiSS+ukRou2fzVZN5 \
    NEXTAUTH_URL=$URL

COPY --from=builder /app/ ./

RUN npm run build
# # COPY --from=builder /app/package.json ./package.json
# # COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/static ./.next/static

CMD ["echo", "$(env)"]

CMD ["npm", "start"]
