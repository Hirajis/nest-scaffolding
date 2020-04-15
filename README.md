<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Nest Scaffolding 

[Nest scaffolding](./docs/scaffolding.md)

## Installation

```bash
$ npm install
```

## First install nestjs cli on your local machine with command
npm i -g @nestjs/cli

## install copy files npm on your local machine with following command to copy required files into dist folder for build  
npm i copyfiles -g

## Set the typeorm configuration to connect db
```
1. Create ormconfig.json file in root directory if it is not exist

2. Put db creds in ormconfig.js file
  Example:
  module.exports = {
    "type": "mysql",
    "port": process.env.DBPORT,
    "host": process.env.HOST,
    "username": process.env.DBUSER,
    "password": process.env.DBPASSWORD,
    "database": process.env.DATABASE,
    "entities": [
        "src/**/*.entity{.ts,.js}"
    ],
    "synchronize": false
}
3. Be carefull while setting up "synchronize"
 synchronize - Indicates if database schema should be auto created on every application launch. Be careful with this option and don't use this in production - otherwise you can lose production data. This option is useful during debug and development. 

  Make sure you are using synchronize = false, if you are connecting to existing db, and you don't want your entities to be in sync with tables,

  Please don't create entities manually, use typeorm entity generator link: https://www.npmjs.com/package/typeorm-model-generator to create entities 

  Example: typeorm-model-generator -h localhost -d test -p 3306 -u root -x "" -e mysql

 4. Please refer https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md for connection options as per databases```


```

## Using OKTA for your web/mobile app for authentication? 
```
If you are using OKTA to add authentication to your web/mobile app and using Node.js to validate token sent by OKTA on server after authentication then you must follow the following steps in your project directory

1. Use `oauth2.middleware.ts` to verify access token sent by OKTA and allow users to access resources if token is valid 
2. Remove `auth.middleware.ts` file from your project directory
3. Uncomment .apply(OAuth2Middleware) and its import and remove .apply(AuthMiddleware) and its import from app.module.ts file.
4. Update OKTA configuration for JWT verification in oauth2.middleware.ts file 
5. For more detail refer https://developer.okta.com/quickstart/#/angular/nodejs/express 
```

## Running the app on developers machine

## Development without watch mode
$ npm run start

## Development with watch mode
$ npm run start:dev

## create build
$ npm run prestart:build

## Running the app on deployment server

## We are using pm2 on server to run the app
Install PM2 `$ npm install pm2 -g` on server to run the app 

## dev server 
$ npm run devservermode

## qa server 
$ npm run qaservermode

## production server
$ npm run prodservermode

## Test
```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

  Nest is [MIT licensed](LICENSE).

