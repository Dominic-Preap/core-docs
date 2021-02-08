---
id: tile38
title: 'Tile38'
sidebar_label: '🗺️ Tile38'
---

`@lib/tile38` is wrapper module based on [Tile38](https://tile38.com/).

:::info
This module required `@lib/config` in order to work properly. To learn more, see [here](/docs/nestjs/lib/config).
:::

## Quick Setup

### Using Scaffolding CLI

```bash
yarn generate
```

```bash
? Choose the Main Libraries (Press <space> to select, <a> to toggle all, <i> to invert selection)
 ...
>(*) Tile38
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add ioredis
yarn add @types/ioredis -D
```

Then, make copy of `src/lib/tile38` to your project.

```bash
•
├─ 📁tile38
│   ├─ 📄tile38.constant.ts    # Contain provider tokens
│   ├─ 📄tile38.decorator.ts   # Contain dependency injections
│   ├─ 📄tile38.dto.ts         # Contain ENV configuration
│   ├─ 📄tile38.interfaces.ts  # Contain tile38 API interfaces
│   ├─ 📄tile38.module.ts      # Contain declaring module
│   ├─ 📄tile38.provider.ts    # Contain service providers
│   ├─ 📄tile38.ts             # Contain tile38 API
│   └─ 📄index.ts              # Contain exposing API
```

Next, import `Tile38Module` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { Tile38Module } from '@lib/tile38';

@Module({
  imports: [ConfigModule, Tile38Module]
})
export class ApplicationModule {}
```

## Environment Variables

`Tile38Module` comes with three pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `tile38.dto.ts` and update the code in `tile38.provider.ts`.

```bash title=".env.example"
# Redis Credential
TILE38_HOST=
TILE38_PORT=
TILE38_AUTH_PASS=
```

## Basic Usage

You can use `@InjectTile38()` to inject `Tile38` into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectTile38, Tile38 } from '@lib/tile38';

@Injectable()
export class ExampleService {
  constructor(@InjectTile38() private readonly tile38: Tile38) {
    this.tile38.subscribe(['warehouse3'], (channel, data) => {
      console.log(`Channel: ${channel}, Data: ${data}`);
    });
  }

  getTruck(id: string) {
    return this.tile38.get({ id, key: 'fleet', withFields: true });
  }
}
```

## API

### `Tile38Module`

### `Tile38`

### `@InjectTile38()`
