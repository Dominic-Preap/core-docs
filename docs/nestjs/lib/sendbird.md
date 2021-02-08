---
id: sendbird
title: 'Sendbird'
sidebar_label: '🐦 Sendbird'
---

`@lib/sendbird` is wrapper module based on [Sendbird API](https://sendbird.com/docs/chat/v3/platform-api/getting-started/prepare-to-use-api).

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
>(*) SendBird
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
# Optional, if you want to use Sendbird upload API
yarn add form-data
```

Then, make copy of `src/lib/sendbird` to your project.

```bash
•
├─ 📁sendbird
│   ├─ 📁...                     # Contain Sendbird sub API
│   ├─ 📄sendbird.constant.ts    # Contain provider tokens
│   ├─ 📄sendbird.decorator.ts   # Contain dependency injections
│   ├─ 📄sendbird.dto.ts         # Contain ENV configuration
│   ├─ 📄sendbird.helper.ts      # Contain Helper function
│   ├─ 📄sendbird.module.ts      # Contain declaring module
│   ├─ 📄sendbird.provider.ts    # Contain service providers
│   ├─ 📄sendbird.ts             # Contain Sendbird service
│   └─ 📄index.ts                # Contain exposing API
```

Next, import `SendBirdModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { SendBirdModule } from '@lib/sendbird';

@Module({
  imports: [ConfigModule, SendBirdModule]
})
export class ApplicationModule {}
```

## Environment Variables

`SendBirdModule` comes with three pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `sendbird.dto.ts` and update the code in `sendbird.ts`.

```bash title=".env.example"
# Sendbird Credential
SENDBIRD_APP_ID=
SENDBIRD_API_TOKEN=
SENDBIRD_AUTHORIZATION=
```

## Basic Usage

You can use `@InjectSendBird()` to inject `SendBird` into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectSendBird, SendBird } from '@lib/sendbird';

@Injectable()
export class ExampleService {
  constructor(@InjectSendBird() private readonly sendbird: SendBird) {}
}
```

We also provide `@UseSendBirdWebhookGuard()` for authenticate the Sendbird Webhook API.

```ts title="example.controller.ts"
import { Controller, Post } from '@nestjs/common';
import { UseSendBirdWebhookGuard } from '@lib/sendbird';

@Controller('example')
export class ExampleService {
  @Post('webhook')
  @UseSendBirdWebhookGuard()
  webhook() {
    // Do your stuff...
  }
}
```

## API

### `SendBirdModule`

### `SendBird`

### `@InjectSendBird()`

### `@UseSendBirdWebhookGuard()`
