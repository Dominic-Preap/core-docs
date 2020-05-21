---
id: install-redis
title: Install Redis (Ubuntu 18.04)
sidebar_label: Install Redis
---

[Redis](https://redis.io/) is an in-memory key-value store known for its flexibility, performance, and wide language support.

## Installing Redis

In order to get the latest version of Redis, we will use `apt` to install it from the official Ubuntu repositories.

Update your local `apt` package cache and install Redis by typing:

```shell
sudo apt update
sudo apt install redis-server
```

## Configuring and Secure Redis

There are several important key configuration that need to be done. Open this file with your preferred text editor:

```shell
sudo nano /etc/redis/redis.conf
```

```bash
supervised systemd    # Change from `no` to `systemd` to manage Redis as a service
# bind 127.0.0.1      # Comment this to allow Redis access anywhere.
port 2122             # By default Redis port is 6379, change it to other port and have to configure firewall.
databases 1           # By default Redis create 16 database, we need only one.
requirepass PASSWORD  # Don't come up with your password, use openssl to generate strong password. See below.
```

**NOTE:** Thus, it's important that you specify a very strong and very long value as your password. Rather than make up a password yourself, you can use the openssl command to generate a random one, as in the following example. By piping the output of the first command to the second openssl command, as shown here, it will remove any line breaks produced by that the first command:

```shell
openssl rand 60 | openssl base64 -A
```

That’s the only change you need to make to the Redis configuration file at this point, so save and close it when you are finished. Then, restart the Redis service to reflect the changes you made to the configuration file:

```shell
sudo systemctl restart redis.service
```

## Renaming Dangerous Commands

The other security feature built into Redis involves renaming or completely disabling certain commands that are considered dangerous.

When run by unauthorized users, such commands can be used to reconfigure, destroy, or otherwise wipe your data. Like the authentication password, renaming or disabling commands is configured in the same `SECURITY` section of the `/etc/redis/redis.conf` file.

Some of the commands that are considered dangerous include: **FLUSHDB, FLUSHALL, KEYS, PEXPIRE, DEL, CONFIG, SHUTDOWN, BGREWRITEAOF, BGSAVE, SAVE, SPOP, SREM, RENAME, and DEBUG**. This is not a comprehensive list, but renaming or disabling all of the commands in that list is a good starting point for enhancing your Redis server’s security.

Whether you should disable or rename a command depends on your specific needs or those of your site. If you know you will never use a command that could be abused, then you may disable it. Otherwise, it might be in your best interest to rename it.

To enable or disable Redis commands, open the configuration file once more:

```bash
sudo nano /etc/redis/redis.conf
```

```bash
. . .
# It is also possible to completely kill a command by renaming it into
# an empty string:
#
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command DEBUG ""
. . .
```

To rename a command, give it another name as shown in the examples below. Renamed commands should be difficult for others to guess, but easy for you to remember:

```bash
. . .
# rename-command CONFIG ""
rename-command SHUTDOWN SHUTDOWN_MENOT
rename-command CONFIG ASC12_CONFIG
. . .
```

After renaming a command, apply the change by restarting Redis:

```shell
sudo systemctl restart redis.service
```

## Adjusting the Firewall

If you would like to be able to connect to your Redis server from the internet, we have to allow the incoming connections in `ufw`.

```bash
# NOTE: drop all unnecessary port / allow specific ip on redis port (workplace, home)
$ sudo ufw allow from [workplace_ip]/24 to any port [port_number] proto tcp
$ sudo ufw status
```

**NOTE:** For Google Cloud Server to allow firewall for Redis, you have to create a new firewall rule on [Google Console](https://console.cloud.google.com/networking/firewalls)

![Firewall](/img/docs/gcloud-redis-firewall.png)

## Testing and Accessing Redis

Start by checking that the Redis service is running:

```bash
sudo systemctl status redis
```

To test that Redis is functioning correctly, connect to the server using the command-line client:

```bash
$ redis-cli -p PORT             # Access to Cli with port config from above
127.0.0.1:2122> auth PASSWORD   # Use `auth` with your password to authorize
127.0.0.1:2122> PING            # Type `PING`, if return `PONG` mean you are authorize
```

To access Redis from your local machine, use [Redis Desktop Manager](https://redisdesktop.com/)

![Image](https://redisdesktop.com/static/img/features/all.png)

## References

- [https://redisdesktop.com/](https://redisdesktop.com/)
- [sourceforge - Redis Desktop Manager](https://sourceforge.net/projects/redis-desktop-manager.mirror/)
- [How To Install and Secure Redis on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04)
- [How To Install and Configure Redis on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04)
- [How to Install and Configure Redis on Ubuntu 14.04](https://hostpresto.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-14-04/)
