import {Province} from "../category/province";
import {District} from "../category/district";
import {Ward} from "../category/ward";

export class CustomerUpdateDto {
  customerId :string;
  fullName: string;
  address: string;
  createdDate: string;
  phone: string;
  email: string;
  gender: boolean;
  message: string;
  provinceId : number;
  districtId: Number;
  wardId: Number;
}
