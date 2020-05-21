---
id: install-mysql
title: Install MySQL (Ubuntu 18.04)
sidebar_label: Install MySQL
---

[MySQL](https://www.mysql.com/) is an open-source database management system, commonly installed as part of the popular LAMP (Linux, Apache, MySQL, PHP/Python/Perl) stack. It uses a relational database and SQL (Structured Query Language) to manage its data.

## Installing MySQL

On Ubuntu 18.04, only the latest version of MySQL is included in the APT package repository by default. At the time of writing, that's MySQL 5.7

To install it, update the package index on your server with `apt`:

```bash
sudo apt update                 # update package
sudo apt install mysql-server   # install mysql package
sudo systemctl status mysql     # check mysql service status
```

## Securing MySQL

For fresh installations, you'll want to run the included security script. This changes some of the less secure default options for things like remote root logins and sample users.

```bash
sudo mysql_secure_installation
```

**NOTE:** From there, you can press `Y` and then `ENTER` to accept the defaults for all the subsequent questions. This will remove some anonymous users and the test database, disable remote root logins, and load these new rules so that MySQL immediately respects the changes you have made.

```sh
Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD PLUGIN can be used to test passwords and improve security.
It checks the strength of password and allows the users to set only those
passwords which are secure enough. Would you like to setup VALIDATE PASSWORD plugin?

(Press y|Y for Yes, any other key for No) : y # press 'y'

There are three levels of password validation policy:
LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, and special characters, and dictionary file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 2  # press number '2'

Please set the password for root here.

New password: YOUR_STRONG_PASSWORD           # make sure your password is strong
Re-enter new password: YOUR_STRONG_PASSWORD  # re-enter again

Estimated strength of the password: 100
Do you wish to continue with the password provided? (Press y|Y for Yes, any other key for No) : y # press 'y'
```

```sh
By default, a MySQL installation has an anonymous user, allowing anyone to log
into MySQL without having to have a user account created for them. This is
intended only for testing, and to make the installation go a bit smoother.
You should remove them before moving into a production environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : y # press 'y'
```

```sh
Normally, root should only be allowed to connect from 'localhost'. This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y # press 'y'
```

```sh
By default, MySQL comes with a database named 'test' that anyone can
access. This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y # press 'y'
```

```sh
Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y # press 'y'
```

## Adjusting User Authentication and Privileges

In Ubuntu systems running MySQL 5.7 (and later), the root user is authenticated by the `auth_socket` plugin by default.

The `auth_socket` plugin authenticates users that connect from the localhost through the Unix socket file. This means that you can't authenticate as a root by providing a password.

To log in to the MySQL server as the root user type:

```bash
sudo mysql
```

You have to change the authentication method from `auth_socket` to `mysql_native_password` and grant the user with access to all databases. You can do that by running the following command:

```shell
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
mysql> FLUSH PRIVILEGES;
mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
mysql> exit
```

Alternatively, some may find that it better suits their workflow to connect to MySQL with a dedicated user. To create such a user, open up the MySQL shell once again:

```bash
sudo mysql -u root -p
```

```shell
mysql> CREATE USER 'sammy'@'localhost' IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;
mysql> exit
```

> If you're having a message `*Host "xxx.xx.xxx.xxx" is not allowed to connect to this MySQL server`, it's possibly a security precaution. Go check this [stackoverflow](https://stackoverflow.com/questions/1559955/host-xxx-xx-xxx-xxx-is-not-allowed-to-connect-to-this-mysql-server) or create another user with `%`.

```shell
mysql> CREATE USER 'sammy'@'%' IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'%' WITH GRANT OPTION;
mysql> exit
```

## Configuring MySQL

Access and tweak your configuration in file `/etc/mysql/my.cnf`. But first, take a look on default configuration in `/etc/mysql/mysql.conf.d/mysqld.cnf` before making any changes.

```bash
sudo nano /etc/mysql/my.cnf
```

```ini
[mysqld]

# Comment to allow remotely login
# bind-address = 127.0.0.1

# Or allow access remotely
bind-address = 0.0.0.0

# By default, MySQL port is 3306
port = 2206

# Increase max connection if we have more users requesting
max_connections = 10000

# Increase cache query size to improve query performance
query_cache_size = 128M
```

Then restart your service to make it takes effect.

```bash
sudo systemctl restart mysql
```

## Adjusting the Firewall

If you would like to be able to connect to your Redis server from the internet, we have to allow the incoming connections in `ufw`.

```bash
# NOTE: drop all unnecessary port / allow specific ip on redis port (workplace, home)
$ sudo ufw allow from [workplace_ip]/32 to any port [port_number] proto tcp
$ sudo ufw status
```

**NOTE:** For Google Cloud Server to allow firewall for Redis, you have to create a new firewall rule on [Google Console](https://console.cloud.google.com/networking/firewalls).

![Firewall](/img/docs/gcloud-redis-firewall.png)

## Checking MySQL Performance

[MySQLTuner](https://github.com/major/MySQLTuner-perl) is a script written in Perl that will assist you with your MySQL configuration and make recommendations for increased performance and stability.

Download & Install

```bash
wget http://mysqltuner.pl/ -O mysqltuner.pl
wget https://raw.githubusercontent.com/major/MySQLTuner-perl/master/basic_passwords.txt -O basic_passwords.txt
wget https://raw.githubusercontent.com/major/MySQLTuner-perl/master/vulnerabilities.csv -O vulnerabilities.csv
chmod +x mysqltuner.pl
./mysqltuner.pl
```

![mysqltuner.png](https://github.com/major/MySQLTuner-perl/raw/master/mysqltuner.png)

## Accessing MySQL

To access MySQL from your local machine, use [MySQL Workbench](https://dev.mysql.com/downloads/workbench/). Also check how to [Creating A New MySQL Connection](https://dev.mysql.com/doc/workbench/en/wb-mysql-connections-new.html).

![home.png](https://dev.mysql.com/doc/workbench/en/images/wb-getting-started-tutorial-home.png)

![connection.png](https://dev.mysql.com/doc/workbench/en/images/wb-mysql-connections-setup-new-connection.png)

## References

- [MySQLTuner](https://github.com/major/MySQLTuner-perl)
- [How to Install MySQL on Ubuntu 18.04 - digitalocean](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04)
- [How to Install MySQL on Ubuntu 18.04 - linuxize](https://linuxize.com/post/how-to-install-mysql-on-ubuntu-18-04/)
- [mysql_secure_installation](https://mariadb.com/kb/en/library/mysql_secure_installation/)
- [Download MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Creating A New MySQL Connection (Simple)](https://dev.mysql.com/doc/workbench/en/wb-mysql-connections-new.html)
- [MySql my.cnf recommended settings](https://dba.stackexchange.com/questions/130809/mysql-my-cnf-recommended-settings)
- [Ten MySQL performance tuning settings after installation](https://www.percona.com/blog/2014/01/28/10-mysql-performance-tuning-settings-after-installation/)
- [Gist - scottvrosenthal/my.cnf](https://gist.github.com/scottvrosenthal/5383554)
- [Host 'xxx.xx.xxx.xxx' is not allowed to connect to this MySQL server](https://stackoverflow.com/questions/1559955/host-xxx-xx-xxx-xxx-is-not-allowed-to-connect-to-this-mysql-server)
