/**
 * @Description: Vite plugin for website theme color switching
 * @PageHome: https://github.com/GitOfZGT/vite-plugin-theme-preprocessor
 * @Author: Ableson
 * @Date: 2022/2/21 15:29
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 15:29
 */
import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor';

export function configThemePlugin() {
  return themePreprocessorPlugin({
    scss: {
      multipleScopeVars: [
        {
          scopeName: 'layout-theme-default',
          path: 'src/style/color/default-vars.scss',
        },
        {
          scopeName: 'layout-theme-light',
          path: 'src/style/color/light-vars.scss',
        },
        {
          scopeName: 'layout-theme-dusk',
          path: 'src/style/color/dusk-vars.scss',
        },
        {
          scopeName: 'layout-theme-volcano',
          path: 'src/style/color/volcano-vars.scss',
        },
        {
          scopeName: 'layout-theme-yellow',
          path: 'src/style/color/yellow-vars.scss',
        },
        {
          scopeName: 'layout-theme-mingQing',
          path: 'src/style/color/mingQing-vars.scss',
        },
        {
          scopeName: 'layout-theme-auroraGreen',
          path: 'src/style/color/auroraGreen-vars.scss',
        },
        {
          scopeName: 'layout-theme-pink',
          path: 'src/style/color/pink-vars.scss',
        },
        {
          scopeName: 'layout-theme-saucePurple',
          path: 'src/style/color/saucePurple-vars.scss',
        },
      ],
      // 默认取 multipleScopeVars[0].scopeName
      defaultScopeName: '',
      // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
      extract: true,
      // 独立主题css文件的输出路径，默认取 viteConfig.build.assetsDir 相对于 (viteConfig.build.outDir)
      outputDir: '',
      // 会选取defaultScopeName对应的主题css文件在html添加link
      themeLinkTagId: 'theme-link-tag',
      // "head"||"head-prepend" || "body" ||"body-prepend"
      themeLinkTagInjectTo: 'head',
      // 是否对抽取的css文件内对应scopeName的权重类名移除
      removeCssScopeName: false,
      // 可以自定义css文件名称的函数
      customThemeCssFileName: scopeName => scopeName,
    },
  });
}
