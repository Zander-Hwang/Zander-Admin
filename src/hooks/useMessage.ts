/**
 * @Description: 弹窗反馈钩子函数
 * @Notice: (messageModal、notify、messageBox)使用方式参照Element-Plus官网、需将方法名进行替换
 * @Author: Zander
 * @Date: 2022/8/9 11:11
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/9 11:11
 */
import type {
  MessageOptions,
  ElMessageBoxOptions,
  NotificationOptions,
} from 'element-plus/lib/components';
import type { VNode } from 'vue';
// eslint-disable-next-line no-duplicate-imports
import { isVNode } from 'vue';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { isString } from '/@/utils/verify';
import { useI18n } from '/@/locales';

type UseMessageOptions =
  | MessageOptions
  | ElMessageBoxOptions
  | NotificationOptions
  | string
  | VNode;

// 获取 MessageBox 的按钮配置
const getButtonOptions = () => {
  const { $t } = useI18n();
  return {
    confirmButtonText: $t('common.okText'),
    cancelButtonText: $t('common.cancelText'),
  };
};

// 获取 Options 的传参
const getBaseOptions = (options: UseMessageOptions) => {
  if (isString(options) || isVNode(options)) {
    return {
      message: options,
    };
  }
  return {
    ...options,
  };
};

// ElMessage
const successModal = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'success',
  } as MessageOptions;
  return ElMessage(opt);
};
const errorModal = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'error',
  } as MessageOptions;
  return ElMessage(opt);
};
const infoModal = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'info',
  } as MessageOptions;
  return ElMessage(opt);
};
const warningModal = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'warning',
  } as MessageOptions;
  return ElMessage(opt);
};

// ElNotification
const successNotify = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'success',
  } as NotificationOptions;
  return ElNotification(opt);
};
const errorNotify = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'error',
  } as NotificationOptions;
  return ElNotification(opt);
};
const infoNotify = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'info',
  } as NotificationOptions;
  return ElNotification(opt);
};
const warningNotify = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'warning',
  } as NotificationOptions;
  return ElNotification(opt);
};

// ElMessageBox
const successBox = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'success',
    center: true,
    ...getButtonOptions(),
  } as ElMessageBoxOptions;
  return ElMessageBox(opt);
};
const errorBox = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'error',
    center: true,
    ...getButtonOptions(),
  } as ElMessageBoxOptions;
  return ElMessageBox(opt);
};
const infoBox = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'info',
    center: true,
    ...getButtonOptions(),
  } as ElMessageBoxOptions;
  return ElMessageBox(opt);
};
const warningBox = (options: UseMessageOptions) => {
  !isString(options) && Reflect.deleteProperty(options, 'type');
  const opt = {
    ...getBaseOptions(options),
    type: 'warning',
    center: true,
    ...getButtonOptions(),
  } as ElMessageBoxOptions;
  return ElMessageBox(opt);
};
const confirmBox = (options: ElMessageBoxOptions) => {
  const type = options?.type ?? 'warning';
  const title = options?.title;
  const message = options?.message;
  Reflect.deleteProperty(options, 'type');
  Reflect.deleteProperty(options, 'title');
  Reflect.deleteProperty(options, 'message');
  const opt = {
    ...getBaseOptions(options),
    type,
    ...getButtonOptions(),
  } as ElMessageBoxOptions;
  return ElMessageBox.confirm(message, title, opt);
};

export function useMessage() {
  return {
    messageModal: ElMessage,
    notify: ElNotification,
    messageBox: ElMessageBox,
    successModal,
    errorModal,
    infoModal,
    warningModal,
    successNotify,
    errorNotify,
    infoNotify,
    warningNotify,
    successBox,
    errorBox,
    infoBox,
    warningBox,
    confirmBox,
  };
}
