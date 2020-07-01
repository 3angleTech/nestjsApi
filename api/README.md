## Prerequisites

VSCode
VSCode Plugins:
* EditorConfig: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
* TSLint:       https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin

Node.js: min lts/erbium

## Installation

```bash
$ npm install
```

Add ```127.0.0.1 3at-nest-postgres``` to ```/etc/hosts``` so you can run the app locally also, not only in docker container.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Development

Adding modules, services, controllers:

```bash
nest generate module [MODULE_NAME] --no-spec
nest generate service [SERVICE_NAME] --flat
nest generate controller [CONTROLLER_NAME] --flat --no-spec
```

Debugging

* Open directly the `api` folder in VSCode.
* Run the already available `Debug Api` debug configuration.
