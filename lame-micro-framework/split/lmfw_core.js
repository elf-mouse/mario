/**
 *
 * Core                           // must be loaded first
 * lmfw_core.js
 *
 */
(function(ns) { // Create our own namespace (because it's cool)
  var $ = function(query) { // Define the core element
      return new customNL(query);
    },
    customNL = function(query, root) { // Custom Node List
      var i, l, r = (root && root.hasOwnProperty('querySelectorAll')) ? root : document;
      if (query.nodeType) { // query is already a Node
        query = [query];
      } else if (typeof query === 'string') { // query is a string
        query = r.querySelectorAll(query);
      } else if (!(query instanceof Array)) { // if none of the above, query must be an array
        return null;
      }
      this.length = query.length;
      for (i = 0, l = this.length; i < l; i++) {
        this[i] = query[i];
      }
      return this;
    },
    readyFn = [], // Holds all functions to be executed on DOM ready
    DOMReady;
  DOMReady = function() { // Executed on DOMContentLoaded
    var i, l;
    for (i = 0, l = readyFn.length; i < l; i++) {
      readyFn[i]();
    }
    readyFn = null;
    document.removeEventListener('DOMContentLoaded', DOMReady, false);
  };
  $.extend = function(obj, target) { // Merge to objects
    var prop;
    target = target || customNL.prototype; // To help plugin development
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        target[prop] = obj[prop];
      }
    }
  };
  $.extend({ // Add feature to the $ class
    ready: function(fn) { // Execute functions on DOM ready
      if (readyFn.length === 0) {
        document.addEventListener('DOMContentLoaded', DOMReady, false);
      }
      readyFn.push(fn);
    }
  }, $);
  window[ns] = $; // Expose ns to the world
})('myNameSpace'); // Execute our namespace
