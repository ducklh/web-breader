import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private toastr: ToastrService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')])
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    this.authService.resetPassword(this.formGroup.value.email).subscribe(
      data => {
        this.toastr.success("Email xác thực đã được gửi! Vui lòng kiểm tra email của bạn.", "Thành công: ", {
          timeOut: 2500,
          extendedTimeOut: 1500
        });
        // navigate to reset password page
        // this.router.navigateByUrl("/verify-reset-password");

        // navigate to login page to re-login with new password
        this.router.navigateByUrl("/login");
      },
      err => {
        this.toastr.warning("Nếu email của bạn đúng, sẽ có một email xác nhận được gửi đến. Vui lòng kiểm tra email của bạn!", "Cảnh báo: ", {
          timeOut: 5000,
          extendedTimeOut: 1500
        });
        setTimeout(() => this.router.navigateByUrl("/login"), 5000)
      }
    );
  }
}
