/**
 * 快速检测移动设备
 */
var platform = (function(window, undefined) {

  var UA = navigator.userAgent,
    mobile = {
      Android: /(Android)/i.test(UA),
      BlackBerry: /BlackBerry/i.test(UA),
      iOS: /iPhone|iPad|iPod/i.test(UA),
      Opera: /Opera Mini/i.test(UA),
      Windows: /IEMobile/i.test(UA)
    },
    isAnyMobile = mobile.Android || mobile.BlackBerry || mobile.iOS || mobile.Opera || mobile.Windows;

  return {
    isAndroid: mobile.Android,
    isBlackBerry: mobile.BlackBerry,
    isIOS: mobile.iOS,
    isOpera: mobile.Opera,
    isWindows: mobile.Windows,
    isAny: isAnyMobile,
    isOther: !isAnyMobile
  };

})(window);
