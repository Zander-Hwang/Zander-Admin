import { h, defineComponent } from 'vue';

/**
 * 封装iconfont组件，默认`font-class`引用模式，支持`unicode`引用、`font-class`引用、`symbol`引用
 * （https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.20&helptype=code）
 */
export default defineComponent({
  name: 'IconFont',
  props: {
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 16,
    },
  },
  computed: {
    getStyle() {
      let size = `${this.size}`;
      size = `${size.replace('px', '')}px`;
      return {
        width: size,
        height: size,
      };
    },
  },
  render() {
    const attrs = this.$attrs;
    const symbolId = this.icon.indexOf('zander-icon') >= 0 ? this.icon : `icon-${this.icon}`;
    if (Object.keys(attrs).includes('uni') || attrs?.iconType === 'uni') {
      return h('i', { class: 'iconfont', ...attrs }, symbolId);
    }
    if (Object.keys(attrs).includes('svg') || attrs?.iconType === 'svg') {
      return h(
        'svg',
        { class: 'icon-svg', 'aria-hidden': true, style: this.getStyle },
        { default: () => [h('use', { 'xlink:href': `#${symbolId}` })] }
      );
    }
    return h('i', { class: `iconfont ${symbolId}`, ...attrs });
  },
});
