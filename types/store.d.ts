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
