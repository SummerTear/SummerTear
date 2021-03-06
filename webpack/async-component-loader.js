/**
 * code from: https://github.com/developit/preact-cli/blob/master/src/lib/webpack/async-component-loader.js
 */
const loaderUtils = require('loader-utils');

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
  this.cacheable && this.cacheable();
  const query = loaderUtils.getOptions(this) || {};
  const routeName =
    typeof query.name === 'function' ? query.name(this.resourcePath) : null;
  let name;
  if (routeName !== null) {
    name = routeName;
  } else if ('name' in query) {
    name = query.name;
  } else if ('formatName' in query) {
    name = query.formatName(this.resourcePath);
  }

  return `
    import async from 'async-component';

    function load(cb) {
      require.ensure([], function(require) {
        cb(require(${loaderUtils.stringifyRequest(
          this,
          '!!' + remainingRequest
        )}));
      }${name ? ', ' + JSON.stringify(name) : ''});
    }

    export default async(load);
  `;
};
