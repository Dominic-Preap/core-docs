---
id: wowza
title: 'Wowza'
sidebar_label: '🎞 Wowza'
---

`@lib/wowza` is wrapper module based on [Wowza API](https://www.wowza.com/docs/wowza-developer-apis-and-sdks).

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
>(*) Wowza
 ...
```

### Manual Setup (Alt.)

First, make copy of `src/lib/wowza` to your project.

```bash
•
├─ 📁wowza
│   ├─ 📁...                  # Contain Wowza sub API
│   ├─ 📄wowza.constant.ts    # Contain provider tokens
│   ├─ 📄wowza.decorator.ts   # Contain dependency injections
│   ├─ 📄wowza.dto.ts         # Contain ENV configuration
│   ├─ 📄wowza.helper.ts      # Contain Helper function
│   ├─ 📄wowza.module.ts      # Contain declaring module
│   ├─ 📄wowza.provider.ts    # Contain service providers
│   ├─ 📄wowza.ts             # Contain Wowza service
│   └─ 📄index.ts             # Contain exposing API
```

Next, import `WowzaModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { WowzaModule } from '@lib/wowza';

@Module({
  imports: [ConfigModule, WowzaModule]
})
export class ApplicationModule {}
```

## Environment Variables

`WowzaModule` comes with two pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `wowza.dto.ts` and update the code in `wowza.ts`.

```bash title=".env.example"
# Wowza
WOWZA_API_KEY=
WOWZA_ACCESS_KEY=
```

## Basic Usage

You can use `@InjectSendBird()` to inject `SendBird` into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectWowza, Wowza } from '@lib/sendbird';

@Injectable()
export class ExampleService {
  constructor(@InjectWowza() private readonly wowza: Wowza) {}
}
```

## API

### `WowzaModule`

### `Wowza`

### `@InjectWowza()`
