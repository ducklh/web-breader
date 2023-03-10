import {IAccountRole} from "./IAccountRole";

export interface IAccount {
  accountId: number;
  accountName: string;
  password: string;

  accountRoleList: IAccountRole[];
}
