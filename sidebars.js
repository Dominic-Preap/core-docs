/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  nestjs: {
    'Getting Started': [
      'nestjs/getting-started/introduction',
      'nestjs/getting-started/overview',
      'nestjs/getting-started/installation',
    ],
    'Built-In Modules': [
      'nestjs/lib/config',
      'nestjs/lib/firebase-admin',
      'nestjs/lib/google-cloud-storage',
      'nestjs/lib/graphql-request',
      'nestjs/lib/ioredis',
      'nestjs/lib/mailer',
      'nestjs/lib/mongoose',
      'nestjs/lib/typeorm',
    ],
  },

  docs: {
    // Test: ['company/issues-labels', 'company/pull-request-template'],
    '📝 Resources': [
      'resources/guide',
      'resources/website-documentation',
      'resources/node-package',
      'resources/developer-tool',
      'resources/cheatsheet',
      'resources/vscode',
    ],
    '📊 Database Setup': [
      'core/install-mongodb',
      'core/install-mysql',
      'core/install-redis',
    ],
    '🖥️ Nginx': [
      'nginx/nginx-1',
      'nginx/nginx-2',
      'nginx/nginx-3',
      'nginx/nginx-4',
      'nginx/nginx-5',
    ],
    '🔐 Security': ['auth0/basic', 'auth0/ldap'],
    '📜 SSL Certificate': [
      'ssl-certificate/localhost',
      'ssl-certificate/iis-1',
      'ssl-certificate/iis-2',
      'ssl-certificate/iis-3',
    ],
  },
};
