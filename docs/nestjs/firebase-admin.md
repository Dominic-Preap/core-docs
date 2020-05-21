# Firebase Admin

## 📋 Requirement

[Firebase Admin Node SDK](https://github.com/firebase/firebase-admin-node) for messaging required two `.env` params.

- `FIREBASE_CREDENTIAL_PATH`: path to config json file the generate from google firebase.
- `FIREBASE_DATABASE_URL`: as name suggested, firebase database url.

## 🛠 Usage

- To use Firebase Admin module, import `FirebaseAdminModule` into `ApplicationModule`.
- To inject Firebase Admin into your service, use `InjectFirebaseAdmin`.

```ts
// src/app.module.ts
import { FirebaseAdminModule } from '@lib/firebase-admin';

@Module({
  imports: [ApiModule, ConfigModule, FirebaseAdminModule]
})
export class ApplicationModule {}

// firebase-admin.service.ts
import * as admin from 'firebase-admin';
import { InjectFirebaseAdmin } from '@lib/firebase-admin';

@Injectable()
export class FirebaseAdminService {
  constructor(@InjectFirebaseAdmin() private readonly admin: admin.app.App) {}
}
```
