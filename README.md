# hello

Self-hosted dashboard

<img style="width: 300px" src="./applications/web/public/screenshot-narrow.png" />

## Usage

### Configuration

```bash
touch settings.json
```

```json
{
  "applications": [
    {
      "name": "Excalidraw",
      "url": "https://excalidraw.com"
    },
    {
      "name": "Google Task",
      "url": "https://calendar.google.com/tasks"
    }
  ],
  "crypto": [
    {
      "name": "Bitcoin",
      "ticker": "BTC"
    },
    {
      "name": "Ethereum",
      "ticker": "ETH"
    },
    {
      "name": "Solana",
      "ticker": "SOL"
    }
  ]
}
```

### With Docker Compose

#### Requirements

- [Docker](https://docker.com/)
- [Docker Compose](https://docker.com/compose)

#### Setup

```bash
touch default.conf
```

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://hello-web:8001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://hello-server:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
touch compose.yml
```

```yaml
services:
  hello-server:
    container_name: hello-server
    restart: unless-stopped
    image: aminnairi/hello-server:0.1.0
    volumes:
      - ./settings.json:/home/node/settings.json
  hello-web:
    container_name: hello-web
    restart: unless-stopped
    image: aminnairi/hello-web:0.1.0
    depends_on:
      - hello-server
  hello-proxy:
    container_name: hello-proxy
    restart: unless-stopped
    image: nginx:1.29.4-alpine3.23
    depends_on:
      - hello-server
      - hello-client
    volumes:
      - ./default.conf:/etc/nginx/conf.d/default.conf
    ports:
      - 80:80
```

#### Start

```bash
docker compose up -d
```

### With Docker

#### Requirements

- [Docker](https://docker.com/)

#### Start the server

```bash
docker run \
  -itp 8000:8000 \
  -v ./settings.json:/home/node/settings.json \
  aminnairi/hello-server:0.1.0
```

#### Start the Web

```bash
docker run -itp 8001:8001 aminnairi/hello-web:0.1.0
```

## Development

### Requirements

- [Docker](https://docker.com/)
- [Docker Compose](https://docker.com/compose)

```json
{
  "applications": [
    {
      "name": "Excalidraw",
      "url": "https://excalidraw.com"
    },
    {
      "name": "Google Task",
      "url": "https://calendar.google.com/tasks"
    }
  ],
  "crypto": [
    {
      "name": "Bitcoin",
      "ticker": "BTC"
    },
    {
      "name": "Ethereum",
      "ticker": "ETH"
    },
    {
      "name": "Solana",
      "ticker": "SOL"
    }
  ]
}
```

### Start

```bash
docker compose up -d
docker compose exec node npm i
docker compose exec node npm -w applications/server run dev
docker compose exec node npm -w applications/web run dev
```
