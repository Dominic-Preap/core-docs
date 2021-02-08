---
id: auth0
title: 'Auth0'
sidebar_label: '🔑 Auth0'
---

`@lib/auth0` is wrapper module based on [Auth0](https://www.npmjs.com/package/auth0) that contain Auth0 Guard and Authentication Client.

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
>(*) Auth0
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add @nestjs/passport passport passport-jwt jwks-rsa auth0
yarn add @types/passport-jwt @types/auth0 -D
```

Then, make copy of `src/lib/auth0` to your project.

```bash
•
├─ 📁auth0
│   ├─ 📄auth0.constant.ts    # Contain provider tokens
│   ├─ 📄auth0.decorator.ts   # Contain dependency injections
│   ├─ 📄auth0.dto.ts         # Contain ENV configuration
│   ├─ 📄auth0.module.ts      # Contain declaring module
│   ├─ 📄auth0.provider.ts    # Contain service providers
│   ├─ 📄auth0.strategy.ts    # Contain auth0 passport strategy
│   └─ 📄index.ts             # Contain exposing API
```

Next, import `Auth0Module` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { Auth0Module } from '@lib/auth0';

@Module({
  imports: [ConfigModule, Auth0Module]
})
export class ApplicationModule {}
```

## Environment Variables

`Auth0Module` comes with several pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `auth0.dto.ts` and update the code in `auth0.provider.ts`.

```bash title=".env.example"
# Auth0
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```

## Basic Usage

### Auth0 Guard

To use Auth0 Guard, create a new Guard Class call `Auth0Guard` and extend Auth0 passport strategy name. You can follow the example in file `auth0.guard.ts` locate in `src/api/auth`.

```ts title="auth0.guard.ts"
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

import { AUTH0_STRATEGY_NAME } from '@lib/auth0';

@Injectable()
export class Auth0Guard extends PassportAuthGuard(AUTH0_STRATEGY_NAME) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {}
}
```

And don't forget to import your `Auth0Guard` into your module, for example `AuthModule`.

```ts title="auth.module.ts"
import { Module } from '@nestjs/common';
import { Auth0Guard } from './auth0.guard';

@Module({
  providers: [Auth0Guard]
})
export class AuthModule {}
```

To use `Auth0Guard` globally, update `app.useGlobalGuards()` in `main.ts`.

```ts title="main.ts"
async function bootstrap() {
  // ...
  const auth0Guard = app.select(AuthModule).get(Auth0Guard);
  app.useGlobalGuards(auth0Guard);
  // ...
}
```

### Auth0 Client

You can use `@InjectAuth0ManagementClient()` to inject `ManagementClient` of Auth0 into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';

import { InjectAuth0ManagementClient } from '@lib/auth0';

@Injectable()
export class ExampleService {
  constructor(
    @InjectAuth0ManagementClient() private readonly auth0: ManagementClient
  ) {}
}
```

## API

### `AUTH0_STRATEGY_NAME`

### `Auth0Module`

### `@InjectAuth0ManagementClient()`

### `@Auth0User()`

### `Auth0Payload`
