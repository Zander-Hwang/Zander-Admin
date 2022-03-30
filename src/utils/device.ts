/**
 * @Description: 设备工具类
 * @Author: Ableson
 * @Date: 2022/3/27 12:01
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/27 12:01
 */
interface deviceInter {
  match: Fn;
}

interface BrowserInter {
  browser: string;
  version: string;
}

/**
 * 检测设备类型(手机返回true,反之)
 */
export const deviceDetection = (): boolean => {
  const sUserAgent: deviceInter = navigator.userAgent.toLowerCase();
  // const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
  const bIsMidp = sUserAgent.match(/midp/i) == 'midp';
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
  const bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
  const bIsAndroid = sUserAgent.match(/android/i) == 'android';
  const bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
  const bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
  return bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;
};

/**
 * 获取浏览器型号以及版本
 */
export const getBrowserInfo = (): BrowserInter | null => {
  const ua = navigator.userAgent.toLowerCase();
  const re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
  const m = ua.match(re);
  if (m && m.length > 0) {
    return {
      browser: m[1].replace(/version/, "'safari"),
      version: m[2],
    };
  }
  return null;
};
