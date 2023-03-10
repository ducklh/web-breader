import {IAccountRole} from "./IAccountRole";

export interface IRole {
  roleId: number
  roleName: string;

  accountRoleList: IAccountRole[];
}
