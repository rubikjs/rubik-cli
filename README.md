<p align="center">
  <img src="assets/rubik.png" alt="">
</p>
<h1 align="center"> rubik </h1>
<p align="center">
  <b >Only one command for web app development with Pure|Vue|React or javascript libraries.</b>
</p>

<br>

<p align="center">
  <a href="https://www.npmjs.com/package/rubik-cli"><img alt="npm" src="https://img.shields.io/npm/v/rubik-cli?color=sucess"></a>
  <a href="https://standardjs.com/"><img alt="standardjs" src="https://img.shields.io/badge/code%20style-standard-sucess"></a>
  <a href="http://commitizen.github.io/cz-cli/"><img alt="commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg"></a>
  <a href="https://travis-ci.com/"><img alt="travis" src="https://travis-ci.org/rubikjs/rubik-cli.svg?branch=master"></a>
</p>

## Create Rubik App
[More about create-rubik-app](https://github.com/rubikjs/create-rubik-app)
```
$ npx create-rubik-app my-app
```
or
```
$ npx create-rubik-app my-app --type react
```
or
```
$ npx create-rubik-app my-app --repo git@xxx/xxx.git
```

## APP Features

- [x] Same structure in all `pure|vue|react|library` development
- [x] Multiple pages app support
- [x] Library development support
- [x] Hot reload
- [x] Data Mock
- [x] Auto re-install dependencies after `git commit/merge` if needed 
- [x] [Es lint](https://github.com/eslint/eslint)
- [x] [Style lint](https://github.com/stylelint/stylelint)
- [x] [Commit lint](https://github.com/conventional-changelog/commitlint)


## App Structure

```
├── src
│       │
│       ├── page
│       │       ├── app
│       │       │       ├── index.html
│       │       │       ├── index.js
│       │       │       ├── style.css
│       │       │       └── ...
│       │       ├── home
│       │       
│       ├── static
│       │       └── jquery
│       │
│       │
│       ├── any-other
│
│
├── mock
│       └── index.js
│
│
├── rubik.config.js (optional)
├── webpack.config.js (optional)
├── .eslintrc.js (optional)
├── .stylelintrc.js (optional)
├── commitlint.config.js (optional)
│

```

## Library Structure

```
├── demo
│       ├── index.html
│       └── index.js
├── src
│       └── index.js
│
├── mock
│       └── index.js
│
├── rubik.config.js (optional)
├── webpack.config.js (optional)
├── .eslintrc.js (optional)
├── .stylelintrc.js (optional)
├── commitlint.config.js (optional)
│

```

## Mock
`mock/index.js`
```js
module.exports = function (app) {
  app.get('/data', function (req, res) {
    res.json({
      'data': 'hello rubik'
    })
  })
}
```

## MODE
The `build` and  `serve` command support the `mode` defined to distinguish different environment in the javascript if needed. 
```
rubik serve // development mode
rubik serve --mode qa // define qa mode
rubik serve --mode production // define production mode
```
```
rubik build // production mode
rubik build --mode qa // define qa mode
rubik build --mode development // define development mode
```
api.js
```
switch(MODE){ // eslint-disable-line no-undef
  case 'production':
    api = "production"
    break
  case 'qa':
    api = "qa"
    break
  case 'development':
    api = "development"
    break
}
```

## Custom Config
`rubik.config.js`
```
{
  "output": "dist",
  "staticName": "static",
  "templateName": "",
  "publicPath": "/",
  "cdnPublicPath": "//",
  "hashLength": 7,
  "includePage": [],
  "vendor": [],
  "host": "0.0.0.0",
  "port": 8081,
  "openStandardJs": true,
  "pageTemplateWithoutHtmlLoader": false,
  "reInstallOnPkgChange": true,
  "notReInstallOnPkgChangeFeatures": [],
  "plugins": []
}

```

## Custom Webpack
`webpack.config.js`
```
module.exports = {
  resolve: { alias: { vue: 'vue/dist/vue.esm.js' } }
}

```

## Custom Eslint
`.eslintrc.js`
```
module.exports = {
  "rules": {
    "no-new": "error"
  }
}

```

## Custom Stylelint
`.stylelintrc.js`
```
module.exports = {
  rules: {
    'max-nesting-depth': 4,
    'selector-max-type': 2,
    'selector-max-class': 3,
    'selector-max-id': 1
  }
}

```

## Custom Commitlint
`commitlint.config.js`
```
module.exports = { extends: ['@commitlint/config-angular'] }

```


## CLI Plugin
A plugin is a npm package with follow features:
- The name must like `rubik-cli-plugin-<command-name>`
- Need export a sub class of [common-bin](https://github.com/node-modules/common-bin)

`rubik-cli-plugin-hello-word`
```
module.exports = ({ Command }, options) => {
  class SubCommand extends Command {
    async run () {
      console.log(options)
    }
    get description () {
      return 'hello word'
    }
  }
  return SubCommand
}
```
`rubik.config.js`
```
plugins: [{
    name: 'hello-word',
    options: {
      foo: 'bar'
    }
  }]
```
