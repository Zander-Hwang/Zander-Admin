/**
 * @Description: Introduces component library styles on demand.
 * @PageHome: https://github.com/anncwb/vite-plugin-style-import
 * @Author: Zander
 * @Date: 2022/2/21 15:03
 * @LastEditors: Zander
 * @LastEditTime: 2022/2/21 15:03
 */
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  return createStyleImportPlugin({
    libs: [
      {
        libraryName: 'vxe-table',
        esModule: true,
        // @ts-ignore
        resolveComponent: name => `vxe-table/es/${name}`,
        resolveStyle: name => `vxe-table/es/${name}/style.css`,
      },
    ],
  });
}
