import { Component, OnInit } from '@angular/core';
import {Cage} from "../../../model/cage";
import {CageService} from "../../../service/cage.service";
import {Router} from "@angular/router";
import {EntitiesService} from "../../../service/entities.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  // Cac bien cho list
  listContact: Array<Cu>;
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

  // Bien check xem da tim kiem chua
  isSearch : boolean=false;
  isAcsSort: boolean=true;
  constructor(private cageService: CageService, private route: Router,private entitiesService : EntitiesService) {
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
        console.log(data);
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
    this.cageService.findCage(this.pageSearchCurrent,this.dateType,this.dateFrom,this.dateTo,this.searchCageId).subscribe((data)=>{
      this.listCage=data['content'];
      console.log(data)
      // this.pageSearchCurrent = data['page'];
      this.pageSearch=new Array(data['totalPages']);
      this.pageSearchTotal=data['totalPages'];
    })
  }
  getListEntitiesByCage(cageId : string){
    this.cageService.findAllEntitiesInCage(cageId);
    this.route.navigate(["/employee/entities"])
  }
  setSearch(i: number , event: any) {
    event.preventDefault();
    this.pageSearchCurrent = i;
    this.cageService.findCage(this.pageSearchCurrent,this.dateType,this.dateFrom,this.dateTo,this.searchCageId).subscribe((data)=>{
      this.listCage=data['content'];
      this.pageSearch=new Array(data['totalPages']);
      this.pageSearchTotal=data['totalPages'];
    })
  }
  setSortBy(sort : string){
    this.sortBy=sort;
    this.isAcsSort=!this.isAcsSort;
    this.findAllPageable();
  }

}
