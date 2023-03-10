import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../service/news.service';
import {Router} from '@angular/router';
import {News} from '../../model/news';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import { formatDate } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ParentMessageNewsDetail } from 'src/app/model/parentMessageNewsDetail';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  page:number= 0;
  pageTotal:number=0;
  newsPage:Array<any>;
  pages:Array<number>;
  pageHl:number= 0;
  pageHlTotal:number= 0;
  newsPageHl:Array<any>;
  pagesHL:Array<number>;
  searchForm: FormGroup;
  newsListM : String = '';
  private name:String = '';
  newsListMarquee : String = '';
  private nameMarquee:String = '';
  pageTotalView:number= 0;
  newsPageTotalView:Array<any>;
  pageSearch: number = 0;
  pageSearchTotal: number = 0;
  newsPageSearch:Array<any>;
  pagesSearch:Array<number>;
  pagesSearchEmpty: boolean = false;
  today= new Date();
  jstoday = '';
  searchButton: boolean = true;
  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = [];
  newsTypeStatisticalData: any = [];
  idNews: string;
  showDetailBl: boolean = false;
  parentMessage: string = "Message from parent";
  username: string;
  role: string;
  isLoggedIn: boolean;
  prM: ParentMessageNewsDetail = {parentMessage: "mess", isLoggin: false, nameUser : null,avatar :null, idEmployee : null }
  reloadComment : boolean = false;
  loadNewsComment : boolean = false;
  constructor(private newsService: NewsService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private tokenStorageService: TokenStorageService, ){
    Chart.register(...registerables);
  }
  ngOnInit(): void {
   
    this.loadHeader()
    this.findAllPageable()
    this.findAllPageableHl()
    this.findAllByTotalView()

    this.searchForm = this.fb.group({
      nameInput: [''],
    });
    setInterval(() => {
      this.today = new Date();
    }, 1);

    // this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }

  private loadHeader():void {
    if (this.tokenStorageService.getUser() !== null) {
      this.username = this.tokenStorageService.getUser().name;
      console.log(this.tokenStorageService.getUser());
      this.findInforUser()
    }else {
      this.username = null;
    }
    this.isLoggedIn = (this.username !== null);
    this.prM.isLoggin = this.isLoggedIn
  }

  backListParent() {
    console.log("hehes");
    
    this.showDetailBl = false;

    
  }

  reloadCommentChild() {
    
    console.log("sdfadsf");
    if (this.reloadComment==true) {
      this.reloadComment =false
    }else{
      this.reloadComment = true
    }
  }

  findInforUser(){
    this.newsService.findUser(this.username).subscribe(
      data=>{
        this.prM.nameUser=data.employeeName;
        this.prM.avatar = data.avatar;
        this.prM.idEmployee = data.employeeId;
        console.log(data);
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  findAllPageable(){
    this.newsService.findAllPageable(this.page).subscribe(
      data=>{
        this.newsPage=data['content']
        console.log(data);
        this.newsPage.forEach(element => {
          this.newsListMarquee +=  " | " + element.newsName + " | ";
        });
        this.pages=new Array(data['totalPages'])
        this.pageTotal = data['totalPages']
        console.log(this.pageTotal);
        console.log(data['totalPages']);
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  findAllPageableHl(){
    this.newsService.findAllHightLight(this.pageHl).subscribe(
      data=>{
        this.newsPageHl=data['content']
        console.log(data);
        this.newsPageHl.forEach(element => {
          this.newsListM +=  " | " + element.newsName + " | ";
        });
        console.log(this.newsListM);
        this.pagesHL=new Array(data['totalPages'])
        this.pageHlTotal = data['totalPages']
        // console.log(data['totalPages']);
      },
      (error) => {
        console.log(error.error.message);
      },
    )
  }
  findAllByTotalView(){
    this.newsService.findByTotalView(this.pageHl).subscribe(
      data=>{
        this.newsPageTotalView=data['content']
        console.log(data['content']);
        
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }
  findAllName(){
    console.log(this.searchButton);
    
    if (this.searchButton) {
      this.pageSearch = 0;
    }
    this.newsService.findByName(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          console.log(this.pageSearch);
          
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
            timeOut: 3000,
            extendedTimeOut: 1500
          });
          return
        }else{
          this.newsPageSearch=data['content']
          console.log(data);
          this.pagesSearch=new Array(data['totalPages'])
          this.pageSearchTotal = data['totalPages'];
          this.pagesSearchEmpty = true;
          console.log(data['totalPages']);
        }

      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  showDetail(id){
    this.parentMessage = id
    this.prM.parentMessage = id;
    this.showDetailBl = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.loadNewsComment==true) {
      this.loadNewsComment =false
    }else{
      this.loadNewsComment = true
    }
    
  }
  public theCallback(){
    console.log("hehe");
    
    
  }
  setPage(i: number, event: any) {
    event.preventDefault();
    this.page= i;
    this.findAllPageable();
  }
  setPageHL(i: number , event: any) {
    event.preventDefault();
    this.pageHl = i;
    this.findAllPageableHl();
    console.log(this.pageHl );
  }
  setSearch(i: number , event: any) {
    this.searchButton = false;
    event.preventDefault();
    this.pageSearch = i;
    this.findAllName();
  }
  setName(name: String, event: any) {
    event.preventDefault();
    this.name= name;
    this.findAllPageable();
  }
  searchName(){
    console.log("hehe");
  }
  onSubmit() {
    this.searchButton = true;
    this.name= this.searchForm.value.nameInput;
    if (this.name == "") {
      this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
        timeOut: 3000,
        extendedTimeOut: 1500
      });
      this.searchForm.reset()
    }else{
      this.findAllName()
      this.searchForm.reset()
      console.log(this.searchForm.value.nameInput);
    }

  }
  sortByDesc(event: any){
    console.log("mới nhất");
    
    this.newsService.findByNameDesc(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
            timeOut: 3000,
            extendedTimeOut: 1500
          });
          return
        }else{
          this.newsPageSearch=data['content']
          console.log(data);
          this.pagesSearch=new Array(data['totalPages'])
          this.pageSearchTotal = data['totalPages'];
          this.pagesSearchEmpty = true;
          console.log(data['totalPages']);
        }

      },
      (error) => {
        // this.newsPage=[]
        // this.pages = null
        console.log(error.error.message);
      }
    )
  }
  sortByAsc(){
    this.newsService.findByName(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
            timeOut: 3000,
            extendedTimeOut: 1500
          });
          return
        }else{
          this.newsPageSearch=data['content']
          console.log(data);
          this.pagesSearch=new Array(data['totalPages'])
          this.pageSearchTotal = data['totalPages'];
          this.pagesSearchEmpty = true;
          console.log(data['totalPages']);
        }

      },
      (error) => {
        // this.newsPage=[]
        // this.pages = null
        console.log(error.error.message);
      }
    )
  }
  sortByViews(){
    this.newsService.findByName(this.name, this.pageSearch).subscribe(
      data=>{
        if (data == null) {
          this.newsPageSearch = null;
          this.pagesSearch = null;
          this.pagesSearchEmpty = false;
          this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
            timeOut: 3000,
            extendedTimeOut: 1500
          });
          return
        }else{
          this.newsPageSearch=data['content']
          console.log(data);
          this.pagesSearch=new Array(data['totalPages'])
          this.pageSearchTotal = data['totalPages'];
          this.pagesSearchEmpty = true;
          console.log(data['totalPages']);
        }

      },
      (error) => {
        // this.newsPage=[]
        // this.pages = null
        console.log(error.error.message);
      }
    )
  }
  onEditClick(type: any) {
    console.log('skill name', type);
    switch (type) {
      case "desc":
    
        this.newsService.findByNameDesc(this.name, this.pageSearch).subscribe(
          data=>{
            if (data == null) {
              this.newsPageSearch = null;
              this.pagesSearch = null;
              this.pagesSearchEmpty = false;
              this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
                timeOut: 3000,
                extendedTimeOut: 1500
              });
              return
            }else{
              this.newsPageSearch=data['content']
              console.log(data);
              this.pagesSearch=new Array(data['totalPages'])
              this.pageSearchTotal = data['totalPages'];
              this.pagesSearchEmpty = true;
              console.log(data['totalPages']);
            }
    
          },
          (error) => {
            // this.newsPage=[]
            // this.pages = null
            console.log(error.error.message);
          }
        )
        break;
      case "asc":
        this.newsService.findByNameAsc(this.name, this.pageSearch).subscribe(
          data=>{
            if (data == null) {
              this.newsPageSearch = null;
              this.pagesSearch = null;
              this.pagesSearchEmpty = false;
              this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
                timeOut: 3000,
                extendedTimeOut: 1500
              });
              return
            }else{
              this.newsPageSearch=data['content']
              console.log(data);
              this.pagesSearch=new Array(data['totalPages'])
              this.pageSearchTotal = data['totalPages'];
              this.pagesSearchEmpty = true;
              console.log(data['totalPages']);
            }
    
          },
          (error) => {
            // this.newsPage=[]
            // this.pages = null
            console.log(error.error.message);
          }
        )
        break;
      case "views":
        this.newsService.findByNameTotalView(this.name, this.pageSearch).subscribe(
          data=>{
            if (data == null) {
              this.newsPageSearch = null;
              this.pagesSearch = null;
              this.pagesSearchEmpty = false;
              this.toastr.error("Hãy nhập lại tên khác", "Không tìm thấy tên bài viết", {
                timeOut: 3000,
                extendedTimeOut: 1500
              });
              return
            }else{
              this.newsPageSearch=data['content']
              console.log(data);
              this.pagesSearch=new Array(data['totalPages'])
              this.pageSearchTotal = data['totalPages'];
              this.pagesSearchEmpty = true;
              console.log(data['totalPages']);
            }
    
          },
          (error) => {
            // this.newsPage=[]
            // this.pages = null
            console.log(error.error.message);
          }
        )
        break;
      default:
        break;
    }
}

}
