import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import dayjs from 'dayjs';
import { resolve } from 'path';
import pkg from './package.json';
import { wrapperEnv } from './build';
import { OUTPUT_DIR } from './build/constant';
import { getProxyObj } from './build/proxy';
import { getPluginList } from './build/plugin';

// 工作目录
const root: string = process.cwd();

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(root, '.', dir);
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    server: {
      // 指定服务器应该监听哪个IP地址。如果将此设置为0.0.0.0或者true将监听所有地址，包括局域网和公网地址。
      host: true,
      // 指定开发服务器端口.
      port: VITE_PORT,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      strictPort: false,
      // 启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS。
      https: false,
      // 在开发服务器启动时自动在浏览器中打开应用程序。
      open: true,
      // 为开发服务器配置自定义代理规则
      proxy: getProxyObj(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    plugins: getPluginList(viteEnv, isBuild),
    optimizeDeps: {
      include: [
        'element-plus/lib/locale/lang/en',
        'element-plus/lib/locale/lang/zh-cn',
        'vxe-table/lib/locale/lang/zh-CN',
        'vxe-table/lib/locale/lang/en-US',
      ],
      exclude: ['@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'],
    },
  };
};
