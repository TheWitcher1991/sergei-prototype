# Dockerfile for production mode

#
# ---------------------------------------------------------
#
FROM node:20-alpine AS base

ENV FRONTEND_DIR=/home/client \
    NGINX_DIR=/usr/share/nginx/html

#
# ---------------------------------------------------------
#
FROM base AS deps

WORKDIR $FRONTEND_DIR

COPY package*.json yarn*.lock $FRONTEND_DIR/

RUN yarn install

#
# ---------------------------------------------------------
#
FROM base AS builder

WORKDIR $FRONTEND_DIR

COPY --from=deps $FRONTEND_DIR/node_modules ./node_modules
COPY . $FRONTEND_DIR/

RUN yarn build

#
# ---------------------------------------------------------
#
FROM nginx:stable-alpine AS runner

ENV FRONTEND_DIR=/home/client \
    NGINX_DIR=/usr/share/nginx/html

WORKDIR $FRONTEND_DIR

COPY --from=builder $FRONTEND_DIR/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder $FRONTEND_DIR/build $NGINX_DIR/

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
