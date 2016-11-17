/**
 * Require classes.
 */

var Horizontal = require('./horizontal')

/**
 * Set default values.
 *
 * @api public
 */

var defaults = {
    callback () {
    },
}

/**
 * Expose proper type of `Powerange`.
 */

module.exports = function (element, options) {
    options = options || {}

    for (var i in defaults) {
        if (options[i] == null) {
            options[i] = defaults[i]
        }
    }

    return new Horizontal(element, options)
}
