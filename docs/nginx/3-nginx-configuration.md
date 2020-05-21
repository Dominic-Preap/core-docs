---
id: nginx-3
title: Nginx Configuration
sidebar_label: Nginx Configuration
---

You must understand this configuration before apply into your production server. Make sure you only need most of those features best possible for your servers. You can also use [Nginxconfig.io](https://nginxconfig.io/) or [Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/) to generate your server profile.

> To understand more, please check [Nginx Quick Reference](https://github.com/trimstray/nginx-quick-reference#beginner-use-geomap-modules-instead-allowdeny) or go to [References](#references) section below.

**⚠️ NOTE:** After editing your server configuration file, consider using these online testing tools to check your server security strength:

- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

```nginx
# /etc/nginx/nginx.conf

user root; # Replace 'www-data' to 'root' to allow access web application on root directory (web only)
```

```nginx
# /etc/nginx/sites-available/example.com

# Redirect Http Traffic to Https
server {
    if ($host = example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name example.com;
    return 404; # managed by Certbot
}

server {
    server_name example.com;

    # Enable HTTP/2 Support (Required)
    listen [::]:443 ssl http2 ipv6only=on;
    listen 443 ssl http2; # managed by Certbot

    # Turn off server name and nginx version (Required)
    server_tokens off;

    # Increase File Upload Size (Optional)
    client_max_body_size 50M;

    # SSL (Required)
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
    ssl_dhparam /etc/ssl/private/dhparam.pem; # check "Setup Let's Encrypt" section
    # include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot

    # Modern Configuration (Required)
    ssl_ciphers AES256+EECDH:AES256+EDH:!aNULL;
    ssl_ecdh_curve secp384r1;
    ssl_prefer_server_ciphers on;
    ssl_protocols TLSv1.2;

    # OCSP Stapling (Required)
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
    resolver_timeout 2s;

    # Optimize session cache (Required)
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # (Required)
    # add_header Feature-Policy "geolocation none;midi none;notifications none;push none;sync-xhr none;microphone none;camera none;magnetometer none;gyroscope none;speaker self;vibrate none;fullscreen self;payment none;";
    # add_header Content-Security-Policy "default-src 'none'; frame-ancestors 'none'; script-src 'self'; img-src 'self'; style-src 'self'; base-uri 'self'; form-action 'self';";
    add_header Content-Security-Policy "default-src * data: 'unsafe-eval' 'unsafe-inline'" always;
    add_header Referrer-Policy "no-referrer, strict-origin-when-cross-origin";
    add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";

    # For API Application
    # Set Reverse Proxy (Required)
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # For Web Application
    location @web {
        # Resolve 404 Error On Single Page Application (Optional)
        try_files $uri $uri/ /index.html;
    }

    # Enabling Compression (Required)
    gzip on;
    gzip_comp_level    6;
    gzip_min_length    256;
    gzip_proxied       any;
    gzip_vary          on;
    gzip_types
      application/atom+xml
      application/javascript
      application/json
      application/ld+json
      application/manifest+json
      application/rss+xml
      application/vnd.geo+json
      application/vnd.ms-fontobject
      application/x-font-ttf
      application/x-web-app-manifest+json
      application/xhtml+xml
      application/xml
      font/opentype
      image/bmp
      image/svg+xml
      image/x-icon
      text/cache-manifest
      text/css
      text/plain
      text/vcard
      text/vnd.rim.location.xloc
      text/vtt
      text/x-component
      text/x-cross-domain-policy;
      # text/html is always compressed by gzip module

    # Browser Caching (Optional)
    location ~*  \.(jpg|jpeg|png|gif|ico|css|js|pdf)$ {
        expires 1d;
    }
}
```

## References

- [Nginxconfig.io](https://nginxconfig.io/)
- [digitalocean - How To Increase PageSpeed Score By Changing Your Nginx Configuration on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-increase-pagespeed-score-by-changing-your-nginx-configuration-on-ubuntu-16-04)
- [digitalocean - Nginx 404 error with existing urls Angular 2 One page application with routing](https://www.digitalocean.com/community/questions/nginx-404-error-with-existing-urls-angular-2-one-page-application-with-routing)
- [fearby - Set up Feature-Policy, Referrer-Policy and Content Security Policy headers in Nginx](https://fearby.com/article/set-up-feature-policy-referrer-policy-and-content-security-policy-headers-in-nginx/)
- [gist - Best nginx configuration for improved security(and performance).](https://gist.github.com/plentz/6737338)
- [gist - How to setup Let's Encrypt for Nginx on Ubuntu 18.04 (including IPv6, HTTP/2 and A+ SLL rating)](https://gist.github.com/cecilemuller/a26737699a7e70a7093d4dc115915de8)
- [github - Nginx Quick Reference](https://github.com/trimstray/nginx-quick-reference#beginner-use-geomap-modules-instead-allowdeny)
- [github - nginx-tuning](https://github.com/denji/nginx-tuning)
- [letsencrypt - HOWTO: A+ with all 100%’s on SSL Labs test using Nginx mainline & stable](https://community.letsencrypt.org/t/howto-a-with-all-100-s-on-ssl-labs-test-using-nginx-mainline-stable/55033)
- [linode - Getting Started with NGINX - Part 1: Installation and Basic Setup](https://www.linode.com/docs/web-servers/nginx/nginx-installation-and-basic-setup/)
- [linode - Getting Started with NGINX - Part 2: (Slightly More) Advanced Configurations](https://www.linode.com/docs/web-servers/nginx/slightly-more-advanced-configurations-for-nginx/)
- [linode - Getting Started with NGINX - Part 3: Enable TLS for HTTPS Connections](https://www.linode.com/docs/web-servers/nginx/enable-tls-on-nginx-for-https-connections/)
- [linode - Getting Started with NGINX - Part 4: TLS Deployment Best Practices](https://www.linode.com/docs/web-servers/nginx/tls-deployment-best-practices-for-nginx/)
- [linode - How to Configure NGINX](https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx/)
- [medium - Powerful ways to supercharge your NGINX server and improve its performance](https://medium.freecodecamp.org/powerful-ways-to-supercharge-your-nginx-server-and-improve-its-performance-a8afdbfde64d)
- [mozilla - Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
- [nginx - NGINX Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [serverdensity - Troubleshoot Nginx: 10 typical errors](https://blog.serverdensity.com/troubleshoot-nginx/)
- [stackoverflow - How do you score A+ with 100 on all categories...](https://stackoverflow.com/questions/41930060/how-do-you-score-a-with-100-on-all-categories-on-ssl-labs-test-with-lets-encry)
