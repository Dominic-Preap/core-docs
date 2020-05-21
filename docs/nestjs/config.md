---
id: config
title: This is Document Number 3
---

## Config Module

One of the most important built-in modules. It validates your `env` params that required for a specific module. If the env is missing or wrong input, the app cannot be started. It is mostly used for built-in modules, but you can also inject it into your module if you wish.

The logic of Config Module is pretty similar to [Configuration doc](https://docs.nestjs.com/techniques/configuration) from the official nest but extend a `validate` function.

In this example, we are validated mongoose module by checking if `MONGO_URI` exist in your `.env` file.

```typescript
// src/lib/mongoose/mongoose.provider.ts
export const mongooseProvider = {
  inject: [ConfigService],
  provide: MongooseToken,
  useFactory: async (configService: ConfigService) => {
    const {MONGO_URI} = configService.validate(
      'MongooseModule',
      MongooseConfig,
    );
    await mongoose.connect(MONGO_URI);
    logger.log(
      mongoose.connection.readyState === 1 ? 'connected' : 'not connected',
    );
  },
};

// src/lib/mongoose/mongoose.dto.ts
export class MongooseConfig {
  @IsNotEmpty()
  @IsString()
  MONGO_URI!: string;
}
```
