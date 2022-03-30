/**
 * @Description: 在index.html中最小化和使用EJS模板语法的插件。
 * @PageHome： https://github.com/anncwb/vite-plugin-html
 * @Author: Ableson
 * @Date: 2022/2/21 11:00
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 11:00
 */
import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '../constant';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean): PluginOption[] {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  };

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      // 将数据注入到EJS模板
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
      // 嵌入生成的app.config.js文件
      /* eslint-disable */
      tags: isBuild
        ? [
          {
            tag: 'script',
            attrs: { src: getAppConfigSrc() },
          },
        ]
        : [],
      /* eslint-enable */
    },
  });
}
