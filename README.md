# modulekit-tabs
Simple tabs for web applications (JS only and PHP+JS)

# Installation
## via npm, using browserify
```sh
npm add modulekit-tabs
```

Add `-g browserify-css` to your build command, e.g. `browserify -g browserify-css src/index.js -o app.js`.

# Usage
```js
var tabs = require('modulekit-tabs')

var pageTabs = new tabs.Tabs(document.getElementById('page'))
var tab1 = new tabs.Tab({ id: 'tab1' })
pageTabs.add(tab1)

tab1.header.innerHTML = 'Header'
tab1.content.innerHTML = 'Content of tab1'
```
