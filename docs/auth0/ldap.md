---
id: ldap
title: Testing with OpenLDAP
sidebar_label: Testing with OpenLDAP
---

> In this section, we required the some knowledge of [Docker](https://docs.docker.com/).

## Step 1 – Create an empty OpenLDAP Server

Let's pull OpenLDAP Image from [osixia/openldap](https://github.com/osixia/docker-openldap)

```sh
$ docker pull osixia/openldap:latest
```

Create an OpenLDAP environment file (File: `./ldap.env`)

```env
LDAP_ORGANISATION=Contoso Ltd.
LDAP_DOMAIN=contoso.com
LDAP_ADMIN_PASSWORD=P@ss1W0Rd!
LDAP_CONFIG_PASSWORD=P@ss1W0Rd!

LDAP_READONLY_USER=true
LDAP_READONLY_USER_USERNAME=ldap-ro
LDAP_READONLY_USER_PASSWORD=P@ss1W0Rd!
```

Create a docker compose file (File `./docker-compose.yml`)

```yaml
ldap:
  container_name: contosoOpenLdap
  image: osixia/openldap:latest
  ports:
    - '389:389'
    - '636:636'
  env_file:
    - ./ldap.env
  volumes:
    - ./ldap:/data/ldif
```

Create a folder to put shared files within Docker and OpenLdap (Folder `./ldap/`)

**Start the Server**

```
$ docker-compose start
```

This will be starting the server. If you prefer to see all the log within the screen, you can instead use `docker-compose up` command.

## Step 2 – Import some data in OpenLDAP Server

Right now, we have an _empty_ OpenLdap Server. What we want is a server with some users and groups in order for us to play with them within an application or during our Devs.

Download the following files (if not already) and save them within the `./ldap/` folder you’ve created earlier:

1. [00-startup.ldif](https://github.com/Nordes/Csv2Ldif/blob/master/example/00-startup.ldif)
   - Create the `users` and `groups` _OU_ (Organisation Unit) (**ou=…**,dc=contoso,dc=com)
2. [01-output-groups.ldif](https://github.com/Nordes/Csv2Ldif/blob/master/example/01-output-groups.ldif)
   - Create all the `groups` _CN_ within the `groups` _OU_ (**cn=…**,ou=groups,dc=contoso,dc=com)
3. [02-output-users.ldif](https://github.com/Nordes/Csv2Ldif/blob/master/example/02-output-users.ldif)
   - Create all the `users` _CN_ within the `users` OU (**cn=…**,ou=users,dc=contoso,dc=com)
   - Attach all the `users` to their pre-defined `group`. In our case it’s a 1-1 match.

It's now time to launch the command line tool (if possible where you have your ldif file).

Our action parameter will be using the following:

- **-f**: Import the file launching the ldapmodify command within the container
- **-d**: Use the administrator role to import
- **-w**: The administrator password (if not set, but with the -w option, it will request the password). In case the password is not set, it will fail.
- **-c**: Continue on failure (we never know, but at least it will give the logs)

**Organization Units**

```sh
$ docker exec contosoOpenLdap ldapmodify -a -x -h localhost -p 389 -D "cn=admin,dc=contoso,dc=com" -f /data/ldif/00-startup.ldif -w P@ss1W0Rd! -c
```

**Groups**

```sh
$ docker exec contosoOpenLdap ldapmodify -a -x -h localhost -p 389 -D "cn=admin,dc=contoso,dc=com" -f /data/ldif/01-output-groups.ldif -w P@ss1W0Rd! -c
```

**Users and Membership**

```sh
$ docker exec contosoOpenLdap ldapmodify -a -x -h localhost -p 389 -D "cn=admin,dc=contoso,dc=com" -f /data/ldif/02-output-users.ldif -w P@ss1W0Rd! -c
```

## Step 3 – How to see the data (tool)

You have some choice here, but since I am not a big fan of doing the query all by hand and do the request through the OpenLdap Docker instance, I prefer to use [LdapAdmin](http://www.ldapadmin.org/download/ldapadmin.html). It gives a UI which is easy to play with.

When creating a connection you will need to set the following:

| What      | Value                        | Description                                                             |
| --------- | ---------------------------- | ----------------------------------------------------------------------- |
| Host      | `localhost`                  | Since we’re running thing locally, `localhost` is good                  |
| Port      | `389`                        | Default port (unsecured). The secured is supposed to be also available. |
| Base      | `dc=contoso,dc=com`          | Base DC when opening the connection                                     |
| Auth type | `Simple Authentication`      | Option under the base                                                   |
| Username  | `cn=admin,dc=contoso,dc=com` | User to connect with                                                    |
| Password  | `P@ss1W0Rd!`                 | Admin password in this case                                             |

![ldap-imported.png](https://blog.honosoft.com/wp-content/uploads/2018/06/ldap-Imported.png)

## Step 4 – Setup LDAP with Auth0

Follow the instructions from Auth0 document sites:

1. [Using LDAP Authentication with Auth0](https://auth0.com/docs/connections/enterprise/ldap)
2. [Installing the Connector on Windows](https://auth0.com/docs/connector/install)

## Step 5 – Configure Auth0 Settings

Export the configuration of the connector from Auth0 AD LDAP Connector then extract the zip file. Open `config.json`

```json
{
  "LDAP_USER_BY_NAME": "(mail={0})",
  "LDAP_SEARCH_QUERY": "(&(objectClass=person)(mail={0}))",
  "LDAP_SEARCH_ALL_QUERY": "(objectClass=person)"
}
```

If your organization wants users to authenticate using their username (`cn`) you can set the `LDAP_USER_BY_NAME` setting to `(cn={0})`, but if users should authenticate using their email address you should set it to `(mail={0})`.

After that save `config.json` and zip all the configuration that we are just extract then import it back into Auth0 AD LDAP Connector. And then try login from auth0 dashboard.

![ldap-login.png](/img/docs/auth0/ldap-login.png)

![ldap-users.png](/img/docs/auth0/ldap-users.png)

## References

- [osixia/openldap](https://github.com/osixia/docker-openldap)
- [Ldap + Identity Server Series ー Part I ー OpenLdap on docker container](https://blog.honosoft.com/2018/06/18/ldap-identity-server-series-%E3%83%BC-part-i-%E3%83%BC-openldap-on-docker-container/)
- [Considerations for OpenLDAP and non-AD directories](https://auth0.com/docs/connector/considerations-non-ad)
