---
id: mongoose
title: 'Mongoose'
sidebar_label: '🐻 Mongoose'
---

`@lib/mongoose` is wrapper module based on [Mongoose](https://github.com/Automattic/mongoose/) for non-relational database.

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
>(*) Mongoose
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add mongoose @typegoose/typegoose
yarn add @types/mongoose -D
```

Then, make copy of `src/lib/mongoose`, `src/models` to your project.

```bash
•
├─ 📁models                    # Contain schemas & models
│   ├─ 📄user.model.ts
│   └─ 📄index.ts
│
├─ 📁lib/mongoose
│   ├─ 📄mongoose.constant.ts    # Contain provider token
│   ├─ 📄mongoose.decorator.ts   # Contain dependency injection
│   ├─ 📄mongoose.dto.ts         # Contain ENV configuration
│   ├─ 📄mongoose.module.ts      # Contain declaring module
│   ├─ 📄mongoose.provider.ts    # Contain service provider
│   ├─ 📄mongoose.util.ts        # Contain helper functions
│   └─ 📄index.ts                # Contain exposing API
```

Next, import `MongooseModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { MongooseModule } from '@lib/mongoose';

@Module({
  imports: [ConfigModule, MongooseModule]
})
export class ApplicationModule {}
```

## Environment Variables

`MongooseModule` comes with a pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `mongoose.dto.ts` and update the code in `mongoose.provider.ts`.

```bash title=".env.example"
# Mongo Database Credential
MONGO_URI='mongodb://root:password123@198.174.21.23:27017/databasename'
```

## Basic Usage

For schema definition, we are using [Typegoose](https://github.com/typegoose/typegoose). The reason we are choosing this because it defines both the Mongoose model and the TypeScript interface at the same time.

### Schema & Model

Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection. For more, please check [Schemas](https://mongoosejs.com/docs/guide.html) section and [Prop](https://typegoose.github.io/typegoose/docs/api/decorators/prop) section.

Create your filename inside `src/models` directory by following the guideline:

- Filename must be in suffix `*.model.ts` with kebab-case. Ex: `user.model.ts`
- Class must be singular, PascalCase with suffix `*Schema`. Ex: `class UserSchema {}`
- When using `getModelForClass()`, variable must be in suffix `*Model`. Ex: `UserModel`
- Collection name must be PascalCase and plural. Ex: `Users`

```ts title="src/models/user.model.ts"
import { getModelForClass, prop } from '@typegoose/typegoose';

class UserSchema {
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

export const UserModel = getModelForClass(UserSchema, {
  schemaOptions: { collection: 'Users', timestamps: true }
});
```

Then import the model to `index.ts` for making it registered through `@lib/mongoose`.

```ts title="src/models/index.ts"
export { UserModel } from './user.model';
```

### Static Methods

Sometimes extra functions for model creation or pre-written query are needed. For more, check [Static Methods](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide/#static-methods) section.

Look into our schema inside `src/models` directory by following the guideline:

- Separate Prop class and Static method class with suffix `*Schema` & `*BaseSchema` respectively.
- Static method class will extend Prop class. Ex: `class UserSchema extends UserBaseSchema {}`
- Static method should start with `$` sign to it clear as it's a custom one. Ex: `$findAndCount()`.

```ts title="src/models/user.model.ts"
import { getModelForClass, prop } from '@typegoose/typegoose';

type This = ReturnModelType<typeof UserSchema>;

class UserBaseSchema {
  /* Your Props */
}

class UserSchema extends UserBaseSchema {
  static async $findAndCount(this: This, opt: FindAndCountOpt) {
    /* Your Logic */
  }
  static async $findActiveUsers(this: This, opt: FindActiveUsersOpt) {
    /* Your Logic */
  }
  static async $findByEmail(this: This, opt: FindByEmailOpt) {
    /* Your Logic */
  }
}

export const UserModel = getModelForClass(UserSchema, {
  schemaOptions: { collection: 'Users', timestamps: true }
});
```

### Static Method Interface

When working with custom repository, your methods might need many parameters and result type. As a rule of thumb on Typescript, create interface file for each repository by following the guideline:

- Interface filename should store in a new directory `src/models/interfaces/`.
- Interface filename must be the consistent name with schema.
- Interface filename must be kebab-case & end with suffix `*.interface.ts`. Ex: `user.interface.ts`.
- Parameter interface must be named after method name & end with suffix `*Opt` or `*Option`.
- Result interface also must be named after method name & end with suffix `*Result`.

```ts title="src/models/interfaces/user.interface.ts"
interface FindActiveUsersOption {
  userId: string;
  email: string;
  status: string;
}

interface FindActiveUsersResult {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address: string;
  createdAt: Date;
}
```

```ts title="src/models/user.model.ts"
...

type This = ReturnModelType<typeof UserSchema>;

class UserSchema extends UserBaseSchema {
  static async $findActiveUsers(this: This, opt: FindActiveUsersOption): Promise<FindActiveUsersResult> {
    /* Your Logic */
  }
}
...
```

### Model Injection

We can inject `UserModel` into the ExampleService using `@InjectModel()` decorator from `@lib/mongoose`.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@lib/mongoose';
import { UserModel } from '@models';

@Injectable()
export class ExampleService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  doSomething() {
    // Do stuff...
  }
}
```

## API

### `MongooseModule`

### `@InjectModel()`
