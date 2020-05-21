---
id: nginx-5
title: Troubleshoot Nginx
sidebar_label: Troubleshoot Nginx
---

The most annoying issues that happens on your Nginx server.

## Increasing File Upload Size

> Is there a reason why multer won't upload a file that's more than 1MB? I have an express multer setup to upload 50MB.

First open your nginx config file then add `client_max_body_size` in the `server` block below.

```bash
# Can be one of this
nano /etc/nginx/sites-available/default
nano /etc/nginx/nginx.conf
```

```nginx
server {
  server_name example.com;
  client_max_body_size 50M; # <== add this line of code
}
```

Restart your nginx server after changing the config file.

```bash
systemctl reload nginx
```

**References**

- [Upload -- size limitation](https://github.com/expressjs/multer/issues/562#issuecomment-404759029)
- [How to edit nginx.conf to increase file size upload](https://stackoverflow.com/questions/26717013/how-to-edit-nginx-conf-to-increase-file-size-upload)
- [How to Limit File Upload Size in Nginx](https://www.tecmint.com/limit-file-upload-size-in-nginx/)
- [Troubleshoot Nginx: 10 typical errors](https://blog.serverdensity.com/troubleshoot-nginx/)

## 404 Error On Single Page Application

> I have a one-page angular 2 application that uses routing. When I hit my base URL example.com then the page loads correctly. However example.com/dashboard results in a 404 error.

First open your nginx config file then add the code below.

```bash
nano /etc/nginx/sites-enabled/default
```

```nginx
server {
  location / {
    try_files $uri $uri/ /index.html; # <== add this line of code
  }
}
```

Restart your nginx server after changing the config file.

```bash
systemctl reload nginx
```

This assumes that Angular is setup to handle requests that are sent to index.html and will route all requests accordingly.

**References**

- [How to fix 404 not found nginx problem?](https://www.digitalocean.com/community/questions/how-to-fix-404-not-found-nginx-problem)
- [Nginx 404 error with existing urls Angular 2 One page application with routing](https://www.digitalocean.com/community/questions/nginx-404-error-with-existing-urls-angular-2-one-page-application-with-routing)
