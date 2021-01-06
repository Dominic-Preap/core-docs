---
id: google-cloud-storage
title: 'Google Cloud Storage'
sidebar_label: 'Google Cloud Storage'
---

`@lib/google-cloud-storage` is wrapper module based on [Google Cloud Storage](https://github.com/GoogleCloudPlatform/google-cloud-node).

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
>(*) Google Cloud Storage
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add @google-cloud/storage
```

Then, make copy of `src/lib/google-cloud-storage` to your project.

```bash
•
├─ 📁google-cloud-storage
│   ├─ 📄google-cloud-storage.constant.ts    # Contain provider token
│   ├─ 📄google-cloud-storage.decorator.ts   # Contain dependency injection
│   ├─ 📄google-cloud-storage.dto.ts         # Contain ENV configuration
│   ├─ 📄google-cloud-storage.module.ts      # Contain declaring module
│   ├─ 📄google-cloud-storage.provider.ts    # Contain service provider
│   ├─ 📄google-cloud-storage.ts             # Contain google cloud storage class
│   └─ 📄index.ts                            # Contain exposing API
```

Next, import `GoogleCloudStorageModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { GoogleCloudStorageModule } from '@lib/google-cloud-storage';

@Module({
  imports: [ConfigModule, GoogleCloudStorageModule]
})
export class ApplicationModule {}
```

## Environment Variables

`GoogleCloudStorageModule` comes with two pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `google-cloud-storage.dto.ts` and update the code in `google-cloud-storage.ts`.

```bash title=".env.example"
# Google Cloud Storage Credential
GOOGLE_CLOUD_STORAGE_KEY_FILENAME_PATH= # path to config json file from google cloud
GOOGLE_CLOUD_STORAGE_BUCKET_NAME=
```

## Basic Usage

You can use `@InjectGoogleCloudStorage()` to inject `GoogleCloudStorage` into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import {
  GoogleCloudStorage,
  InjectGoogleCloudStorage
} from '@lib/google-cloud-storage';

@Injectable()
export class ExampleService {
  constructor(
    @InjectGoogleCloudStorage() private readonly storage: GoogleCloudStorage
  ) {}
}
```

## API

### `GoogleCloudStorageModule`

### `@InjectGoogleCloudStorage()`

### `GoogleCloudStorage`
