# 👋 Hello

Minimalist self-hosted dashboard

[![License](https://img.shields.io/github/license/aminnairi/hello)](./LICENSE) [![Web Container](https://badgen.net/badge/container/hello-web:0.1.0/blue?icon=github)](https://github.com/aminnairi/hello/pkgs/container/hello-web) [![Web Container](https://badgen.net/badge/container/hello-server:0.1.0/blue?icon=github)](https://github.com/aminnairi/hello/pkgs/container/hello-server)

<img style="width: 50%; margin: 10px auto; display: inline-block;" src="./applications/web/public/screenshot-narrow-dark.png" /><img style="width: 50%; margin: 10px auto; display: inline-block;" src="./applications/web/public/screenshot-narrow-light.png" />

## Features

- Configurable: display apps, cryptos, stocks & weather
- Installable: made as a Web App for being installed either on desktop or mobile
- Search for apps, stocks & cryptos
- Fallback to using Google when no matching apps/stocks/cryptos
- Light & Dark theme based on the user's operating system preferences
- Haptic feedback when suported by the device
- Animations when fetching datas
- Responsive for all devices (smartphone, tablet, desktop)
- Containerized for ease of deployment
- Free forever

## Usage

### Requirements

- [Docker](https://docker.com/)
- [Docker Compose](https://docker.com/compose)

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
  ],
  "openweathermap": {
    "apiKey": "39f89...",
    "city": "Paris",
    "language": "fr"
  }
}
```

> [!TIP]
> You'll need to restart the containers before applying any update to the configuration above.

### Proxy Setup

```bash
touch default.conf
```

```nginx
server {
    listen 80;
    server_name 127.0.0.1 localhost your.domain.com;

    location / {
        proxy_pass http://hello-web:8001/;
    }

    location /api/ {
        proxy_pass http://hello-server:8000/;
    }
}
```

> [!NOTE]
> You can use any reverse proxy of your choice for this part.

### Docker Compose Setup

```bash
touch compose.yml
```

```yaml
services:
  hello-server:
    container_name: hello-server
    restart: unless-stopped
    image: ghcr.io/aminnairi/hello-server:0.1.0
    volumes:
      - ./settings.json:/home/node/settings.json
  hello-web:
    container_name: hello-web
    restart: unless-stopped
    image: ghcr.io/aminnairi/hello-web:0.1.0
    depends_on:
      - hello-server
  hello-proxy:
    container_name: hello-proxy
    restart: unless-stopped
    image: nginx:1.29.4-alpine3.23
    depends_on:
      - hello-server
      - hello-web
    volumes:
      - ./default.conf:/etc/nginx/conf.d/default.conf
    ports:
      - 80:80
```

> [!WARNING]
> If you have decided to use a different reverse proxy, you'll have to update your `compose.yml` file as well.

### Start

```bash
docker compose up -d
```

> [!TIP]
> It is highly recommended to run `docker compose logs` in order to see if any errors have occurred.

### Stop

```bash
docker compose down --remove-orphans --volumes --timeout 0
```

> [!NOTE]
> This won't remove any bind mount, only logical volumes if any are unused or orphans

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## LICENSE

See [`LICENSE`](./LICENSE).

## Security

See [`SECURITY.md`](./SECURITY.md).

## Issue

See [`issues`](./issues).
