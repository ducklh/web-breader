export class Employee {
  employeeId: string;
  employeeName: string;
  accountId: string;
  email: string;
  birthday: string;
  gender: boolean;
  idCard: string;
  avatar: string;
  isDelete: string;
  address: string;

  constructor(employeeId: string, employeeName: string, accountId: string, email: string, birthday: string,
              gender: boolean, idCard: string, avatar: string, isDelete: string, address: string) {
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.accountId = accountId;
    this.email = email;
    this.birthday = birthday;
    this.gender = gender;
    this.idCard = idCard;
    this.avatar = avatar;
    this.isDelete = isDelete;
    this.address = address;
  }
}
