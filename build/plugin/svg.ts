/**
 * @Description: Vite插件。svgIcon组件。
 * @PageHome: https://github.com/anncwb/vite-plugin-svg-icons
 * @Author: Ableson
 * @Date: 2022/2/21 14:43
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 14:43
 */

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIconsPlugin(isBuild: boolean) {
  return createSvgIconsPlugin({
    // 本地svg图片地址
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    //  图标ID的样式
    symbolId: '[name]',
  });
}
