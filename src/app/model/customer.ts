import {Province} from "./category/province";
import {District} from "./category/district";
import {Ward} from "./category/ward";

export class Customer {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  message: string;
  gender: true;
  isDelete: null;
  province: Province;
  district: District;
  ward: Ward
}
