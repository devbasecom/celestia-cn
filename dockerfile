FROM --platform=${TARGETPLATFORM} node:20 as builder

COPY . /app

WORKDIR /app

RUN yarn install && \
    yarn docs:build


FROM nginx:stable-alpine3.17-slim

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/doc/.vitepress/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]