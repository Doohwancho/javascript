/* Gooact by SweetPalma, 2018. All rights reserved. */
(() => { 'use strict';

const createElement = (type, props, ...children) => {
    if (props === null) props = {};
    return {type, props, children};
};

if (typeof module != 'undefined') module.exports = {createElement};
if (typeof module == 'undefined') window.Gooact  = {createElement};

})();
