---
id: names
title: Naming conventions
sidebar_label: Naming conventions
---

## Organization profile

A GitHub organization is a collection of user accounts that owns repositories. Organization profile is essential for the product. Information must be complete including: Organization name, Logo, Email, Description, URL, Location.

![Github Organization](/img/docs/company/github-organization.jpg)

## Github repositories

To name repositories conveniently, we separate those by type. We use a postfix to indicate what type of component the repo contains. We would recommend to use `lowercase-with-hyphens` which is widely used and it is easy to understand.

![Github Repositories](/img/docs/company/github-repositories.png)

### Server-side application

Server-side application is used to interact with storage like databases or files, render pages to the client, process user's input and submit back to the server. A few examples are [ASP.NET](http://www.asp.net/), [Laravel](https://laravel.com/) and [Django](https://www.djangoproject.com/).

- `<product>-app` to indicate full application
- `<product>-server` to indicate largely api-only service

### Microservices

Microservices is an architectural style that structures an application as a collection of services that are highly maintainable and independent services.

- `<product>-service-<name>` to indicate microservice, e.g. `quasar-service-account`

### Web application

Web application mostly are for static generated sites and server-side rendered apps.

- `<product>-webapp` to indicate portal web app or web admin
- `<product>-website` to indicate website generally dynamic and interactive
- `<product>.<TLD>` to indicate generally landing website, e.g. `quasar.dev`
- `<subdomain>.<product>.<TLD>` to indicate subdomain website, e.g. `blog.quasar.dev`

### Mobile & Desktop

- `<product>-android` to indicate an native android app
- `<product>-ios` to indicate an native iOS app
- `<product>-hybrid` to indicate hybrid mobile app
- `<product>-desktop` to indicate desktop app
- `<product>-flutter` to indicate flutter mobile app _(optional)_
- `<product>-react-native` to indicate react-native mobile app _(optional)_
- `<product>-electron` to indicate electron desktop app _(optional)_

## References

- [Tails Engineering Handbook](https://talis.github.io/topics/names.html)
- [Effective Repository Naming Conventions to Help Scale Your Business](https://jfrog.com/blog/the-significance-of-names/)
