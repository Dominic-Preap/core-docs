---
id: overview
title: Overview
sidebar_label: Overview
---

## 📦 Architecture

### Project Structure

Structure your solution by self-contained components

```bash
•
├─ 📁assets    # Contain any files for your app. ex: email template, static data json
├─ 📁config    # Contain any configuration from a third party library. ex: firebase config
├─ 📁public    # Contain access files via public
├─ 📁src       # Main directory that stores all the business logic
│   ├─ 📁api           # Yes, Api you know it
│   ├─ 📁common        # Contain your custom functions
│   ├─ 📁lib           # Built-In modules
│   ├─ 📁models        # Contain Sequelize models
│   ├─ 📁queries       # Contain raw SQL files
│   ├─ 📁schema        # Contain Mongodb schema
│   ├─ 📄app.module.ts # Contain in-app modules
│   └─ 📄index.ts      # Server configuration and startup
```

### Built-in Modules

- [Config](/docs/nestjs/lib/config)
- Firebase Admin
- [Google Cloud Storage](/docs/nestjs/lib/google-cloud-storage)
- Mailer
- Mongoose
- Redis
- S3
- Sequelize
- Socket
- Authentication
- Cron Scheduler
- Multer Upload
- Social
- [Typeorm](/docs/nestjs/lib/typeorm)
- Excel
