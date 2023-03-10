import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {birthdayValidator, checkDuplicateEmail} from "../validate";
import {Employee} from "../../model/employee";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee: Employee;
  employeeId;
  employeeForm: FormGroup;

  validationMessages = {
    employeeName: [
      {type: 'required', message: 'Tên nhân viên không được trống!'},
      {type: 'maxlength', message: 'Tên nhân viên không dài hơn 40 kí tự !'},
      {type: 'minlength', message: 'Tên nhân viên không nhỏ hơn 3 kí tự !'},
      {type: 'pattern', message: 'Tên nhân viên không được chứa ký tự đặc biệt!'}
    ],
    birthday: [
      {type: 'required', message: 'Ngày sinh không được trống!'}

    ],
    email: [
      {type: 'required', message: 'Email không được trống!'},
      {type: 'email', message: 'Email chưa đúng dịnh dạng!'}
    ],
    idCard: [
      {type: 'required', message: 'CMND không được trống!'},
      {type: 'pattern', message: 'CMND phải là 9 số!'}
    ],
    address: [
      {type: 'required', message: 'Địa chỉ không được trống!'},
      {type: 'maxlength', message: 'Địa chỉ không dài hơn 40 kí tự !'}
    ],

  }

  genderList = [
    {
      id:1,
      name:'gender',
      value:'nam',
      label:'nam'
    },{
      id:2,
      name:'gender',
      value:'nữ',
      label:'nữ'
    },{
      id:3,
      name:'gender',
      value:'khác',
      label:'khác'
    }
  ]

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router,
              private toast : ToastrService) {

    this.activatedRoute.paramMap.subscribe(next => {
      this.employeeId = next.get('employeeId');
      console.log(this.employeeId);
      console.log("messsageArray:" + this.validationMessages);
      // tslint:disable-next-line:no-shadowed-variable
      employeeService.findById(this.employeeId).subscribe( next => {
        this.employee = next;
        console.log(this.employee);
        this.employeeForm = new FormGroup({
          employeeId      : new FormControl({value: '', disabled: true}, [Validators.required]),
          employeeName    : new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở' +
              'ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$'),
            Validators.maxLength(40)]),
          accountId       : new FormControl(),
          birthday        : new FormControl('', [
            Validators.required,
            birthdayValidator()]),
          avartar         : new FormControl(),
          email           : new FormControl('', [
            Validators.required,
            Validators.email]),
          gender          : new FormControl(),
          idCard          : new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]{9}$')]),
          address         : new FormControl('', [
            Validators.required,
            Validators.maxLength(40)]),
          isDelete        : new FormControl(),

        });
        this.employeeForm.patchValue(this.employee);
      });
    }, error => {

    }, () => {

    });
  }

  ngOnInit(): void {
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe((data) => {
      console.log(data);
      this.employee = data['content'];
      this.router.navigate(['/admin/employee']);
      this.toast.success("Cập nhật nhân viên thành công!", "Thành công: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    });
  }
}

