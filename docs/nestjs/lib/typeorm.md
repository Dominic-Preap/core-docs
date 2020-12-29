---
id: typeorm
title: '@lib/typeorm'
sidebar_label: '@lib/typeorm'
---

`@lib/typeorm` is a small module sit on top of [`@nestjs/typeorm`](https://docs.nestjs.com/techniques/database#typeorm-integration) and [`typeorm`](https://typeorm.io/#/) to make integration with SQL a bit easier. Although you can fully customize the provider for your own need.

## Quick Setup

### Using Scaffolding CLI

```bash
yarn generate
```

```bash
? Choose the Main Libraries (Press <space> to select, <a> to toggle all, <i> to invert selection)
 ...
>(*) Typeorm
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
# For MySQL, for more check typeorm docs
yarn add @nestjs/typeorm typeorm mysql2
```

Then, make copy of `src/lib/typeorm`, `src/entities`, `src/repositories` to your project.

```bash
•
├─ 📁entities                 # Contain entities (classes that maps to a database table)
│   ├─ 📄user.entity.ts
│   └─ 📄index.ts
├─ 📁repositories             # Contain repositories
│   ├─ 📄user.repository.ts
│   └─ 📄index.ts
├─ 📁lib/typeorm
│   ├─ 📄typeorm.dto.ts       # Contain ENV configuration
│   ├─ 📄typeorm.module.ts    # Contain declaring module
│   ├─ 📄typeorm.service.ts   # Contain service providers
│   └─ 📄index.ts             # Contain export methods
```

Next, add `TypeOrmModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { TypeOrmModule } from '@lib/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule]
})
export class ApplicationModule {}
```

## Environment Variables

`TypeOrmModule` comes with pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `typeorm.dto.ts` and update the code in `typeorm.service.ts`.

```bash title=".env.example"
# Relational Database Credential
DB_HOST="127.0.0.1"
DB_PORT=3306
DB_USERNAME="root"
DB_PASSWORD="12345"
DB_SCHEMA="db"
DB_CONNECTION="mysql"
DB_LOGGING=true
DB_SYNC=false
```

## Basic Usage

### Entity

Entity is a class that maps to a database table. You can create an entity by defining a new class. For more, please check [Entities](https://typeorm.io/#/entities) section in [Typeorm](https://typeorm.io/#/) docs.

Create your entity inside `src/entities` directory by following the guideline:

- Filename must be in suffix `*.entity.ts` with kebab-case. Ex: `user.entity.ts`.
- Class must be singular and PascalCase. Ex: `class User {}`
- `@Entity()` decorator table name must be PascalCase and plural. Ex: `@Entity('Users')`.

```ts title="src/entities/user.entity.ts"
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  status!: string;
}
```

Then import the entity to `index.ts` for making it registered through `@lib/typeorm`.

```ts title="src/entities/index.ts"
export { User } from './user.entity';
```

### Custom Repository

You can create a custom repository which should contain methods to work with your database. Usually custom repositories are created for a single entity and contains its specific queries. For more, please check [Custom repositories](https://typeorm.io/#/custom-repository) section in [Typeorm](https://typeorm.io/#/) docs.

Create your repository inside `src/repositories` directory by following the guideline:

- Filename must be in suffix `*.repository.ts` with kebab-case. Ex: `user.repository.ts`.
- Class must be singular, PascalCase with suffix `*Repository`. Ex: `class UserRepository {}`.
- Method should start with `$` sign to it clear as it's a custom one. Ex: `$findByEmail()`.

```ts title="src/repositories/user.repository.ts"
import { EntityRepository, Repository } from 'typeorm';

import { User } from '@entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async $findByEmail(email: string) {
    // ...
  }

  async $upsert(opt: UpsertOptions) {
    // ...
  }
}
```

Then import the entity to `index.ts` for making it registered through `@lib/typeorm`.

```ts title="src/repositories/index.ts"
export { UserRepository } from './user.repository';
```

### Repository Interface

When working with custom repository, your methods might need many parameters and result type. As a rule of thumb on Typescript, create interface file for each repository follow the guideline:

- Interface filename should store in a new directory `src/repositories/interfaces/`.
- Interface filename must be the consistent name with repository.
- Interface filename must be kebab-case & end with suffix `*.interface.ts`. Ex: `user.interface.ts`.
- Parameter interface must be named after method name & end with suffix `*Opt` or `*Option`.
- Result interface also must be named after method name & end with suffix `*Result`.

```ts title="src/repositories/interfaces/user.interface.ts"
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

```ts title="src/repositories/user.repository.ts"
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async $findActiveUsers(
    opt: FindActiveUsersOption
  ): Promise<FindActiveUsersResult> {
    // ...
  }
}
```

### Repository Injection

We can inject`UsersRepository` or `User` into the ExampleService using the `@InjectRepository()` decorator. For more, check [Typeorm](https://docs.nestjs.com/techniques/database#repository-pattern) section in [Nest](https://docs.nestjs.com/) docs.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@entities';
import { UserRepository } from '@repositories';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // -- OR--
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  doSomething() {
    // Do stuff...
  }
}
```
