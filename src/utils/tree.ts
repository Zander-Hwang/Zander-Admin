/**
 * @Description: 树结构数据处理工具
 * @Author: Zander
 * @Date: 2022/4/24 15:14
 * @LastEditors: Zander
 * @LastEditTime: 2022/4/24 15:14
 */
export interface ConfigType {
  id: string;
  children: string;
  pid: string;
}

class Tree {
  private DEFAULT_CONFIG = {
    id: 'id',
    children: 'children',
    pid: 'pid',
  };
  constructor() {}

  // 获取配置项
  private getConfig = (config: ConfigType) => Object.assign({}, this.DEFAULT_CONFIG, config);

  /**
   * 列表结构转树结构
   * @param list
   * @param config
   */
  public listToTree(list: any[], config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const nodeMap = new Map(),
      result = [],
      { id, children, pid } = config;
    for (const node of list) {
      nodeMap.set(node[id], node);
    }
    for (const node of list) {
      const parent = nodeMap.get(node[pid]);
      (parent ? (parent[children] = parent[children] || []) : result).push(node);
    }
    return result;
  }

  /**
   * 树结构转列表结构
   * @param tree
   * @param config
   */
  public treeToList(tree: any[], config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const { children } = config,
      result = [...tree];
    for (let i = 0; i < result.length; i++) {
      if (!result[i][children]) {
        continue;
      }
      result.splice(i + 1, 0, ...result[i][children]);
    }
    return result;
  }

  /**
   * 查找符合条件的单个节点
   * @param tree
   * @param callback
   * @param config
   */
  public findNode(tree: any[], callback: Function, config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const { children } = config,
      list = [...tree];
    for (const node of list) {
      if (callback(node)) {
        return node;
      }
      node[children] && list.push(...node[children]);
    }
    return null;
  }

  /**
   * 查找符合条件的所有节点
   * @param tree
   * @param callback
   * @param config
   */
  public findNodeAll(tree: any[], callback: Function, config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const { children } = config,
      list = [...tree],
      result: any[] = [];
    for (const node of list) {
      callback(node) && result.push(node);
      node[children] && list.push(...node[children]);
    }
    return result;
  }

  /**
   * 查找符合条件的单个节点的路径
   * @param tree
   * @param callback
   * @param config
   */
  public findPath(tree: any[], callback: Function, config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const path: any[] = [],
      list = [...tree],
      visitedSet = new Set(),
      { children } = config;
    while (list.length) {
      const node = list[0];
      if (visitedSet.has(node)) {
        path.pop();
        list.shift();
      } else {
        visitedSet.add(node);
        node[children] && list.unshift(...node[children]);
        path.push(node);
        if (callback(node)) {
          return path;
        }
      }
    }
    return null;
  }

  /**
   * 查找符合条件的所有节点的路径
   * @param tree
   * @param callback
   * @param config
   */
  public findPathAll(tree: any[], callback: Function, config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const path: any[] = [],
      list = [...tree],
      result: any[] = [];
    const visitedSet = new Set(),
      { children } = config;
    while (list.length) {
      const node = list[0];
      if (visitedSet.has(node)) {
        path.pop();
        list.shift();
      } else {
        visitedSet.add(node);
        node[children] && list.unshift(...node[children]);
        path.push(node);
        callback(node) && result.push([...path]);
      }
    }
    return result;
  }

  /**
   * 树结构筛选
   * @param tree
   * @param callback
   * @param config
   */
  public filter(tree: any[], callback: Function, config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const { children } = config;
    function listFilter(list) {
      return list
        .map(node => ({ ...node }))
        .filter(node => {
          node[children] = node[children] && listFilter(node[children]);
          return callback(node) || (node[children] && node[children].length);
        });
    }
    return listFilter(tree);
  }

  /**
   * 树结构遍历
   * @param tree
   * @param callback
   * @param config
   */
  public forEach(tree: any[], callback: Function, config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const list = [...tree],
      { children } = config;
    for (let i = 0; i < list.length; i++) {
      callback(list[i]);
      list[i][children] && list.splice(i + 1, 0, ...list[i][children]);
    }
  }

  /**
   * 删除符合条件的所有节点
   * @param tree
   * @param callback
   * @param config
   */
  public removeNode(tree: any[], callback: Function, config: ConfigType = this.DEFAULT_CONFIG) {
    config = this.getConfig(config);
    const { children } = config,
      list = [tree];
    while (list.length) {
      const nodeList: any = list.shift();
      const delList = nodeList.reduce((r, n, idx) => {
        callback(n) && r.push(idx);
        return r;
      }, []);
      delList.reverse();
      delList.forEach(idx => nodeList.splice(idx, 1));
      const childrenList = nodeList.map(n => n[children]).filter(l => l && l.length);
      list.push(...childrenList);
    }
  }
}

export const TreeUtils = new Tree();
