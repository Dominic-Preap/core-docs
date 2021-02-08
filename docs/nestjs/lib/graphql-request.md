---
id: graphql-request
title: 'Graphql Request'
sidebar_label: '✡️ Graphql Request'
---

`@lib/graphql-request` is minimal GraphQL client for simply apps. For more, check [`prisma-labs/graphql-request`](https://github.com/prisma-labs/graphql-request#graphql-request).

It is a best practice to name your graphql request service rather than the default `@lib/graphql-request`. For example, if your service name is **Account Service**, you shall name it as `@lib/account-service`.

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
>(*) Graphql Request
 ...
```

### Manual Setup (Alt.)

First, install dependencies.

```bash
yarn add graphql -D
yarn add graphql-request
```

Then, make copy of `src/lib/graphql-request` to your project.

```bash
•
├─ 📁graphql-request
│   ├─ 📄graphql-request.constant.ts    # Contain provider token
│   ├─ 📄graphql-request.decorator.ts   # Contain dependency injection
│   ├─ 📄graphql-request.dto.ts         # Contain ENV configuration
│   ├─ 📄graphql-request.module.ts      # Contain declaring module
│   ├─ 📄graphql-request.provider.ts    # Contain service provider
│   ├─ 📄graphql-request.ts             # Contain your request API
│   └─ 📄index.ts                       # Contain exposing API
```

Next, import `GraphQLRequestModule` into your `app.module.ts`.

```ts title="src/app.module.ts"
import { ConfigModule } from '@lib/config';
import { GraphQLRequestModule } from '@lib/graphql-request';

@Module({
  imports: [ConfigModule, GraphQLRequestModule]
})
export class ApplicationModule {}
```

## Environment Variables

`GraphQLRequestModule` comes with two pre-defined env in `.env.example`. But this is completely customizable in your project, just make sure you change the configuration setup in `graphql-request.dto.ts` and update the code in `graphql-request.provider.ts`.

```bash title=".env.example"
# Graphql Request
GRAPHQL_REQUEST_ENDPOINT=
GRAPHQL_REQUEST_AUTHENTICATION=
```

## Basic Usage

You can use `@InjectGraphQLRequest()` to inject `GraphQLRequest` into your service. So your graphql request API shall be in `graphql-request.ts`.

```ts title="example.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectGraphQLRequest, GraphQLRequest } from '@lib/graphql-request';

@Injectable()
export class ExampleService {
  constructor(
    @InjectGraphQLRequest() private readonly client: GraphQLRequest
  ) {}

  async doSomething() {
    const data = await this.client.getCharacters({ page: 1 });
    // Do stuff ...
  }
}
```

```ts title="src/lib/graphql-request/graphql-request.ts"
import { gql, GraphQLClient } from 'graphql-request';

export class GraphQLRequest {
  constructor(private readonly client: GraphQLClient) {}

  /**
   * This is an example API, you should create you own API here
   *
   * @see https://rickandmortyapi.com/graphql
   */
  async getCharacters(opt: GetCharactersOption) {
    const query = gql`
      query($page: Int) {
        characters(page: $page) {
          results {
            id
            name
            status
            species
            gender
          }
        }
      }
    `;

    return this.client.request(query, opt);
  }
}
```

## API

### `GraphQLRequestModule`

### `@InjectGraphQLRequest()`

### `GraphQLRequest`
