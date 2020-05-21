# Mongoose

## 📋 Requirement

[Mongoose](https://github.com/Automattic/mongoose/) for Mongo database required one `.env` param.

- `MONGO_URI`: Mongo database connection string.

## 🛠️ Usage

- To use Mongoose module, import `MongooseModule` into `ApplicationModule`.

```ts
// src/app.module.ts
import { MongooseModule } from '@lib/mongoose';

@Module({
  imports: [ApiModule, ConfigModule, MongooseModule]
})
export class ApplicationModule {}
```

- For Mongo collections, we are using [typegoose](https://github.com/szokodiakos/typegoose) for schema declaration. The reason I'm choosing this because it has fully type support for typescript. So you don't have to repeat typing your schema and interfaces at the same time.

```ts
// src/schema/user.schema.ts
import * as mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';

export class UserSchema extends Typegoose {
  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ required: true })
  username!: string;

  @prop({ required: true })
  password!: string;

  @prop({ enum: ['admin', 'client'] })
  role!: 'admin' | 'client';
}

export const User = new UserSchema().setModelForClass(UserSchema, {
  schemaOptions: { collection: 'Users', timestamps: true },
  existingMongoose: mongoose
});
```
