//UMD supports both CommonJS and AMD module systems
//works both in client side env and server side(nodejs)

// math.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.math = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return {
        add: function(a, b) {
            return a + b;
        }
    };
}));

// main.js
// Usage depends on the environment (CommonJS, AMD, or global)