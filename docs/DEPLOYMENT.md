# Deploy

## Build de Produção

```bash
npm run build
```

O output será gerado na pasta `dist/`.

## Variáveis de Ambiente para Produção

```env
VITE_API_URL=https://api.seudominio.com
VITE_APP_NAME=Fuel Station
VITE_APP_VERSION=1.0.0
```

## Nginx

```nginx
server {
    listen 80;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8080;
    }
}
```

## Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
