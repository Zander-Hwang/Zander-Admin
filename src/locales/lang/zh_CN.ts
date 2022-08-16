/**
 * @Description: 导入中文国际化相关文件
 * @Author: Zander
 * @Date: 2022/8/11 16:13
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/11 16:13
 */
// element-plus 中文 - 国际化
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import { genMessage } from '/@/locales/helper';

const modules = import.meta.globEager('./zh-CN/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    zhLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
