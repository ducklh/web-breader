import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CageService} from "../../service/cage.service";
import {EntitiesService} from "../../service/entities.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EmployeeDto} from "../../model/employeeDto";
import DateTimeFormat = Intl.DateTimeFormat;
import {formatDate} from "@angular/common";
import {checkCreatedDate} from "../../validator/check-created-date";
import {checkOutDate} from "../../validator/check-outdate";
import {checkClosedDate} from "../../validator/check-closed_date";
import {Cage} from "../../model/cage";
import {TokenStorageService} from "../../service/token-storage.service";


@Component({
  selector: 'app-cage-create',
  templateUrl: './cage-create.component.html',
  styleUrls: ['./cage-create.component.css']
})
export class CageCreateComponent implements OnInit {
  formGroup: FormGroup;
  cage:Cage;
  cageIdRendered: string;
  username: string;
  employee: EmployeeDto;
  wasEdit: boolean=false;


  constructor(private cageService: CageService,
              private router: Router,
              private toast : ToastrService,
              @Inject(LOCALE_ID) private locale: string,
              private tokenStorageService: TokenStorageService) {

    this.formGroup = new FormGroup({
      cageId: new FormControl('', [Validators.required]),
      employeeId: new FormControl('', [Validators.required]),
      createdDate: new FormControl("", [Validators.required, checkCreatedDate]),
      closedDate: new FormControl("", [Validators.required]),
      quantity: new FormControl("1", [Validators.required,Validators.max(50), Validators.min(1), Validators.pattern("-?[0-9]+(\.[0-9][0-9]?)?")]),
    }, {validators: checkClosedDate})

    // demo
    this.username = tokenStorageService.getUser().name;

    this.getCageId();

    this.formGroup.patchValue({
      createdDate: formatDate(Date.now(),"yyyy-MM-dd", this.locale)
    })
  }

  ngOnInit(): void {
    this.cageService.getCurrentEmployeeCreateCage(this.username).subscribe(data =>{
      this.employee = data;
      // console.log(this.employee.employeeName + this.employee.employeeId)
      this.formGroup.patchValue({
        employeeId:this.employee.employeeId+ ' - ' + this.employee.employeeName
      })
    });
  }

  onSubmit() {
    if (this.formGroup.invalid){
      this.toast.error("Thông tin chuồng nuôi không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    }
    else {
      this.cageService.createCage(this.formGroup.value).subscribe(data =>{
        this.cage = data;
        this.router.navigateByUrl("/employee/cage")
        this.toast.success("Tạo mới chuồng nuôi thành công!", "Thành công: ", {
          timeOut: 4000,
          extendedTimeOut:1000
        })
      }, error => {
        this.toast.error("Thông tin chuồng nuôi không hợp lệ!", "Lỗi: ", {
          timeOut: 4000,
          extendedTimeOut: 1000
        })
      })
    }
  }



  getCageId() {
    this.cageService.getCageIdForCreate().subscribe(data => {
      console.log(data)
      if(data < 10){
        this.cageIdRendered=  "CN-00"+data;
      }
      else if(data < 100){
        this.cageIdRendered = "CN-0" + data;
      } else {
        this.cageIdRendered = "CN-" + data;
      }

      if(data!=null){
        this.formGroup.patchValue({
          cageId:this.cageIdRendered,
        })
      }
    })
  }

  preventEdit() {
    this.wasEdit=true;
    this.formGroup.patchValue({
      cageId:this.cageIdRendered
    });

    this.ngOnInit();
  }

}
