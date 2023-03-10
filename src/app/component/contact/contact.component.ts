import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../service/contact.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Province} from "../../model/category/province";
import {District} from "../../model/category/district";
import {Ward} from "../../model/category/ward";
import {Customer} from "../../model/customer";
import {CustomerUpdateDto} from "../../model/dto/customer-update-dto";
import {Local} from "protractor/built/driverProviders";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  provinceList: Province[];
  districtList: District[];
  wardList: Ward[];
  customer: CustomerUpdateDto = null;
  customerId: number = -1;
  validationMessages = {
    fullName: [
      {type: 'required', message: 'Tên không được trống!'},
      {type: 'pattern', message: 'Tên không đúng định dạng!'},
      {type: 'maxlength', message: 'Tên không dài quá 40 kí tự!'},
    ],
    address: [
      {type: 'required', message: 'Địa chỉ không được trống!'}
    ],
    phone: [
      {type: 'required', message: 'Số điện thoại không được trống!'},
      {type: 'pattern', message: 'Số điện thoại không đúng định dạng!'},
    ],
    email: [
      {type: 'required', message: 'Email không được trống!'},
      {type: 'maxlength', message: 'Email không dài hơn 50 kí tự !'},
      {type: 'email', message: 'Email sai định dạng !'},
      {type: 'minlength', message: 'Email không nhỏ hơn 4 kí tự !'}
    ],
    gender: [
      {type: 'required', message: 'Giới tính không được trống!'},
    ],
    message: [
      {type: 'required', message: 'Tin nhắn không được trống!'},
      {type: 'pattern', message: 'Tin nhắn không đúng định dạng!'},

    ],
    province: [
      {type: 'required', message: 'Tỉnh không được trống!'},
    ],
    district: [
      {type: 'required', message: 'Huyện không được trống!'},
    ],
    ward: [
      {type: 'required', message: 'Xã không được trống!'},
    ]
  }

  constructor(private contactService: ContactService, private route: Router, private  toast: ToastrService) {


  }

  ngOnInit(): void {
    this.contactService.getProvinceList().subscribe(data => {
      this.provinceList = data;
      this.contactForm = new FormGroup({
        fullName: new FormControl('', [Validators.required,
          Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'),
          Validators.maxLength(40)]),
        address: new FormControl("", [
          Validators.required
        ]),
        phone: new FormControl('', [Validators.required,
          Validators.pattern('^(09|09|03|\\(\\+84\\)90|\\(\\+84\\)91)\\d{8}$')]),
        email: new FormControl("", [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.minLength(4)
        ]),
        gender: new FormControl("", [
          Validators.required
        ]),
        message: new FormControl("", [
          Validators.required,
          Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'),

        ]),
        province: new FormControl("", [
          Validators.required
        ]),
        district: new FormControl("", [
          Validators.required
        ]),
        ward: new FormControl("", [
          Validators.required,
        ]),
        createdDate: new FormControl('')
      })
    })
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.toast.error("Thông tin liên lạc không hợp lệ!", "Thất bại: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    } else {
      this.contactForm.patchValue({
        province: Number.parseInt(this.contactForm.value.province),
        district: Number.parseInt(this.contactForm.value.district),
        ward: Number.parseInt(this.contactForm.value.ward),
      })
      if (this.customerId >-1) {
        this.contactService.updateCustomer(this.contactForm.value, this.customerId).subscribe((data) => {
          this.toast.success("Thông tin của bạn đã được gửi. Chúng tôi sẽ liên lạc lại ngay!", "Thành công: ", {
            timeOut: 10000,
            extendedTimeOut: 1000
          })
          this.route.navigate([""]);

        })
      } else {
        this.contactService.createCustomer(this.contactForm.value).subscribe((data) => {
          this.toast.success("Thông tin của bạn đã được gửi. Chúng tôi sẽ liên lạc lại ngay!", "Thành công: ", {
            timeOut: 10000,
            extendedTimeOut: 1000
          })
        })
      }
      this.route.navigate([""]);
    }
  }

  getDistrict() {
    this.contactService.getDistrictList(this.contactForm.value.province).subscribe((data) => {
      this.districtList = data;
    })
  }

  getWard() {
    this.contactService.getWardList(this.contactForm.value.district).subscribe((data) => {
      this.wardList = data;
    })
  }

  checkCustomer() {
    if ((this.contactForm.get("email").valid && this.contactForm.get("phone").valid)) {
      this.contactService.checkCustomer(this.contactForm.get('email').value, this.contactForm.get('phone').value).subscribe((data) => {
        if (data != null) {
          this.customerId = data.customerId;

          this.customer = data;
          this.contactForm.patchValue({
            province: this.customer.provinceId,
          });
          this.getDistrict();
          this.contactForm.patchValue({
            district: this.customer.districtId,
          });
          this.getWard();

          this.contactForm.patchValue({
            ward: this.customer.wardId,
          });
          this.contactForm.patchValue({
            fullName: this.customer.fullName,
            address: this.customer.address,
            gender: this.customer.gender,
            email: this.customer.email,
            phone: this.customer.phone,
          })
          this.toast.success(this.customer.fullName + ' rất vui khi gặp lại! Lần này bạn có nhu cầu gì nào?', 'Xin chào: ', {
            timeOut: 3000,
            extendedTimeOut:1000
          })

        }

      })
    }

  }

}
