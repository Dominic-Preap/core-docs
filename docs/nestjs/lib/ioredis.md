---
id: ioredis
title: 'IORedis'
sidebar_label: 'IORedis'
---

`@lib/ioredis` is wrapper module based on [ioredis](https://github.com/luin/ioredis). It also provides pub/sub feature mostly [notifications for a reminder service](https://medium.com/@micah1powell/using-redis-keyspace-notifications-for-a-reminder-service-with-node-c05047befec3).

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
>(*) IORedis
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add ioredis
yarn add @types/ioredis -D
```

Then, make copy of `src/lib/ioredis` to your project.

```bash
•
├─ 📁ioredis
│   ├─ 📄ioredis.constant.ts    # Contain provider tokens
│   ├─ 📄ioredis.decorator.ts   # Contain dependency injections
│   ├─ 📄ioredis.dto.ts         # Contain ENV configuration
│   ├─ 📄ioredis.module.ts      # Contain declaring module
│   ├─ 📄ioredis.provider.ts    # Contain service providers
│   └─ 📄index.ts               # Contain exposing API
```

Next, import `IORedisModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { IORedisModule } from '@lib/ioredis';

@Module({
  imports: [ConfigModule, IORedisModule]
})
export class ApplicationModule {}
```

## Environment Variables

`IORedisModule` comes with three pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `ioredis.dto.ts` and update the code in `ioredis.provider.ts`.

```bash title=".env.example"
# Redis Credential
REDIS_HOST=
REDIS_PORT=
REDIS_AUTH_PASS=
```

## Basic Usage

You can use `@InjectIORedis()` and `@InjectIORedisPubSub()` to inject `ioredis` into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectIORedis, InjectIORedisPubSub } from '@lib/ioredis';

@Injectable()
export class ExampleService {
  constructor(
    @InjectIORedis() private readonly redis: Redis,
    @InjectIORedisPubSub() private readonly sub: Redis
  ) {
    // For notifications for a reminder service must use in constructor with switch case condition.
    this.sub.on('message', async (channel, message) => {
      const [, type, key] = message.split(':'); // * naming Convention : ex:TYPE:KEY

      switch (type) {
        case 'notification':
          this.publishNotification(key);
          break;

        default:
          break;
      }
    });
  }

  async setRedisExpiry() {
    const key = 'ex:notification:001';
    this.redis
      .multi() // chain multiple redis function
      .set(key, JSON.stringify({ name: 'test', age: 18 })) // must be string
      .setex(key, 100, null) // 100 seconds
      .exec();
  }
}
```

## API

### `IORedisModule`

### `@InjectIORedis()`

### `@InjectIORedisPubSub()`

<!-- - To use IORedis Module, import `RedisModule` into `ApplicationModule`.
- To inject Redis into your service, use `InjectIORedis`.
- To inject PUB/SUB into your service, use `InjectIORedisPubSub`. -->
