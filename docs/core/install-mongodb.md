---
id: install-mongodb
title: Install MongoDB (Ubuntu 18.04)
sidebar_label: Install MongoDB
---

[MongoDB](https://www.mongodb.com/) is a free and open-source NoSQL document database used commonly in modern web applications. This tutorial will help you set up MongoDB on your server for a production application environment.

## Installing MongoDB

Ubuntu ensures the authenticity of software packages by verifying that they are signed with GPG keys, so we first have to import they key for the official MongoDB repository. Next, we have to add the MongoDB repository details so `apt` will know where to download the packages from.

Issue the following command to create a list file for MongoDB.

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

After adding the repository details, we need to update the packages list.

```shell
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```

```bash
sudo apt-get update
sudo apt-get install -y mongodb-org   # Install the MongoDB package itself.
sudo systemctl status mongod          # check service status
sudo systemctl enable mongod          # enable automatically starting MongoDB when the system starts
```

## Configuring and Securing MongoDB

Let’s create the actual users. Open your mongo shell and switch to the admin database:

Create the “admin” user (you can call it whatever you want)

```shell
db.createUser({ user: "admin", pwd: "adminpassword", roles: [{ role: "userAdminAnyDatabase", db: "admin" }], mechanisms:["SCRAM-SHA-1"] })
```

In this case we’re giving the user the `userAdminAnyDatabase` role. This means that the `admin` user will be able manage (create, update, delete) users on all the databases of the MongoDB instance.

You can check that the user has been correctly created with this command:

```shell
db.auth("admin", "adminpassword")
```

We are now going to _enable authentication_ on the MongoDB instance, by modifying the `mongod.conf` file.

```shell
sudo nano /etc/mongod.conf
```

Make changes these lines at the bottom of the YAML config file:

```yaml
# network interfaces
net:
  port: 27017 # Default Mongo Port, Should change it
  bindIp: 0.0.0.0 # Make sure to bind multiple ip (no space). ex: 127.0.0.1,172.21.200.200

security:
  authorization: enabled
```

Now restart the _mongod_ service (Ubuntu syntax).

```bash
$ sudo service mongod restart
$ sudo service mongod status
# OR
$ sudo systemctl restart mongod
$ sudo systemctl status mongod
```

Let’s go back in the `mongo` shell. Switch to the database `admin` and authenticate with the previously created user (called “admin”). Given that the user has the “userAdmin” role, it will be able to create and manage other users.

```bash
use admin
db.auth("admin", "adminpassword")
```

Now switch to your database and create a new user specifically for the database.

The following command will create an user with the role of `dbOwner` on your database. The `dbOwner` role will give to the user read and write permissions on all the collections of the database. Read more [here](https://docs.mongodb.com/manual/reference/built-in-roles/#dbOwner).

```bash
use yourdatabase
db.createUser({ user: "youruser", pwd: "yourpassword", roles: [{ role: "dbOwner", db: "yourdatabase" }], mechanisms:["SCRAM-SHA-1"] })
```

Now check that everything went fine with the `auth` function.

```bash
db.auth("youruser", "yourpassword")
show collections
```

## Adjusting the Firewall

If you intend to use the MongoDB server only locally with applications running on the same server, it is a recommended and secure setting. However, if you would like to be able to connect to your MongoDB server from the internet, we have to allow the incoming connections in `ufw`.

in most cases, MongoDB should be accessed only from certain trusted locations, such as another server hosting an application. To accomplish this task, you can allow access on MongoDB's default port while specifying the IP address of another server that will be explicitly allowed to connect.

```bash
# Make sure your Firewall is active and enabled on system startup
sudo ufw enable

# NOTE: drop all unnecessary port / allow specific ip on mongo port (workplace, home)
$ sudo ufw allow from [workplace_ip]/24 to any port [port_number] proto tcp
$ sudo ufw status
```

**NOTE:** For Google Cloud Server to allow firewall for Redis, you have to create a new firewall rule on [Google Console](https://console.cloud.google.com/networking/firewalls)

![Firewall](/img/docs/gcloud-redis-firewall.png)

## Accessing MongoDB

To access MongoDB from your local machine, use [Robo 3T](https://robomongo.org/) or [Studio 3T](https://robomongo.org/)

![Image](https://robomongo.org/static/screens-transparent-6e2a44fd.png)

## References

- [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
- [How to Install MongoDB on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
- [How to setup user authentication in MongoDB 3.6](https://medium.com/@matteocontrini/how-to-setup-auth-in-mongodb-3-0-properly-86b60aeef7e8)
- [What does the --bindip configuration option in mongodb does?](https://stackoverflow.com/questions/37371081/what-does-the-bindip-configuration-option-in-mongodb-does)
- [MongoDB — Ubuntu 16.04 (code=exited, status=14) AWS lightsail problem](https://medium.com/@gabrielpires/mongodb-ubuntu-16-04-code-exited-status-14-aws-lightsail-problem-417ffc78cb11)
- [Mongodb getting error while creating new user](https://stackoverflow.com/questions/51149455/mongodb-getting-error-while-creating-new-user)
