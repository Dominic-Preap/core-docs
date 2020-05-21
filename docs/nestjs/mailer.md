# Mailer

In Mailer module, we are using only 2 mail services right now [NodeMailer](https://github.com/nodemailer/nodemailer) and [Mandrill](https://mandrillapp.com/api/docs/index.nodejs.html). This module only have one method `.send()`.

You can also add a different mailer service such as [sendgrid](https://github.com/sendgrid/sendgrid-nodejs) ..etc.
 

## 📋 Requirement

- `MAILER_TYPE`: can be `ethereal`, `gmail`, `mandrill`
- `MAILER_ETHEREAL_USERNAME`: username for ethereal
- `MAILER_ETHEREAL_PASSWORD`: password for ethereal
- `MAILER_GMAIL_USERNAME`: username for gmail
- `MAILER_GMAIL_PASSWORD`: password for gmail
- `MAILER_MANDRILL_API_KEY`: api key for mandrill

## 🛠️ Usage

- To use Mailer module, import `MailerModule` into `ApplicationModule`.
- To inject Mailer into your service, use `InjectMailer` with type `Mailer`.

```ts
// src/app.module.ts
import { MailerModule } from '@lib/mailer';

@Module({
  imports: [ApiModule, ConfigModule, MailerModule]
})
export class ApplicationModule {}

// mailer.service.ts
import { resolve } from 'path';
import { compileFile } from 'pug';
import { InjectMailer, Mailer } from '@lib/mailer';

@Injectable()
export class MailerService {
  constructor(@InjectMailer() private readonly mailer: Mailer) {}

  async sendSampleEmail() {
    const data = [1, 2, 3, 4];

    const compiledFunction = compileFile(resolve('.', 'assets', 'templates', 'sample.pug'));
    this.mailer.send({
      from: '"Nest Boilerplate Project" <preapchanoudom@gmail.com>', // sender address
      to: 'someone@example.com', // list of receivers
      subject: 'Sample Email',
      html: compiledFunction({ data })
    });
  }
}
```
