import { Component, OnInit } from '@angular/core';
import {CageService} from "../../service/cage.service";
import {Router} from "@angular/router";
import {Cage} from "../../model/cage";
import {EntitiesService} from "../../service/entities.service";
import {BehaviorSubject} from "rxjs";
import {EmployeeNameDTO} from "../../model/dto/employee-name-dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cage-list',
  templateUrl: './cage-list.component.html',
  styleUrls: ['./cage-list.component.css']
})
export class CageListComponent implements OnInit {

  // Cac bien cho list
  listCage: Array<Cage>;
  pages: Array<number>;
  page :number=0;
  pageTotal:number=0;
  sortBy :string="cageId";
  // Cac bien cho seacrh
  pageSearch :Array<number>;
  pageSearchCurrent :number=0;
  pageSearchTotal :number=0;

  // Dieu kien tim kiem
  dateType: string='createdDate';
  searchCageId: string='';
  dateFrom:string='';
  dateTo:string='';
  employee:string='';
  employeeList:EmployeeNameDTO[];

  // Bien check xem da tim kiem chua
  isSearch : boolean=false;
  isAcsSort: boolean=true;
  constructor(private cageService: CageService, private route: Router,private entitiesService : EntitiesService,private toast : ToastrService) {
    this.cageService.getAllEmployeeName().subscribe((data)=>{
      this.employeeList=data;
    });
    const subject= new BehaviorSubject("");
  }

  ngOnInit(): void {
    this.findAllPageable();
  }
  setPage(i: number, event: any) {
    event.preventDefault();
    this.page= i;
    this.findAllPageable();
  }
  findAllPageable(){
  this.cageService.findAllPageAble(this.page,this.sortBy,this.isAcsSort).subscribe(
    data=>{
      this.listCage=data['content']
      this.pages=new Array(data['totalPages'])
      this.pageTotal = data['totalPages']
  },
    (error) =>{
      console.log(error.error.message)
    })
  }
  search(){
    this.pageSearchCurrent=0;
    this.isSearch=true;
    this.cageService.findCage(this.pageSearchCurrent,this.dateType,this.dateFrom,this.dateTo,this.searchCageId,this.employee,this.isAcsSort,this.sortBy).subscribe((data)=>{
      this.listCage=data['content'];
      this.pageSearch=new Array(data['totalPages']);
      this.pageSearchTotal=data['totalPages'];
    },
      (error)=>{
        this.listCage=null;
        this.toast.warning('Không tồn tại thông tin cần tìm kiếm','Thất bại',{
          timeOut:7000,
          extendedTimeOut:1000
        })
      })
  }
   getListEntitiesByCage(cageId : string){
     this.cageService.findAllEntitiesInCage(cageId);
     this.route.navigate(["/employee/entities"])
  }
  setSearch(i: number , event: any) {
    event.preventDefault();
    this.pageSearchCurrent = i;
    this.cageService.findCage(this.pageSearchCurrent,this.dateType,this.dateFrom,this.dateTo,this.searchCageId,this.employee,this.isAcsSort,this.sortBy).subscribe((data)=>{
      this.listCage=data['content'];
      this.pageSearch=new Array(data['totalPages']);
      this.pageSearchTotal=data['totalPages'];
    },
      (error)=>{
        this.listCage=null;
        this.toast.warning('Không tồn tại thông tin cần tìm kiếm','Thất bại',{
          timeOut:5000,
          extendedTimeOut:1000
        })
      })

  }
  setSortBy(sort : string){
    this.sortBy=sort;
    this.isAcsSort=!this.isAcsSort;
    this.search();
  }


}
