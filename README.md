# rubik-cli
Only one command for web development with Pure/Vue/React/

## Init
```
$ npx rubik-cli init
or
$ npm i -g rubik-cli
$ rubik init
```

## Structure

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
├── rubik.config.js
├── .eslintrc.js
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

## Config
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
