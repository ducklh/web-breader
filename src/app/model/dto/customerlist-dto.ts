import {Province} from "../category/province";
import {District} from "../category/district";
import {Ward} from "../category/ward";

export class CustomerListDTO {
  fullName: string;
  address: string;
  createDate: string;
  phone: string;
  email: string;
  gender: boolean;
  message: string;
  province : Province;
  district: District;
  ward: Ward;


}
