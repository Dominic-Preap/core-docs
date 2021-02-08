---
id: twilio
title: 'Twilio'
sidebar_label: '📞 Twilio'
---

`@lib/twilio` is wrapper module based on [Twilio](https://www.npmjs.com/package/twilio).

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
>(*) Twilio
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add twilio
```

Then, make copy of `src/lib/twilio` to your project.

```bash
•
├─ 📁twilio
│   ├─ 📄twilio.constant.ts    # Contain provider tokens
│   ├─ 📄twilio.decorator.ts   # Contain dependency injections
│   ├─ 📄twilio.dto.ts         # Contain ENV configuration
│   ├─ 📄twilio.module.ts      # Contain declaring module
│   ├─ 📄twilio.provider.ts    # Contain service providers
│   ├─ 📄twilio.ts             # Contain twilio API
│   └─ 📄index.ts              # Contain exposing API
```

Next, import `TwilioModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { TwilioModule } from '@lib/twilio';

@Module({
  imports: [ConfigModule, TwilioModule]
})
export class ApplicationModule {}
```

## Environment Variables

`TwilioModule` comes with three pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `twilio.dto.ts` and update the code in `twilio.ts`.

```bash title=".env.example"
# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_SMS_FROM=
```

## Basic Usage

You can use `@InjectTwilio()` to inject `TwilioLib` into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioLib } from '@lib/📄twilio';

@Injectable()
export class ExampleService {
  constructor(@InjectTwilio() private readonly twilio: TwilioLib) {}
}
```

## API

### `TwilioModule`

### `TwilioLib`

### `@InjectTwilio()`
