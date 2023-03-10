import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Entities} from "../../model/entities";
import {EntitiesService} from "../../service/entities.service";
import {ActivatedRoute, Router} from "@angular/router";
import {throwError} from "rxjs";
import {checkInDate} from "../../validator/check-indate";
import {checkOutDate} from "../../validator/check-outDate";
import {error} from "@angular/compiler/src/util";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-entities-edit',
  templateUrl: './entities-edit.component.html',
  styleUrls: ['./entities-edit.component.css']
})
export class EntitiesEditComponent implements OnInit {
  entitiesForm: FormGroup;
  entities: Entities;
  cageList: String[];
  more :boolean=false;
  selectCage : string;
  flag: boolean=true;
  validationMessages = {
    entitiesId: [
      {type: 'required', message: 'Id không được trống!'}
    ],
    inDate: [
      {type: 'required', message: 'Ngày vào chuồng không được trống!'}
    ],
    outDate: [
      {type: 'required', message: 'Ngày ra chuồng không được trống!'},
    ],
    status: [
      {type: 'required', message: 'Trạng thái không được trống!'},
      {type: 'maxlength', message: 'Trạng thái không dài hơn 50 kí tự !'},
      {type: 'minlength', message: 'Trạng thái không nhỏ hơn 3 kí tự !'}
    ],
    weight: [
      {type: 'required', message: 'Cân nặng không được trống!'},
      {type: 'max', message: 'Cân nặng không vượt quá 500kg!'},
      {type: 'min', message: 'Cân nặng không nhỏ hơn 0.01kg!'}
    ],
    cageId: [
      {type: 'required', message: 'Mã chuồng không được trống!'},
      {type: 'maxlength', message: 'Mã chuồng không được trống!'}
    ]
  }

  constructor(private entitiesService: EntitiesService, private route: Router, private activatedRoute: ActivatedRoute, private toast: ToastrService) {

    this.entitiesService.getListCage().subscribe(cage => {
      this.cageList = cage;
    })
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get("id");
      this.entitiesService.findById(id).subscribe((data) => {
          this.entities = data;
          this.selectCage=data.cageId;
          this.entitiesForm = new FormGroup({
            entitiesId: new FormControl("",
              [Validators.required]),
            inDate: new FormControl("", [
              Validators.required,
              checkInDate
            ]),
            outDate: new FormControl("", [
              Validators.required,
              checkOutDate
            ]),
            status: new FormControl("", [
              Validators.required,
              Validators.maxLength(50),
              Validators.minLength(3),
              Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")
            ]),
            weight: new FormControl("", [
              Validators.required,
              Validators.max(500),
              Validators.min(0.01),
            ]),
            cageId: new FormControl(this.entities.cage, [
              Validators.required,
              Validators.maxLength(2)
            ]),
            isDelete: new FormControl(0, [])
          })
          this.entitiesForm.patchValue(this.entities);
      },
        (error)=>{
          console.log(error.message);
          this.route.navigateByUrl("/404")
        })
    })

  }

  ngOnInit(): void {
  }

  updateEntities() {
    if(!this.more&&this.flag) {
      this.entitiesService.updateEntities(this.entitiesForm.value.entitiesId, this.entitiesForm.value).subscribe((data) => {
        this.entities = data['content'];
        this.route.navigate(['/employee/entities']);
        this.toast.success("Cập nhật cá thể thành công!", "Thành công: ", {
          timeOut: 4000,
          extendedTimeOut: 1000
        })
      });
    } else{
      this.toast.error("Thông tin cá thể không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    }
  }
  compare(){
    if(Date.parse(this.entitiesForm.value.inDate)>Date.parse(this.entitiesForm.value.outDate)){
      this.more=true;
    }
    else {
      this.more=false;
    }
  }
  checkQuantity(cageId : string){
    this.entitiesService.getEntitiesId(cageId).subscribe((data)=>{

    },
      (error)=>{
        this.flag=false;
        this.toast.error('Chuồng nuôi đã quá tải, không thể thêm vật nuôi!', 'Thất bại',{
          timeOut:1000,
        })
      })
  }

}
