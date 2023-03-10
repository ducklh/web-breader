import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Entities} from "../../model/entities";
import {EntitiesService} from "../../service/entities.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-entities-delete',
  templateUrl: './entities-delete.component.html',
  styleUrls: ['./entities-delete.component.css']
})
export class EntitiesDeleteComponent implements OnInit {
  entity: Entities

  constructor(private entitiesService:EntitiesService, private router: Router,
              private activatedRoute: ActivatedRoute,public dialogRef: MatDialogRef<EntitiesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast : ToastrService) {
    // this.activatedRoute.paramMap.subscribe(next => {
    //   const id = next.get("id");
    //   console.log(id)
    //   console.log(entitiesService.findByIdToDelete(id))
    //   entitiesService.findByIdToDelete(id).subscribe(next => {
    //     this.entity = next;
    //   });
    // });
    console.log("data la:"+data)
    entitiesService.findById(data).subscribe(
      value => {
        console.log(value)
        this.entity = value;
      }
    )
  };

  ngOnInit(): void {

  }

  deleteEntities(id: string) {
    console.log(id)
    this.entitiesService.deleteEntitiesById(id).subscribe();
    this.dialogRef.close({event: true});
    this.toast.warning("Xóa cá thể thành công!", "Thành công: ", {
      timeOut: 4000,
      extendedTimeOut: 1000
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
