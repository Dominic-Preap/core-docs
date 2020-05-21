# Google Cloud Storage

## 📋 Requirement

[Google Cloud Storage](https://github.com/GoogleCloudPlatform/google-cloud-node) also required two `.env` params.

- `GOOGLE_CLOUD_STORAGE_KEY_FILENAME_PATH`: path to config json file the generate from google cloud storage.
- `GOOGLE_CLOUD_STORAGE_BUCKET_NAME`: google cloud storage bucket name.

## 🛠️ Usage

- To use Google Cloud Storage module, import `GoogleCloudStorageModule` into `ApplicationModule`.
- To inject Google Cloud Storage into your service, use `InjectGoogleCloudStorage` with type `GoogleCloudStorage`.

```ts
// src/app.module.ts
import { GoogleCloudStorageModule } from '@lib/google-cloud-storage';

@Module({
  imports: [ApiModule, ConfigModule, GoogleCloudStorageModule]
})
export class ApplicationModule {}

// google-cloud-storage.service.ts
import { InjectGoogleCloudStorage, GoogleCloudStorage } from '@lib/google-cloud-storage';

@Injectable()
export class GoogleCloudStorageService {
  constructor(@InjectGoogleCloudStorage() private readonly storage: GoogleCloudStorage) {}
}
```
