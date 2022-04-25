/**
 * @Description: Store
 * @Author: Zander
 * @Date: 2022/4/24 17:29
 * @LastEditors: Zander
 * @LastEditTime: 2022/4/24 17:29
 */
declare interface IAppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Hamburger
    isClickHamburger: boolean;
  };
  layout: string;
  language: string;
  device: string;
}

declare interface IPermissionState {
  /**
   * 许可代码列表
   * 资源主键
   * 用于控制页面细粒度控制
   */
  permCodeList: string[];

  /**
   * 菜单列表
   */
  menuList: object[];

  /**
   * 菜单树
   */
  menuTree: IMenu[];

  /**
   * 异步路由
   */
  asyncRouter: AppRouteModule[];

  /**
   * 动态路由是否已添加
   */
  isDynamicAddedRoute: boolean;
}

declare interface ISettingsState {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
}

declare interface IUserState {
  id: Nullable<string>;
  ip: Nullable<string>;
  loginName: Nullable<string>;
  name: Nullable<string>;
  userType: Nullable<string>;

  /**
   * 用户状态（0，失效；1，生效）
   */
  status: Nullable<number>;

  /**
   * 是否第一次登录（0，否；1，是）
   */
  firstLogin: Nullable<number>;

  /**
   * 用户所属组织机构
   */
  organizations: Nullable<object[]>;

  /**
   * 用户角色
   */
  roles: Nullable<object[]>;

  /**
   * 用户拥有的权限
   */
  resources: Nullable<object[]>;

  /**
   * 头像
   */
  avatar: Nullable<string>;

  /**
   * 简介
   */
  introduction: Nullable<string>;
}
