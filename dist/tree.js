module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}({0:function(e,t){e.exports=require("vscode")},5:function(e,t,n){"use strict";n.r(t),n.d(t,"name",(function(){return r})),n.d(t,"TreeDataProvider",(function(){return c}));const r="tree",o=n(0);var u,i=(u=function(e,t){return(u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}u(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),c=function(){function e(){this.data=[new l("cars",[new l("Ford",[new l("Fiesta"),new l("Focus"),new l("Mustang")]),new l("BMW",[new l("320"),new l("X3"),new l("X5")])])]}return e.prototype.getTreeItem=function(e){return console.log("getTreeItem"),e},e.prototype.getChildren=function(e){return console.log("getChildren"),void 0===e?this.data:e.children},e}(),l=function(e){function t(t,n){console.log("TreeItem");var r=e.call(this,t,void 0===n?o.TreeItemCollapsibleState.None:o.TreeItemCollapsibleState.Expanded)||this;return r.children=n,r.command={command:"extension.nodeSelect",title:"",arguments:[t]},r}return i(t,e),t}(o.TreeItem)}});
//# sourceMappingURL=tree.js.map