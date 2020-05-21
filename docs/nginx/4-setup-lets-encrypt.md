---
id: nginx-4
title: Setup Let's Encrypt
sidebar_label: Setup Let's Encrypt
---

> This guide will apply on **Ubuntu 18.04**. For the previous version, please go to the [References](#references) section.

Let's Encrypt is a Certificate Authority (CA) that provides an easy way to obtain and install free TLS/SSL certificates, thereby enabling encrypted HTTPS on web servers. It simplifies the process by providing a software client, [Certbot](https://certbot.eff.org/), that attempts to automate most (if not all) of the required steps. Currently, the entire process of obtaining and installing a certificate is fully automated on both Apache and Nginx.

## Prerequisites

To follow this tutorial, you will need:

- One Ubuntu 18.04 server
- A fully registered domain name.
- DNS records set up for your server. An `A` record with `example.com` pointing to your server's public IP address
- [Nginx installed](install-nginx.md) and [have a config file](nginx-configuration.md). Ex: `/etc/nginx/sites-available/example.com`.

```nginx
server {
    server_name example.com;
}
```

## Step 1 — Installing Certbot

The first step to using Let's Encrypt to obtain an SSL certificate is to install the Certbot software on your server.

```shell
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot python-certbot-nginx
```

## Step 2 — Obtaining an SSL Certificate

Certbot provides a variety of ways to obtain SSL certificates, through various plugins. The Nginx plugin will take care of re-configuring Nginx and reloading the config whenever necessary:

```shell
sudo certbot --nginx --rsa-key-size 4096 -d example.com -d www.example.com
```

This runs `certbot` with the `--nginx` plugin, using `-d` to specify the names we'd like the certificate to be valid for. `--rsa-key-size 4096` uses for certificates RSA key size is 4096 if you want to get 100 score on Key Exchange.

If this is your first time running `certbot`, you will be prompted to enter an email address and agree to the terms of service. After doing so, `certbot` will communicate with the Let's Encrypt server, then run a challenge to verify that you control the domain you're requesting a certificate for.

If that's successful, `certbot` will ask how you'd like to configure your HTTPS settings.

```shell
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
-------------------------------------------------------------------------------
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
```

Select your choice then hit `ENTER`. The configuration will be updated, and Nginx will reload to pick up the new settings. certbot will wrap up with a message telling you the process was successful and where your certificates are stored:

```shell
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/example.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/example.com/privkey.pem
   Your cert will expire on 2018-07-23. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

## Step 3 — Update ssl_dhparam

If we want to get 100 on Key Exchange, first we must have certificates RSA key size 4096 (for Let's Encrypt use `--rsa-key-size 4096` when generating the cert) from above. Second we need to create dhparam 4096.

In order to do that, run command `openssl` to generate RSA key size 4096 with params `-dsaparam` for much quicker rather than waiting for nearly one hour.

```shell
openssl dhparam -dsaparam -out /etc/ssl/private/dhparam.pem 4096
```

Then go back to your config file and change the line `ssl_dhparam` below:

```nginx
# /etc/nginx/sites-available/example.com

server {
    server_name example.com;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    ssl_dhparam /etc/ssl/private/dhparam.pem;
}

server {
    if ($host = example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name example.com;
    return 404; # managed by Certbot
}
```

Your certificates are downloaded, installed, and loaded. Try reloading your website using `https://` and notice your browser's security indicator. It should indicate that the site is properly secured, usually with a green lock icon. If you test your server using the [SSL Labs Server Test](https://www.ssllabs.com/ssltest/), it will get an A grade.

## Step 4 — Automatic renewal

Certbot installed a cron task to automatically renew certificates about to expire.

You can [check renewal works](https://certbot.eff.org/docs/using.html#re-creating-and-updating-existing-certificates) using:

```shell
sudo certbot renew --dry-run
```

You can also [check what certificates exist](https://certbot.eff.org/docs/using.html#managing-certificates) using:

```shell
sudo certbot certificates
```

## References

- [certbot - Nginx on Ubuntu 18.04 LTS (bionic)](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx.html)
- [digitalocean - How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
- [digitalocean - How To Secure Nginx with Let's Encrypt on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)
- [gist - How to setup Let's Encrypt for Nginx on Ubuntu 18.04 (including IPv6, HTTP/2 and A+ SLL rating)](https://gist.github.com/cecilemuller/a26737699a7e70a7093d4dc115915de8)
- [letsencrypt - HOWTO: A+ with all 100%’s on SSL Labs test using Nginx mainline & stable](https://community.letsencrypt.org/t/howto-a-with-all-100-s-on-ssl-labs-test-using-nginx-mainline-stable/55033)
- [stackoverflow - How do you score A+ with 100 on all categories...](https://stackoverflow.com/questions/41930060/how-do-you-score-a-with-100-on-all-categories-on-ssl-labs-test-with-lets-encry)
- [youtube - How To Get FREE HTTPS in 10 Minutes with Let's Encrypt and Certbot](https://www.youtube.com/watch?v=8huMBHx-TKY)
