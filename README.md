<h1 align="center"> rubik </h1>
<p align="center">
  <b >Only one command for web app development with Pure/Vue/React or javascript libraries.</b>
</p>

<br>

[![NPM version][npm-image]][npm-url]
[![js-standard-style][standard-image]][standard-url]

## Init
```
$ mkdir project
$ cd project
$ npx rubik-cli init
```

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
  "notReInstallOnPkgChangeFeatures": []
}

```

## Custom Webpack Config
`webpack.config.js`
```
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevMode = process.env.NODE_ENV === 'development'


module.exports = {
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: path.resolve(__dirname, './src/style/mixins.scss')
            }
          }
        ]
      }
    ]
  }
}

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
│

```

