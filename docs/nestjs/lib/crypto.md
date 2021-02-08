---
id: crypto
title: 'Crypto'
sidebar_label: '🔐 Crypto'
---

`@lib/crypto` is a minimalist module for cryptography. We only have a few methods but you can add on if you wish.

## Quick Setup

### Using Scaffolding CLI

`@lib/crypto` will add automatically when run scaffolding new project.

```bash
yarn generate
```

### Manual Setup (Alt.)

Make copy of `src/lib/crypto` to your project.

```bash
•
├─ 📁crypto
│   ├─ 📄crypto.dto.ts         # Contain default env
│   ├─ 📄crypto.module.ts      # Contain declaring module
│   ├─ 📄crypto.provider.ts    # Contain service provider
│   ├─ 📄crypto.service.ts     # Contain service providers
│   └─ 📄index.ts              # Contain exposing API
```

Next, import `CryptoModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { CryptoModule } from '@lib/crypto';

@Module({
  imports: [ConfigModule, CryptoModule]
})
export class ApplicationModule {}
```

## Environment Variables

`CryptoModule` comes with a pre-defined env in `.env.example`. But we can customize by making change in `crypto.dto.ts`.

```bash title=".env.example"
# Crypto
CRYPTO_ENCRYPTION_KEY=
```

## Basic Usage

We can import `CryptoService` directly into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { CryptoService } from '@lib/crypto';

@Injectable()
export class ExampleService {
  constructor(private readonly crypto: CryptoService) {}
}
```

## API

### `CryptoModule`

### `CryptoService`

- `encrypt`
- `decrypt`
- `createMD5Hex`
