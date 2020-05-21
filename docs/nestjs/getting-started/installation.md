---
id: installation
title: Installation
sidebar_label: Installation
---

## Requirements

[Node.js](https://nodejs.org/en/download/) version >= 10.13.0 or above (which can be checked by running `node -v`). You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed

[Yarn](https://classic.yarnpkg.com/en/) version >= 1.22.0 (which can be checked by running `yarn version`). Yarn is a preferment package manager for JavaScript and replaces the npm client. It is not strictly necessary but highly encouraged.

## Scaffold project

The easiest way to install boilerplate is to use the command line tool that helps you scaffold a new project setup.

```bash
git clone https://github.com/nestjs/nest.git nest-boilerplate
cd nest-boilerplate
yarn install
yarn generate
```

or

```bash
cd nest-boilerplate
git pull
yarn install
yarn generate
```

We are using [Plop](https://github.com/plopjs/plop) for a CLI to scaffold our project. When run `yarn generate`, the first question is to input your project name which required all lower-case and no-spacing.

```bash
yarn run v1.22.4
$ plop
? What is your project name?
```

The second question need you to choose to built-in modules for a third party libraries.

```plain
? Choose The Main Libraries (Press <space> to select, ...)
>( ) Auth0
 ( ) AWS
 ( ) Firebase Admin
 ( ) Google Cloud Storage
 ( ) I18Next
 ( ) IORedis
 ( ) Mailer
 ( ) Media Stream
 ( ) Mongoose
 ( ) SendBird
 ( ) Sequelize
 ( ) Social
 ( ) Socket
 ( ) TypeORM
 ( ) Twilio
 ( ) Wowza
```

The third question need you to choose to a sub libraries or helper functions for your project specification.

```plain
? Choose The Sub Libraries / Helpers (Press <space> to select, ...)
>( ) Archiver (download as zip file)
 ( ) Cache Manager (check usage in Nestjs document)
 ( ) DayOffCalculation Helper (for specific purpose)
 ( ) DynamoDB Data Mapper
 ( ) Excel4Node (helper to generate excel file)
 ( ) PDFMake (helper to generate pdf file)
 ( ) Sanitize HTML (used in DTO decorator)
 ( ) Sharp (image manipulation)
 ( ) Soap (classic bitch !!!)
 ( ) Upload Image/File API Helper
```

The final question ask you to export examples from the boilerplate itself as for the references.

```bash
? Do you want examples from the core project? (Y/n)
```

:::important

The end result is within the directory `@PROJECT`. Cut the directory somewhere else and use it for your new project boilerplate

:::

## Running the application

Once the process is complete, you can run the following command at your OS command prompt to install dependencies and start the application.

> To set your application environment variables create a `.env` file. There is an `.env.example` file to follow.

Install dependencies

```bash
yarn install
```

Run in development environment

```bash
yarn dev
```

Run in production environment

```bash
# compile typescript
yarn build

# compile and run with pm2
yarn start
```
