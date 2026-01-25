## Contributing

Contribution guildelines

## Tech Stack

### Server

- [Node.js](https://nodejs.org)
- [`@aminnairi/rpc`](https://npmjs.com/package/@aminnairi/rpc)
- [`@aminnairi/rpc-node`](https://npmjs.com/package/@aminnairi/rpc-node)

### Client

- [React.js](https://react.dev)
- [`@aminnairi/rpc-web`](https://npmjs.com/package/@aminnairi/rpc-web)
- [`@aminnairi/react-signal`](https://npmjs.com/package/@aminnairi/react-signal)
- [`Material UI`](http://mui.com/material-ui)

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
  "cryptos": [
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
```

> [!NOTE]
> Navigate to [localhost](http://localhost) in order to explore the app.

### Stop

```bash
docker compose down --remove-orphans --volumes --timeout 0
```

### Build

```bash
docker compose -f compose.build.yml build
```

### Push

```bash
docker compose -f compose.build.yml push
```
