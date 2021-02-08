---
id: aws
title: 'AWS'
sidebar_label: '📦 AWS'
---

`@lib/aws` is wrapper module based on [AWS SDK](https://www.npmjs.com/package/aws-sdk).

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
>(*) AWS
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add aws-sdk

# Optional, for Dynamodb
yarn add @aws/dynamodb-data-mapper
yarn add @aws/dynamodb-data-mapper-annotations
```

Then, make copy of `src/lib/aws` to your project.

```bash
•
├─ 📁aws
│   ├─ 📄aws.constant.ts    # Contain provider tokens
│   ├─ 📄aws.decorator.ts   # Contain dependency injections
│   ├─ 📄aws.dto.ts         # Contain ENV configuration
│   ├─ 📄aws.module.ts      # Contain declaring module
│   ├─ 📄aws.provider.ts    # Contain service providers
│   ├─ 📄aws.ts             # Contain AWS exposing API
│   └─ 📄index.ts           # Contain exposing API
```

Next, import `AWSModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { AWSModule } from '@lib/aws';

@Module({
  imports: [ConfigModule, AWSModule]
})
export class ApplicationModule {}
```

## Environment Variables

`AWSModule` comes with several pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `aws.dto.ts` and update the code in `aws.ts`.

```bash title=".env.example"
# AWS Credential
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=
AWS_S3_PREFIX=
AWS_DYNAMODB_PREFIX=
```

## Basic Usage

You can use `@InjectAWS()` to inject `AWSLib` into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectAWS, AWSLib } from '@lib/aws';

@Injectable()
export class ExampleService {
  constructor(@InjectAWS() private readonly aws: AWSLib) {}
}
```

## API

### `AWSModule`

### `AWSLib`

### `@InjectAWS()`
