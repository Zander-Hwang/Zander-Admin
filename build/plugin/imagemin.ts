/**
 * @Description: 用于压缩生产环境输出的映像资源文件
 * @PageHome: https://github.com/anncwb/vite-plugin-imagemin
 * @Author: Zander
 * @Date: 2022/2/21 15:53
 * @LastEditors: Zander
 * @LastEditTime: 2022/2/21 15:53
 */
import type { Plugin } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export function configImageminPlugin(): Plugin[] {
  return viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    mozjpeg: {
      quality: 20,
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  });
}
