---
id: jwt
title: 'JSON Web Token'
sidebar_label: '💳 JSON Web Token'
---

`@lib/jwt` is pretty much the same as [@nestjs/jwt](https://github.com/nestjs/jwt) from the official [NestJS](https://docs.nestjs.com/) but just a pre-defined version.

:::info
This module required `@lib/config` in order to work properly. To learn more, see [here](/docs/nestjs/lib/config).
:::

## Quick Setup

### Using Scaffolding CLI

`@lib/jwt` will add automatically when run scaffolding new project.

```bash
yarn generate
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add @nestjs/jwt
```

Then, make copy of `src/lib/jwt` to your project.

```bash
•
├─ 📁jwt
│   ├─ 📄jwt.module.ts      # Contain declaring module
│   └─ 📄index.ts           # Contain exposing API
```

Next, import `JwtModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { JwtModule } from '@lib/jwt';

@Module({
  imports: [ConfigModule, JwtModule]
})
export class ApplicationModule {}
```

## Environment Variables

`JWTModule` comes with a pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `config.dto.ts` and update the code in `jwt.module.ts`.

```bash title=".env.example"
JWT_SECRET=
```

## Basic Usage

The usage are in the official documentation on the [Authentication](https://docs.nestjs.com/security/authentication#jwt-functionality) section

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ExampleService {
  constructor(private jwtService: JwtService) {}
}
```

## API

### `JwtModule`
