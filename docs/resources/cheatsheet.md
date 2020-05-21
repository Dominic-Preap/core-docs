---
id: cheatsheet
title: Cheatsheet
sidebar_label: Cheatsheet
---

## Command-Line

### Upgrade `package.json` Dependencies

```bash
npm-check -u                      # using npm
npm show react-native@* versions  # using npm for specific module

yarn upgrade-interactive --latest # using yarn
```

### Update NodeJS with NVM

```bash
nvm install NEW_VERSION --reinstall-packages-from=OLD_VERSION
nvm alias default NEW_VERSION
```

### Restart Server with Production Environment

```bash
pm2 start process.json --env production --update-env
pm2 restart all --env production --update-env
```

## Development Issues

### Yarn using a different version of NPM

When running a script with yarn I get the following warning:

```sh
# ########## PROBLEM ##########
root@server:~/api-project# yarn start:prod
yarn run v1.13.0
$ npm run build
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1550212832350-0.8913029481260921/node but npm is using /usr/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

# ########## RESOLVE ##########
npm config set scripts-prepend-node-path true
```

**References:** [Yarn seems to be using a different version of NPM](https://github.com/yarnpkg/yarn/issues/6617)

### "node-gyp" : Permission denied

If your having a problem below when installing any dependencies that need to compile with `node-gyp`, try to set your `npm` config on your terminal below:

```bash
# ########## PROBLEM ##########
$ npm install --save sharp

> sharp@0.18.4 install /Users/hsribei/tmp/testsharp/node_modules/sharp
> node-gyp rebuild

sh: /usr/local/lib/node_modules/npm/bin/node-gyp-bin/node-gyp: Permission denied
npm WARN testsharp@1.0.0 No description
npm WARN testsharp@1.0.0 No repository field.

npm ERR! code ELIFECYCLE
npm ERR! errno 126
npm ERR! sharp@0.18.4 install: `node-gyp rebuild`
npm ERR! Exit status 126
npm ERR!
npm ERR! Failed at the sharp@0.18.4 install script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/hsribei/.npm/_logs/2017-09-20T18_41_00_055Z-debug.log

# ########## RESOLVE ##########
npm config set user 0
npm config set unsafe-perm true
```

**References:** [npm install : "node-pre-gyp: Permission denied" and sqlite3](https://github.com/jansmolders86/mediacenterjs/issues/191#issuecomment-317437604)
