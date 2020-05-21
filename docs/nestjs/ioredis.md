# IORedis Module

## 📋 Requirement

[IORedis](https://github.com/luin/ioredis) required three `.env` param. it also provides PUB/SUB feature mostly for set expiry **[[Notifications for a Reminder Service]](https://medium.com/@micah1powell/using-redis-keyspace-notifications-for-a-reminder-service-with-node-c05047befec3)**.

- `REDIS_HOST`: Redis host.
- `REDIS_PORT`: Redis port.
- `REDIS_AUTH_PASS`: Redis auth password.

## 🛠️ Usage

- To use IORedis Module, import `RedisModule` into `ApplicationModule`.
- To inject Redis into your service, use `InjectIORedis`.
- To inject PUB/SUB into your service, use `InjectIORedisPubSub`.

```ts
// src/app.module.ts
import { IORedisModule } from '@lib/ioredis';

@Module({
  imports: [ApiModule, ConfigModule, IORedisModule]
})
export class ApplicationModule {}

// ---------------------------------------------------------------------------------------------
// ioredis.service.ts
// * For notifications for a reminder service must use in constructor with switch case condition.
import { Redis } from 'ioredis';
import { InjectIORedis, InjectIORedisPubSub } from '@lib/ioredis';

@Injectable()
export class IORedisService {
  constructor(
    @InjectIORedisPubSub() private readonly sub: Redis, 
    @InjectIORedis() private readonly redis: Redis)
  {
    this.sub.on('message', async (channel, message) => {
      const [, type, key] = message.split(':'); // * Naming Convention : ex:TYPE:KEY

      switch (type) {
        case 'notification':
          this.publishNotification(key);
          break;

        default:
          break;
      }
    });
  }
}
// ---------------------------------------------------------------------------------------------
// sample.service.ts
// * Set Reminder 100 seconds after it is executed.
import { Redis } from 'ioredis';
import { InjectIORedis } from '@lib/ioredis';

@Injectable()
export class SampleService {
  constructor(@InjectIORedis() private readonly redis: Redis) {}

  async setRedisExpiry() {
    const key = 'ex:notification:001';
    this.redis
      .multi() // Chain multiple redis function
      .set(key, JSON.stringify({ name: 'Test', age: 18 })) // Must be string
      .setex(key, 100, null) // 100 seconds
      .exec();
  }
}
```
