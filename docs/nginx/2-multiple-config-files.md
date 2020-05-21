---
id: nginx-2
title: Define Multiple Config Files
sidebar_label: Define Multiple Config Files
---

If you have multiple apps running in the same server and having a hard time managing your Nginx configuration, you might want to consider separating your config files.

## Step 1 – Create new config files

First choose your location to store your config files, it could be anywhere in your server. The best path to store is in **Nginx** itself `/etc/nginx/sites-available/`.

```shell
touch /etc/nginx/sites-available/example.com
touch /etc/nginx/sites-available/api.example.com
```

## Step 2 – Add configuration to config file

Then add/move your configuration into your new config file.

```shell
nano /etc/nginx/sites-available/api.example.com
```

```nginx
# Add your configuration here
server {
    server_name example.com;
    # ...
}
```

## Step 3 – Include external config files

Don't forget include your external config files in `/etc/nginx/sites-available/default`.

```shell
nano /etc/nginx/sites-available/default
```

```nginx
# Include external configs via include like example below:
include /etc/nginx/sites-available/example.com;
include /etc/nginx/sites-available/api.example.com;
include /path/to/conf_dir/*.conf;

server {
    # ...
}
```

Finally, reload your nginx server after including a new config files

```sh
systemctl reload nginx
```

## References

- [serverfault - Can you define a server's locations in multiple nginx config files?](https://serverfault.com/questions/618889/can-you-define-a-servers-locations-in-multiple-nginx-config-files)
