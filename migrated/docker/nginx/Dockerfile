FROM node:18.20-alpine AS frontend-builder

WORKDIR /app

COPY migrated-frontend/package.json migrated-frontend/package-lock.json ./
RUN npm ci

COPY migrated-frontend/ ./
RUN npm run build

FROM nginx:1.27.4-alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY docker/nginx/nginx.conf /etc/nginx/conf.d/proquip.conf

COPY --from=frontend-builder /app/dist/proquip/browser /usr/share/nginx/html/proquip

RUN echo '{"status":"ok"}' > /usr/share/nginx/html/proquip/health.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
