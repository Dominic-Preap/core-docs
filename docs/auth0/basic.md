---
id: basic
title: Basic Auth0 Initialization
sidebar_label: Basic Auth0 Initialization
---

## Step 1 - Create Tenants

Tenant should separate from development and production to avoid confusion.

- **yourapp-dev.auth0.com**
- **yourapp-staging.auth0.com**
- **yourapp-prod.auth0.com**

![](/img/docs/auth0/create-tenant.png)

## Step 2 - Create Applications

Applications should create 4 in normal case:

- **Backend** (Machine to Machine)
- **Android** (Native)
- **IOS** (Native)
- **Web App** (Single Page Application)

![](/img/docs/auth0/applications.png)

**`Note:`** When create **_Machine to Machine_** Applications, we must set **Token Endpoint Authentication Method** to `POST` to allow our backend server to manage auth0 users manually.

![](/img/docs/auth0/application-backend-method.png)

![](/img/docs/auth0/application-backend-apis.png)

For the other Application Type, don't forget to choose Connections (sources of users). It can be from your auth0 database, social or any enterprise.

![](/img/docs/auth0/application-connections.png)

## Step 3 - Create APIs

By default, when we create a new tenant, we will have **System API** (Auth0 Management API). The **System API** are used only with Application Type **Machine to Machine** in our case is **_Backend Dev_**.

Secondly, we create **Custom API** in this case we case `Dev`. The **Custom API** will be used as `audience` for front-end teams.

![](/img/docs/auth0/apis.png)

![](/img/docs/auth0/apis-machine-to-machine.png)

## Step 4 - Create Database

Create Database for if you are manually create user in your database store. You can set any name you want and choose your own settings. And finally, allow any Applications to use this connection.

![](/img/docs/auth0/database.png)

![](/img/docs/auth0/database-applications.png)

## Import Existing Users

We can also import users from existing source by go to **Extensions** and find **User Import / Export**. Login into the extension, and choose your json file (`user.json`) then choose your database connection and finally click import. Make sure your json format is correct.

![](/img/docs/auth0/import-users-extension.png)

![](/img/docs/auth0/import-users.png)

```json
[
  {
    "given_name": "Admin",
    "family_name": "HR",
    "nickName": "Admin",
    "name": "Admin",
    "email": "admin.hr@testing.com",
    "password_hash": "$2a$10$yC.WZx/PRY2boaDQ1ahaLuZL4YdZVft78VgZab382t6YMO//XgtDm",
    "username": "85510123456789",
    "email_verified": true,
    "verify_email": false
  }
]
```
