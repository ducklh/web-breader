import {IAccount} from "./IAccount";

export interface IAccountRole {
  accountRoleId: number;
  account: IAccount;

  accountRoleList: IAccountRole[];
}
