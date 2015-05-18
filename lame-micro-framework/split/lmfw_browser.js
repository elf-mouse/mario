/**
 *
 * Browser testing
 * lmfw_browser.js
 *
 */
(function($) {
  $.extend({ // Add feature to the $ class
    isIpad: (/ipad/gi).test(navigator.appVersion),
    isIphone: (/iphone/gi).test(navigator.appVersion),
    isAndroid: (/android/gi).test(navigator.appVersion),
    isChrome: (/c/gi).test(navigator.appVersion),
    isOrientationAware: Boolean(window.hasOwnProperty('onorientationchange')),
    isHashChangeAware: Boolean(window.hasOwnProperty('onhashchange')),
    isStandalone: Boolean(window.navigator.standalone),
    has3d: Boolean(window.hasOwnProperty('WebKitCSSMatrix') && (new WebKitCSSMatrix()).hasOwnProperty('m11'))
  }, $);
})(myNameSpace);
