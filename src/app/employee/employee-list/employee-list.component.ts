import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Router} from '@angular/router';
import {Employee} from "../../model/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public page = 0;
  employeeList:Array<any>;
  pages: any;
  totalPages: number;
  public searchName ="";
  public searchId   ="";
  isSubmitted=false;
  isTrue=false;
  isTrue2=true;


  constructor(private employeeService: EmployeeService, private router: Router){
  }

  ngOnInit(): void {
    // this.findAllPageable();
    this.search();
  }

  // findAllPageable(){
  //
  //   this.isTrue2 = true;
  //
  //   this.employeeService.findAllPageable(this.page).subscribe(
  //     data=>{
  //       this.employeeList=data['content']
  //       this.pages= new Array(data['totalPages'])
  //       this.currentPage= data['currentPage']
  //     },
  //     (error) => {
  //       console.log(error.error.message);
  //     }
  //   )
  // }

  // setPage(page, event: any) {
  //   event.preventDefault();
  //   this.page= page;
  //   this.search();
  // }

  updateEmployee(employee: any) {
    this.router.navigate(['/admin/employee/update', employee.employeeId]);
  }

  search() {

    if (!Number(this.page) || Number(this.page) < 0) {
      this.page = 0;
    }

    this.isTrue=true;
    this.employeeService.findAllEmployeeName(this.searchName.trim(),this.searchId.trim(),this.page).toPromise().then(data => {
        console.log(data.length);
        this.employeeList = data['content']
        this.pages = data;
        this.totalPages= data['totalPages'];
        console.log(data);
        this.isSubmitted=true;
        this.isTrue2=true;
      },
      (error) => {
        console.log(error.error.message);
        this.pages = [];
        this.isSubmitted=false;
        this.isTrue2=false;
      }
    );

  }
}
