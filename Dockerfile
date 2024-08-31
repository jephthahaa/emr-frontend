FROM node:20-alpine

WORKDIR /app

ARG SERVICE_MODE
ARG URL

# Copy package.json + package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

ENV NODE_ENV=production \
    NEXT_PUBLIC_API_URL=http://localhost:9000 \
    NEXT_PUBLIC_SERVICE_MODE=$SERVICE_MODE \
    NEXTAUTH_SECRET=mYVHbltlMgS5Q6sRi9RQZPGUiSS+ukRou2fzVZN5 \
    NEXTAUTH_URL=$URL
    
# Copy the rest of the application
COPY . .

RUN yarn run build

EXPOSE 3000
# Start the dev server
CMD ["yarn", "run", "start"]