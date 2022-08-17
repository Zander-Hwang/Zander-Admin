/**
 * @Description: 导入英文国际化相关文件
 * @Author: Zander
 * @Date: 2022/8/11 16:12
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/11 16:12
 */
// element-plus 英文 - 国际化
import elLocale from 'element-plus/lib/locale/lang/en';
import { genMessage } from '/@/locales/helper';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
    elLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
