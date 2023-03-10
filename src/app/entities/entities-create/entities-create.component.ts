import {Component, OnInit} from '@angular/core';
import {EntitiesService} from "../../service/entities.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Entities} from "../../model/entities";
import {checkInDate} from "../../validator/check-indate";
import {checkOutDate} from "../../validator/check-outDate";
import validate = WebAssembly.validate;
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-entities-create',
  templateUrl: './entities-create.component.html',
  styleUrls: ['./entities-create.component.css']
})
export class EntitiesCreateComponent implements OnInit {
  entitiesForm: FormGroup;
  entities : Entities;
  cageList=[];
  entitiesId :string ;
  more :boolean=false;
  wasEdit : boolean=false;


  validationMessages= {
    entitiesId:[
      {type: 'required',message: ''}
    ],
    inDate:[
      {type: 'required',message: 'Ngày vào chuồng không được trống!'}
    ],
    outDate:[
      {type: 'required',message: 'Ngày ra chuồng không được trống!'},
    ],
    status:[
      {type: 'required',message: 'Trạng thái không được trống!'},
      {type: 'maxlength',message: 'Trạng thái không dài hơn 50 kí tự !'},
      {type: 'minlength',message: 'Trạng thái không nhỏ hơn 3 kí tự !'}
    ],
    weight:[
      {type: 'required',message: 'Cân nặng không được trống!'},
      {type: 'max',message: 'Cân nặng không vượt quá 500kg!'},
      {type: 'min',message: 'Cân nặng không nhỏ hơn 0.01kg!'},
      {type: 'pattern',message: 'Sai định dạng'}
    ],
    cageId:[
      {type: 'required',message: 'Mã chuồng không được trống!'},
      {type: 'minlength',message: 'Trạng thái không nhỏ hơn 3 kí tự !'}
    ],
  }
  constructor(private entitiesService: EntitiesService, private router: Router, private toast : ToastrService) {
    this.entitiesService.getListCage().subscribe((data)=>{
    this.cageList=data;
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
          Validators.pattern("-?[0-9]+(\.[0-9][0-9]?)?")
        ]),
        cageId: new FormControl("", [
          Validators.required,
          Validators.minLength(1)
        ]),
        isDelete: new FormControl(false)
      })
      })
  }

  ngOnInit(): void {
  }

  createEntities() {
    if(!this.more) {
      this.entitiesService.createEntities(this.entitiesForm.value).subscribe((data) => {
        this.entities = data['content'];
        this.router.navigateByUrl("/employee/entities");
        this.toast.success("Thêm mới cá thể thành công!", "Thành công: ", {
          timeOut: 4000,
          extendedTimeOut: 1000
        })
      });
    }else{
      this.toast.error("Thông tin cá thể không hợp lệ!", "Lỗi: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    }
  }
  getEntitiesId() {
    this.entitiesService.getEntitiesId(this.entitiesForm.value.cageId).subscribe((data) => {
      console.log(this.entitiesForm.value.cageId);
      if(data<10){
        this.entitiesId=this.entitiesForm.value.cageId+"-0"+data;
      }
      else {
        this.entitiesId = this.entitiesForm.value.cageId+"-"+data;
      }
      if(data!=null){
        this.entitiesForm.patchValue({
          entitiesId:this.entitiesId,
        })
      }
    },
      (error)=>{
      this.entitiesForm.patchValue({
        entitiesId:null
      })
      this.toast.error('Chuồng nuôi đã quá tải, không thể thêm vật nuôi!', 'Thất bại',{
        timeOut:5000,
        extendedTimeOut:1000
      })
      })
  }

  destroyHacker() {
    this.wasEdit=true;
      this.entitiesForm.patchValue({
      entitiesId:this.entitiesId
    })

  }
  compare(){
    if(Date.parse(this.entitiesForm.value.inDate)>Date.parse(this.entitiesForm.value.outDate)){
      this.more=true;
    }
    else {
      this.more=false;
    }
  }
}
