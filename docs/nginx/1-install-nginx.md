---
id: nginx-1
title: How To Install Nginx
sidebar_label: How To Install Nginx
---

> This guide will apply on **Ubuntu 18.04**. For the previous version, please go to the [References](#references) section.

[Nginx](https://www.nginx.com/) is one of the most popular web servers in the world and is responsible for hosting some of the largest and highest-traffic sites on the internet. It is more resource-friendly than Apache in most cases and can be used as a web server or reverse proxy.

## Step 1 – Installing Nginx

Because Nginx is available in Ubuntu's default repositories, it is possible to install it from these repositories using the `apt` packaging system

```shell
sudo apt update
sudo apt install nginx
```

## Step 2 – Managing the Nginx Process

Now that you have your web server up and running, let's review some basic management commands.

> By default, Nginx is configured to start automatically when the server boots.

```sh
sudo systemctl status nginx   # To check your web server.
sudo systemctl stop nginx     # To stop your web server.
sudo systemctl start nginx    # To start the web server when it is stopped.
sudo systemctl restart nginx  # To stop and then start the service again.
sudo systemctl reload nginx   # To often reload without dropping connections.
sudo systemctl disable nginx  # To disable service when start up at boot.
sudo systemctl enable nginx   # To re-enable the service to start up at boot.
```

```shell
$ sudo nginx -t               # To verify the syntax of your configuration
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

## Step 3 – Important Nginx Files and Directories

Now that you know how to manage the Nginx service itself, you should take a few minutes to familiarize yourself with a few important directories and files.

### Content

- `/var/www/html`: The actual web content, which by default only consists of the default Nginx page you saw earlier, is served out of the /var/www/html directory. This can be changed by altering Nginx configuration files.

### Server Configuration

- `/etc/nginx`: The Nginx configuration directory. All of the Nginx configuration files reside here.
- `/etc/nginx/nginx.conf`: The main Nginx configuration file. This can be modified to make changes to the Nginx global configuration.
- `/etc/nginx/sites-available/`: The directory where per-site server blocks can be stored. Nginx will not use the configuration files found in this directory unless they are linked to the sites-enabled directory. Typically, all server block configuration is done in this directory, and then enabled by linking to the other directory.
- `/etc/nginx/sites-enabled/`: The directory where enabled per-site server blocks are stored. Typically, these are created by linking to configuration files found in the sites-available directory.
- `/etc/nginx/snippets`: This directory contains configuration fragments that can be included elsewhere in the Nginx configuration. Potentially repeatable configuration segments are good candidates for refactoring into snippets.

### Server Logs

- `/var/log/nginx/access.log`: Every request to your web server is recorded in this log file unless Nginx is configured to do otherwise.
- `/var/log/nginx/error.log`: Any Nginx errors will be recorded in this log.

To check the logs in the server console, run command:

```shell
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## References

- [digitalocean - How To Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04/)
- [digitalocean - How To Install Nginx on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)
- [stackoverflow - Where can I find the error logs of nginx](https://stackoverflow.com/questions/1706111/where-can-i-find-the-error-logs-of-nginx-using-fastcgi-and-django)
