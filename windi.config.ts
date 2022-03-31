/**
 * @Description: Windi CSS 配置
 * @HomePage https://cn.windicss.org/
 * @Author: Zander
 * @Date: 2022/2/18 16:09
 * @LastEditors: Zander
 * @LastEditTime: 2022/2/18 16:09
 */
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
    },
  },
});
