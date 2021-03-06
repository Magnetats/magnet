const fs = require('fs')
/*
  * initializes all models and sources them as .model-name
  */
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    const moduleName = file.split('.')[0]
    exports[moduleName] = require('./' + moduleName)
  }
})
