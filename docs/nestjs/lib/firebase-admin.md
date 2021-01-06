---
id: firebase-admin
title: 'Firebase Admin'
sidebar_label: 'Firebase Admin'
---

`@lib/firebase-admin` is wrapper module based on [Firebase Admin Node.js SDK](https://github.com/firebase/firebase-admin-node).

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
>(*) Firebase Admin
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add firebase-admin
```

Then, make copy of `src/lib/firebase-admin` to your project.

```bash
•
├─ 📁firebase-admin
│   ├─ 📄firebase-admin.constant.ts    # Contain provider token
│   ├─ 📄firebase-admin.decorator.ts   # Contain dependency injection
│   ├─ 📄firebase-admin.dto.ts         # Contain ENV configuration
│   ├─ 📄firebase-admin.module.ts      # Contain declaring module
│   ├─ 📄firebase-admin.provider.ts    # Contain service provider
│   └─ 📄index.ts                      # Contain exposing API
```

Next, import `FirebaseAdminModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { FirebaseAdminModule } from '@lib/firebase-admin';

@Module({
  imports: [ConfigModule, FirebaseAdminModule]
})
export class ApplicationModule {}
```

## Environment Variables

`FirebaseAdminModule` comes with two pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `firebase-admin.dto.ts` and update the code in `firebase-admin.ts`.

```bash title=".env.example"
# Firebase Admin Credential
FIREBASE_CREDENTIAL_PATH= # path to config json file from google firebase
FIREBASE_DATABASE_URL=
```

## Basic Usage

You can use `@InjectFirebaseAdmin()` to inject firebase admin into your service.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { InjectFirebaseAdmin } from '@lib/firebase-admin';

@Injectable()
export class ExampleService {
  constructor(@InjectFirebaseAdmin() private readonly admin: admin.app.App) {}
}
```

## API

### `FirebaseAdminModule`

### `@InjectFirebaseAdmin()`
