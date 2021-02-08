---
id: mailer
title: 'Mailer'
sidebar_label: '✉️ Mailer'
---

`@lib/mailer` is a mailer module containing [NodeMailer](https://github.com/nodemailer/nodemailer). This module only have one method `.send()`. You can also add a different mailer service such as [Sendgrid](https://github.com/sendgrid/sendgrid-nodejs) and [Mandrill](https://mandrillapp.com/api/docs/index.nodejs.html).

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
>(*) Mailer
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add nodemailer
yarn add @types/nodemailer -D
```

Then, make copy of `src/lib/mailer` to your project.

```bash
•
├─ 📁mailer
│   ├─ 📄mailer.constant.ts    # Contain provider token
│   ├─ 📄mailer.decorator.ts   # Contain dependency injection
│   ├─ 📄mailer.dto.ts         # Contain ENV configuration
│   ├─ 📄mailer.module.ts      # Contain declaring module
│   ├─ 📄mailer.provider.ts    # Contain service provider
│   ├─ 📄mailer.ts             # Contain mailer class
│   └─ 📄index.ts              # Contain exposing API
```

Next, import `MailerModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { MailerModule } from '@lib/mailer';

@Module({
  imports: [ConfigModule, MailerModule]
})
export class ApplicationModule {}
```

## Environment Variables

`MailerModule` comes with pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `mailer.dto.ts` and add conditional in `mailer.ts`.

```bash title=".env.example"
# Mailer Credential (ethereal, gmail or mandrill)
MAILER_TYPE=
MAILER_ETHEREAL_USERNAME=
MAILER_ETHEREAL_PASSWORD=
MAILER_GMAIL_USERNAME=
MAILER_GMAIL_PASSWORD=
MAILER_MANDRILL_API_KEY=
```

## Basic Usage

You can use `@InjectMailer()` decorator to inject `Mailer` into your service.

:::info
It is a best practice to create a `SharedModule` and `MailerService` to handle all the mailer methods then export the service to use in other module.
:::

```ts title="src/api/shared/mailer.service.ts"
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { compileFile } from 'pug';

import { InjectMailer, Mailer } from '@lib/mailer';

@Injectable()
export class MailerService {
  constructor(@InjectMailer() private readonly mailer: Mailer) {}

  async sendResetPassword(email: string, code: string) {
    // Pug is a recommendation
    const template = resolve('.', 'assets', 'templates', 'reset-password.pug');
    const compiledFunction = compileFile(template);

    await this.mailer.send({
      from: 'sender@server.com',
      to: email,
      subject: 'Reset Password',
      html: compiledFunction({ code })
    });
  }
}
```

## API

### `MailerModule`

### `@InjectMailer()`

### `Mailer`

`Mailer` class contain only one method `send(options)` and can have fields:

- `from:` The email address of the sender. All email addresses can be plain `sender@server.com` or formatted `"Sender Name" sender@server.com`.
- `to:` Comma separated list or an array of recipients email addresses.
- `subject:` The subject of the email.
- `html:` The HTML version of the message as an Unicode string, Buffer, Stream.
- `attachments:` An array of attachment objects

```ts
this.mailer.send({
  from: 'sender@server.com',
  to: 'receiver@sender.com',
  subject: 'Message title',
  html: '<p>HTML version of the message</p>'
});
```
