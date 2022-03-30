/**
 * @Description: 模拟插件的开发和生产。
 * @PageHome： https://github.com/anncwb/vite-plugin-mock
 * @Author: Ableson
 * @Date: 2022/2/21 11:00
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 11:00
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';
      setupProdMockServer();
      `,
  });
}
