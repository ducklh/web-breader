import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../service/authentication.service";
import {AuthGuard} from "../auth.guard";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css']
})
export class VerifyPasswordComponent implements OnInit {
  formGroup: FormGroup;
  isSuccessful: boolean;
  token: string;
  isValid = true;

  validation_messages = {
    'password': [
      {type: 'required', message: 'Trường này không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu phải chứa ít nhất 8 ký tự'},
      {type: 'maxlength', message: 'Mật khẩu không quá 32 ký tự'},
    ]
  };


  constructor(private route: ActivatedRoute,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    });

    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      if (token == null) {
        this.isSuccessful = false;
      // mới thêm
      }else if (!this.authService.isAuthenticated(token)){
        this.toastr.error("Thời hạn đổi mật khẩu của bạn đã hết. Vui lòng thực hiện lại!", "Lỗi: ", {
          timeOut: 7000,
          extendedTimeOut: 1500
        })
        this.isSuccessful = false;
      }  else {
        this.isSuccessful = false;
        this.authService.verifyPassword(token).subscribe(
          data => {
            this.isSuccessful = (data.message === 'accepted');
          },
          err => {
            this.isSuccessful = false;
          }
        );
      }
    });
  }

  onSubmit() {

  if(this.formGroup.get('newPassword').hasError('required') == true
    || this.formGroup.get('newPassword').hasError('minlength')== true
    || this.formGroup.get('newPassword').hasError('maxlength') == true){
    this.isValid = false;
  }

    // mới thêm
      if (this.formGroup.value.newPassword !== this.formGroup.value.confirmNewPassword || this.isValid == false){
      this.toastr.error("Trường nhập lại mật khẩu và mật khẩu không giống nhau!", "Lỗi: ", {
        timeOut: 5000,
        extendedTimeOut: 1500
      })
    } else
    {
      this.authService.doResetPassword(this.formGroup.value.newPassword, this.token).subscribe(data => {
        this.toastr.success('Mật khẩu đã được thay đổi!', "Thành công");
        this.router.navigate(["/login"])
      })
    }

  }
}
