---
id: localhost
title: 'Create Locally Trusted Certificates with mkcert'
sidebar_label: Create Localhost Certificate
---

[**mkcert**](https://github.com/FiloSottile/mkcert) is a simple tool for making locally-trusted development certificates. It requires no configuration.

mkcert automatically creates and installs a local CA in the system root store, and generates locally-trusted certificates. mkcert does not automatically configure servers to use the certificates, though, that's up to you.

![Chrome and Firefox screenshot](https://user-images.githubusercontent.com/1225294/51066373-96d4aa80-15be-11e9-91e2-f4e44a3a4458.png)

## Installation

### Windows

Open Windows PowerShell as administrator

```sh
choco install mkcert
```

### Linux

On Linux, first install `certutil`.

```sh
sudo apt install libnss3-tools
    -or-
sudo yum install nss-tools
    -or-
sudo pacman -S nss
```

Then you can install using [Linuxbrew](http://linuxbrew.sh/)

```sh
brew install mkcert
```

### macOS

On macOS, use [Homebrew](https://brew.sh/)

```sh
brew install mkcert
brew install nss # if you use Firefox
```

## Generate Certificates

First Install the local CA in the system trust store.

```shell
$ mkcert -install
Created a new local CA at "/Users/filippo/Library/Application Support/mkcert" 💥
The local CA is now installed in the system trust store! ⚡️
The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
```

Second, start generating SSL certificates for your domains. In this case I only use `localhost`.

```shell
$ mkcert localhost 127.0.0.1 ::1
Using the local CA at "/Users/filippo/Library/Application Support/mkcert" ✨

Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"
 - "::1"

The certificate is at "./localhost+2.pem" and the key at "./localhost+2-key.pem" ✅
```

## Using Certificates

:::caution Warning

Make sure you do this only for your local environment. **Do not use this in production.**

:::

### Express App

Here's how you would use your certificate in [Nest](https://nestjs.com/).

```ts
import {NestFactory} from '@nestjs/core';
import {readFileSync} from 'fs';
import {resolve} from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(resolve('.', 'config', 'ssl', 'localhost-key.pem')),
    cert: readFileSync(resolve('.', 'config', 'ssl', 'localhost.pem')),
  };
  const app = await NestFactory.create(ApplicationModule, {httpsOptions});
  await app.listen(3000).then(x => console.log(`Listen on port ${3000}`));
}
```

### Nginx

Using on Nginx configuration file

```nginx
# nano /etc/nginx/conf.d/example.conf
server {
   listen 80;
   server_name example.com;
   root /var/www/example;
}

server {
   listen *:443 ssl http2;
   root /var/www/example;
   server_name example.com;
   ssl_certificate /home/your-username/localhost.pem;
   ssl_certificate_key /home/your-username/localhost-key.pem;
}
```

Make sure your `/etc/hosts` file has a record for used domains.

```shell
127.0.0.1 example.com
127.0.0.1 your-domain.com
```

## References

- [computingforgeeks - How to create locally trusted SSL Certificates on Linux and macOS with mkcert](https://computingforgeeks.com/how-to-create-locally-trusted-ssl-certificates-on-linux-and-macos-with-mkcert/)
- [freecodecamp = How to get HTTPS working on your local development environment in 5 minute](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec)
- [github - mkcert](https://github.com/FiloSottile/mkcert)
- [nestjs - HTTPS & multiple servers](https://docs.nestjs.com/faq/multiple-servers)
