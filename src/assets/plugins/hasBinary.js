(function (root) {
  var exports = undefined,
      module = undefined,
      require = undefined;
  var define = undefined;
  var self = root,
      window = root,
      global = root,
      globalThis = root;
  (function () {
    /* global Blob File */

    /*
     * Module requirements.
     */
    function isArray(arr) {
      return Array.isArray(arr);
    }

    var toString = Object.prototype.toString;
    var withNativeBlob = typeof Blob === 'function' || typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
    var withNativeFile = typeof File === 'function' || typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';
    /**
     * Module exports.
     */

    const exports = {};

    if ("object" == typeof exports && "undefined" != typeof module) {
      module.exports = exports;
    } else if ("function" == typeof define && define.amd) define([], exports);else {
      var r;
      r = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, r.hasBin = exports;
    }
    /**
     * Checks for binary data.
     *
     * Supports Buffer, ArrayBuffer, Blob and File.
     *
     * @param {Object} anything
     * @api public
     */


    function hasBinary(obj) {
      if (!obj || typeof obj !== 'object') {
        return false;
      }

      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (hasBinary(obj[i])) {
            return true;
          }
        }

        return false;
      }

      if (typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj) || typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
        return true;
      } // see: https://github.com/Automattic/has-binary/pull/4


      if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
          return true;
        }
      }

      return false;
    }

    exports.hasBinary = hasBinary;
  }).call(root);
})( // The environment-specific global.
function () {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof this !== 'undefined') return this;
  return {};
}.call(this));