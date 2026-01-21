## Contributing

Contribution guildelines

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
```

> [!NOTE]
> Navigate to [localhost](http://localhost) in order to explore the app.
