<p align="center">
  <img src="assets/rubik.png" alt="">
</p>
<h1 align="center"> rubik </h1>
<p align="center">
  <b >Only one command and one structure for web development with Pure|Vue|React|Electron|Libraries</b>
</p>

<br>

<p align="center">
  <a href="https://www.npmjs.com/package/rubik-cli"><img alt="npm" src="https://img.shields.io/npm/v/rubik-cli?color=sucess"></a>
  <a href="https://standardjs.com/"><img alt="standardjs" src="https://img.shields.io/badge/code%20style-standard-sucess"></a>
  <a href="http://commitizen.github.io/cz-cli/"><img alt="commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg"></a>
  <a href="https://travis-ci.com/"><img alt="travis" src="https://travis-ci.org/rubikjs/rubik-cli.svg?branch=master"></a>
</p>

## Create an app

create a pure app
```
$ npx create-rubik-app my-app
```
create a vue app
```
$ npx create-rubik-app my-app --type vue
```
create a react app
```
$ npx create-rubik-app my-app --type react
```
create from some rep
```
$ npx create-rubik-app my-app --repo git@xxx/xxx.git
```

[More](https://github.com/rubikjs/create-rubik-app)

## Features

- [x] Same structure in all `pure|vue|react|library|electron` development
- [x] Multiple pages app support
- [x] Multiple `mode` support
- [x] Library development support
- [x] Hot reload
- [x] Data Mock
- [x] Auto re-install dependencies after `git commit/merge` if needed 
- [x] [Es lint](https://github.com/eslint/eslint)
- [x] [Style lint](https://github.com/stylelint/stylelint)
- [x] [Commit lint](https://github.com/conventional-changelog/commitlint)

[More](https://rubikjs.github.io/rubik-cli-doc/)

## Release

```
yarn release
```