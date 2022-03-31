/**
 * @Description: Package file volume analysis
 * @Author: Zander
 * @Date: 2022/2/21 15:25
 * @LastEditors: Zander
 * @LastEditTime: 2022/2/21 15:25
 */
import type { Plugin } from 'vite';
import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../index';

export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }
  return [];
}
