import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Cage} from "../../model/cage";
import {EmployeeDto} from "../../model/employeeDto";
import {CageService} from "../../service/cage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../service/token-storage.service";
import {checkCreatedDate} from "../../validator/check-created-date";
import {checkClosedDate} from "../../validator/check-closed_date";

@Component({
  selector: 'app-cage-edit',
  templateUrl: './cage-edit.component.html',
  styleUrls: ['./cage-edit.component.css']
})
export class CageEditComponent implements OnInit {
  formGroup: FormGroup;
  cage:Cage;
  username: string;
  employee: EmployeeDto;
  wasEdit: boolean=false;
  employeeList: EmployeeDto[];

  constructor(private cageService: CageService,
              private router: Router,
              private toast : ToastrService,
              @Inject(LOCALE_ID) private locale: string,
              private tokenStorageService: TokenStorageService,
              private activatedRoute: ActivatedRoute) {

    // get listEmp for edit
    this.cageService.getListEmployee().subscribe(data =>{
      this.employeeList = data;
    })

    this.activatedRoute.paramMap.subscribe(next =>{
      const id = next.get('id');
      console.log("cageId: " + id);
      this.cageService.findById(id).subscribe(data =>{
        this.cage = data['content'];
        // console.log("cage after find: " + this.cage);

        this.formGroup = new FormGroup({
          cageId: new FormControl('', [Validators.required]),
          employeeId: new FormControl('', [Validators.required]),
          createdDate: new FormControl("", [Validators.required, checkCreatedDate]),
          closedDate: new FormControl("", [Validators.required]),
          quantity: new FormControl("", [Validators.required,Validators.max(50), Validators.min(1), Validators.pattern("-?[0-9]+(\.[0-9][0-9]?)?")]),
        }, {validators: checkClosedDate})

        this.formGroup.patchValue(data);

        this.formGroup.patchValue({
          employeeId: data.employeeId + " - " + data.employeeName
        })

      }, error => {
        this.router.navigateByUrl("/404")
      })
    })


    this.username = tokenStorageService.getUser().name;

  }

  ngOnInit(): void {
    this.cageService.getCurrentEmployeeCreateCage(this.username).subscribe(data =>{
      this.employee = data;
      this.formGroup.patchValue({
        employeeId: data.employeeId+ ' - ' + data.employeeName
      })
    });

    this.activatedRoute.paramMap.subscribe(next =>{
      const id = next.get('id');
      console.log("cageId: " + id);
      this.cageService.findById(id).subscribe(data =>{

        this.formGroup.patchValue({
          cageId: data.cageId,
          createdDate: data.createdDate
        });
      }, error => {
        this.router.navigateByUrl("/404")
      });
    });
  }

  onSubmit() {
    if (this.formGroup.invalid){
      this.toast.error("Thông tin chuồng nuôi không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    } else {
      this.cageService.updateCage(this.formGroup.value.cageId, this.formGroup.value).subscribe(data =>{
        this.cage = data['content'];
        this.router.navigateByUrl("/employee/cage")
        this.toast.success("Cập nhật chuồng nuôi thành công!", "Thành công: ", {
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



  preventEdit() {
    this.wasEdit=true;
    this.ngOnInit();
  }
}
