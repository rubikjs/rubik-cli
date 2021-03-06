# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.2.0](https://github.com/fancyboynet/rubik-cli/compare/v4.1.0...v4.2.0) (2020-10-16)


### Features

* 增加ejs模板支持 ([4ba3ef5](https://github.com/fancyboynet/rubik-cli/commit/4ba3ef5823e521928607331511a4df246a2598cc))

## [4.1.0](https://github.com/fancyboynet/rubik-cli/compare/v4.0.0...v4.1.0) (2020-10-14)


### Features

* 增加相对路径打包支持 ([6c65767](https://github.com/fancyboynet/rubik-cli/commit/6c65767a7a318efdd968649b00d884094f09baf6))

## [4.0.0](https://github.com/fancyboynet/rubik-cli/compare/v2.0.0...v4.0.0) (2020-09-23)


### ⚠ BREAKING CHANGES

* **static:** Change the static directory position.

* **static:** move the static directory out from src ([020ef91](https://github.com/fancyboynet/rubik-cli/commit/020ef91d4227130daf3674ee73c516af2d161409))

## [2.0.0](https://github.com/fancyboynet/rubik-cli/compare/v1.8.0...v2.0.0) (2020-07-16)


### ⚠ BREAKING CHANGES

* **mode:** Instead 'MODE', you need to use 'process.env.MODE' to get the '--mode' param in js
file

### Bug Fixes

* travis config ([bb6c973](https://github.com/fancyboynet/rubik-cli/commit/bb6c973341b3abd106fd1bda9c37d490eaa35821))


* **mode:** change the js variable from 'MODE' to 'process.env.MODE' ([3363234](https://github.com/fancyboynet/rubik-cli/commit/336323409ede3f6200822cd6fca79f4b1469ff9a))

## [1.8.0](https://github.com/fancyboynet/rubik-cli/compare/v1.7.0...v1.8.0) (2020-07-07)


### Features

* add auto find valid port ([14cf540](https://github.com/fancyboynet/rubik-cli/commit/14cf5409864f522f31431ada537ab5d51420a90d))

## [1.7.0](https://github.com/fancyboynet/rubik-cli/compare/v1.6.0...v1.7.0) (2020-03-08)


### Features

* **build:** add progress info when build ([dbaf54d](https://github.com/fancyboynet/rubik-cli/commit/dbaf54d182f6b2c37d5934640a31491388c2f37b))

## [1.6.0](https://github.com/fancyboynet/rubik-cli/compare/v1.5.0...v1.6.0) (2019-12-13)


### Features

* **stylelint:** add formatter arg for styelint command ([48ac185](https://github.com/fancyboynet/rubik-cli/commit/48ac1858b692ede338cfee2484a95684d5aead61))

## [1.5.0](https://github.com/fancyboynet/rubik-cli/compare/v1.4.7...v1.5.0) (2019-12-06)


### Features

* **es:** add @babel/plugin-proposal-decorators ([3e0bd1d](https://github.com/fancyboynet/rubik-cli/commit/3e0bd1da9aa5f9be580b99f7f4489c2ba87763f4))

### [1.4.7](https://github.com/fancyboynet/rubik-cli/compare/v1.4.6...v1.4.7) (2019-12-03)


### Bug Fixes

* **html:** minify the css and js in style/script elements of the html ([90748d6](https://github.com/fancyboynet/rubik-cli/commit/90748d63de23819dbae2a4e1b3207fcf9741408c))

### [1.4.6](https://github.com/fancyboynet/rubik-cli/compare/v1.4.5...v1.4.6) (2019-11-28)


### Bug Fixes

* **stylelint:** fix error on the result is undefined ([a786a50](https://github.com/fancyboynet/rubik-cli/commit/a786a50343e286073e24873e586d4d9089aababa))

### [1.4.5](https://github.com/fancyboynet/rubik-cli/compare/v1.4.4...v1.4.5) (2019-11-28)


### Bug Fixes

* **check-package:** pass exeArgs to the child_progress ([1ff5f51](https://github.com/fancyboynet/rubik-cli/commit/1ff5f51024978cf8f14ae0da8e995df1f94b017e))

### [1.4.4](https://github.com/fancyboynet/rubik-cli/compare/v1.4.3...v1.4.4) (2019-11-22)


### Bug Fixes

* **serve:** fix the stylelint error output repeat occure bug ([1455a83](https://github.com/fancyboynet/rubik-cli/commit/1455a832439ee65992fdb4282706eb123ca8013e))

### [1.4.3](https://github.com/fancyboynet/rubik-cli/compare/v1.4.2...v1.4.3) (2019-11-22)


### Bug Fixes

* **stylelint:** set stylelintPlugin fix options true defalut ([626103b](https://github.com/fancyboynet/rubik-cli/commit/626103b43d7cd7c067f0c0c2f63b2e8d995cbff3))

### [1.4.2](https://github.com/fancyboynet/rubik-cli/compare/v1.4.1...v1.4.2) (2019-11-21)

### [1.4.1](https://github.com/fancyboynet/rubik-cli/compare/v1.3.1...v1.4.1) (2019-11-19)


### Bug Fixes

* **stylelint:** fix webpack compile stop when no style files matched ([f113b40](https://github.com/fancyboynet/rubik-cli/commit/f113b4000777a6a9e8ce5af8ce49be909df02238))

### [1.3.1](https://github.com/fancyboynet/rubik-cli/compare/v1.3.0...v1.3.1) (2019-11-15)


### Bug Fixes

* **lint:** fix repeat message in webpack mode ([2816ad0](https://github.com/fancyboynet/rubik-cli/commit/2816ad00606f9fb2d013e2d719d333685f68b1e8))

## [1.3.0](https://github.com/fancyboynet/rubik-cli/compare/v1.2.6...v1.3.0) (2019-11-15)


### Features

* **react:** improve the react support ([7590cb9](https://github.com/fancyboynet/rubik-cli/commit/7590cb996202296bd06532753e023e912a1e1ab8))

### [1.2.6](https://github.com/fancyboynet/rubik-cli/compare/v1.2.5...v1.2.6) (2019-11-14)

### [1.2.5](https://github.com/fancyboynet/rubik-cli/compare/v1.2.4...v1.2.5) (2019-11-14)


### Bug Fixes

* **check-package:** fix the wrong file map ([62d8811](https://github.com/fancyboynet/rubik-cli/commit/62d881184349471810b85137b26b841324602c93))

### [1.2.4](https://github.com/fancyboynet/rubik-cli/compare/v1.2.3...v1.2.4) (2019-11-13)

### [1.2.3](https://github.com/fancyboynet/rubik-cli/compare/v1.2.2...v1.2.3) (2019-11-13)

### [1.2.2](https://github.com/fancyboynet/rubik-cli/compare/v1.2.1...v1.2.2) (2019-11-13)


### Bug Fixes

* **debug:** output the right current version in debug mode ([e94b2ac](https://github.com/fancyboynet/rubik-cli/commit/e94b2acd13af9280a5aa15ca4f6431635ad91644))

### [1.2.1](https://github.com/fancyboynet/rubik-cli/compare/v1.2.0...v1.2.1) (2019-11-13)


### Bug Fixes

* **debug:** output the correct current version ([0887cf0](https://github.com/fancyboynet/rubik-cli/commit/0887cf07cd8bc8d8f53366d38b77e1005d9dacf0))

## [1.2.0](https://github.com/fancyboynet/rubik-cli/compare/v1.1.5...v1.2.0) (2019-11-13)


### Features

* **debug:** import debug module ([03b240b](https://github.com/fancyboynet/rubik-cli/commit/03b240b4661b8b9584545837e2ac2951d4c02e7f))

### [1.1.5](https://github.com/fancyboynet/rubik-cli/compare/v1.1.4...v1.1.5) (2019-11-11)

### [1.1.4](https://github.com/fancyboynet/rubik-cli/compare/v1.1.3...v1.1.4) (2019-11-11)

### [1.1.3](https://github.com/fancyboynet/rubik-cli/compare/v1.1.2...v1.1.3) (2019-11-11)


### Bug Fixes

* **lint:** fix stylelint usaged in lint-staged ([488ed92](https://github.com/fancyboynet/rubik-cli/commit/488ed92037853c346b04e01508529b87328137be))

### [1.1.2](https://github.com/fancyboynet/rubik-cli/compare/v1.1.1...v1.1.2) (2019-11-08)


### Bug Fixes

* **commitlint:** fix path error ([68b505c](https://github.com/fancyboynet/rubik-cli/commit/68b505c408373c223c4f62e23aa9321d7112eb2a))

### [1.1.1](https://github.com/fancyboynet/rubik-cli/compare/v1.0.0...v1.1.1) (2019-11-08)


### ⚠ BREAKING CHANGES

* **config:** delete the openStandardJs config

* **config:** remove the openStandardJs config ([e8429ae](https://github.com/fancyboynet/rubik-cli/commit/e8429ae32ee0d38a718dc2b5104852beb3b6eff4))

## [1.0.0](https://github.com/fancyboynet/rubik-cli/compare/v0.11.0...v1.0.0) (2019-11-08)


### Bug Fixes

* fix the repeat prefix log in check-package command ([28f4914](https://github.com/fancyboynet/rubik-cli/commit/28f49148b3919cfb0990bf5f5f35a3e1018b0b48))

## [0.11.0](https://github.com/fancyboynet/rubik-cli/compare/v0.10.0...v0.11.0) (2019-11-07)


### Features

* add stylelint support ([4c54a9b](https://github.com/fancyboynet/rubik-cli/commit/4c54a9b13fa69db9552b08caa92aa632b57d86dd))
* add stylelint-webpack-plugin ([964b05a](https://github.com/fancyboynet/rubik-cli/commit/964b05a48993f4c2579122fdc8367dfb43933c7b))

## [0.10.0](https://github.com/fancyboynet/rubik-cli/compare/v0.9.2...v0.10.0) (2019-11-05)


### Features

* add app commit lint ([b6a596f](https://github.com/fancyboynet/rubik-cli/commit/b6a596f8c09672109dba16308b176570c9653a54))
* **a:** b ([31e11b3](https://github.com/fancyboynet/rubik-cli/commit/31e11b33c7ec08ca95c17784369a9436c92ec52e))
* add commit lint feature ([8160ec1](https://github.com/fancyboynet/rubik-cli/commit/8160ec1bb63d83a60ff6f688811a5109d19fcfc7))
* add standard-version ([6dd14ef](https://github.com/fancyboynet/rubik-cli/commit/6dd14ef754ab10a32d09a653368f94c707b93fb6))
* commit lint ([468da8b](https://github.com/fancyboynet/rubik-cli/commit/468da8b8868c9f2ff0731a6a2b212e7f1ef181dd))
* test ([0449638](https://github.com/fancyboynet/rubik-cli/commit/0449638cff1deb80fdfc870915e044cdd3e17795))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
