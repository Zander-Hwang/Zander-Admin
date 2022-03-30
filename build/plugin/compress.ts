/**
 * @Description: 用于打包和输出gzip。
 * @PageHome: https://github.com/anncwb/vite-plugin-compression
 * @Author: Ableson
 * @Date: 2022/2/21 16:01
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 16:01
 */
import type { Plugin } from 'vite';
import compressPlugin from 'vite-plugin-compression';

export function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginFile = false
): Plugin | Plugin[] {
  const compressList = compress.split(',');

  const plugins: Plugin[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
      })
    );
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile,
      })
    );
  }
  return plugins;
}
