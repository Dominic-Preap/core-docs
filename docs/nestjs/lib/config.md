---
id: config
title: 'Configuration'
sidebar_label: 'Configuration'
---

`@lib/config` is one of the most important built-in modules. It validates your `.env` params that required for a specific module. If the env is missing or wrong input, the app cannot be started. It is mostly used for another built-in modules, but you can also inject it into your module if you wish.

The logic of Config Module is pretty similar to [Configuration](https://docs.nestjs.com/techniques/configuration) from the official [NestJS](https://docs.nestjs.com/) but extend a `validate` function.

## Quick Setup

### Using Scaffolding CLI

`@lib/config` will add automatically when run scaffolding new project.

```bash
yarn generate
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add @nestjs/config
```

Then, make copy of `src/lib/config` to your project.

```bash
•
├─ 📁config
│   ├─ 📄config.dto.ts         # Contain default env (NODE_ENV, PORT, JWT_SECRET)
│   ├─ 📄config.module.ts      # Contain declaring module
│   ├─ 📄config.service.ts     # Contain service providers
│   └─ 📄index.ts              # Contain exposing API
```

Next, import `ConfigModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';

@Module({
  imports: [ConfigModule]
})
export class ApplicationModule {}
```

## Environment Variables

`ConfigModule` comes with a few pre-defined env in `.env.example`. But we can customize by making change in `config.dto.ts`.

```bash title=".env.example"
# Application (development, production)
NODE_ENV=
PORT=
JWT_SECRET=
```

## Basic Usage

We can import `ConfigService` directly into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@lib/config';

@Injectable()
export class ExampleService {
  constructor(private readonly config: ConfigService) {}

  async doSomething() {
    /* Do Stuff... */
  }
}
```

## API

### `ConfigModule`

### `ConfigService`

- `env`
- `get(key: string)`
- `validate(module: string, className: new () => T)`
