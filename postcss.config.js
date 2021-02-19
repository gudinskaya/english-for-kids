const autoprefixer = require('autoprefixer')
const functions = require('postcss-functions')
const precss = require('precss')
const atImport = require('postcss-import')
const easyImport = require('postcss-easy-import')
const postCssModules = require('postcss-modules')

module.exports = {
  plugins: [
    postCssModules({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      scopeBehaviour: 'global',
    }),
    atImport({
      plugins: [ easyImport ],
    }),
    require('postcss-assets')({
      loadPaths: [ '**' ],
    }),
    require('postcss-mq-keyframes'),
    require('postcss-flexbugs-fixes'),
    autoprefixer,
    precss(),
    functions(),
  ],
}
