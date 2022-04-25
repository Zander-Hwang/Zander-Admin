/**
 * @Description: a 标签 连接
 * @Author: Zander
 * @Date: 2022/4/25 16:00
 * @LastEditors: Zander
 * @LastEditTime: 2022/4/25 16:00
 */
export const openLink = <T>(link: T): void => {
  const $a: HTMLElement = document.createElement('a');
  // @ts-expect-error
  $a.setAttribute('href', link);
  $a.setAttribute('target', '_blank');
  $a.setAttribute('rel', 'noreferrer noopener');
  $a.setAttribute('id', 'external');
  document.getElementById('external') &&
    document.body.removeChild(document.getElementById('external') as any);
  document.body.appendChild($a);
  $a.click();
  $a.remove();
};
