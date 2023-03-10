import { Component, OnInit , Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NewsService} from '../../service/news.service';
import {ToastrService} from "ngx-toastr";
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ParentMessageNewsDetail } from 'src/app/model/parentMessageNewsDetail';


@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.css']
})
export class NewDetailsComponent implements OnInit, OnChanges {

	@Input() childMessage: ParentMessageNewsDetail;
  @Input() loadNewsCommentChilds: boolean ;
  news:any;
  comment:Array<any>;;
  @Output() backList = new EventEmitter();
  @Output() reloadComment = new EventEmitter();
  commentForm = this.fb.group({
    content: '',
    newsId: '',
    employeeId: '',
    isDelete: false,
  });
  searchButton: boolean = false;
  name: String;
  username: string;
  role: string;
  isLoggedIn: boolean;
  avartar: String;
  sizeComment: number;
  constructor(private toastr: ToastrService, private newsService: NewsService,  private fb: FormBuilder, private tokenStorageService: TokenStorageService,) { }
  ngOnChanges(): void {
    this.showDetail(this.childMessage.parentMessage)
    this.getListComment(this.childMessage.parentMessage)
    this.commentForm = this.fb.group({
      content: '',
      newsId: '',
      employeeId: '',
      isDelete: false,
    });
    this.isLoggedIn = this.childMessage.isLoggin
    console.log("change");
    
  } 


  ngOnInit() {
    // console.log(this.childMessage);
    // this.showDetail(this.childMessage.parentMessage)
    this.commentForm = this.fb.group({
      content: '',
      newsId: '',
      employeeId: '',
      isDelete: false,
    });
    this.isLoggedIn = this.childMessage.isLoggin
    console.log("init");
    
  }
  showDetail(id){
    this.username = this.childMessage.nameUser
    this.avartar = this.childMessage.avatar
    this.newsService.showDetailNews(id).subscribe(
      data=>{
        this.news=data
        console.log(data);
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }
  getListComment(id){
    this.newsService.findCommetnByIdNew(id).subscribe(
      data=>{
        if (data == null) {
          this.comment=null
        }else{
          this.comment=data['content']
          this.sizeComment = data['content'].length
          console.log(data);
        }
      },
      (error) => {
        console.log(error.error.message);
        this.comment = null
      }
    )
  }
  backListViews() {
    this.backList.emit();
    // H??m vote s??? t??ng counter l??n 1, ?????ng th???i th??ng qua EventEmitter b???n value counter n??y ra component cha
  }
  onSubmit() {
    this.searchButton = true;
    
    if (this.commentForm.value.content == "" || this.commentForm.value == null) {
      this.toastr.error("H??y nh???p comment kh??c", "Kh??ng ???????c ????? tr???ng", {
        timeOut: 3000,
        extendedTimeOut: 1500
      });
      this.commentForm.reset()
    }else{
      this.commentForm.value.newsId = this.childMessage.parentMessage;
      this.commentForm.value.employeeId = this.childMessage.idEmployee;
      console.log(this.commentForm.value);
      this.reloadComment.emit();
      this.newsService.createComent(this.commentForm.value).subscribe(data =>{
        console.log(data);
        this.commentForm.reset()
        this.toastr.success("B???n ???? t???o m???i m???t b??nh lu???n", "Th??nh c??ng: ", {
          timeOut: 4000,
          extendedTimeOut:1000
        })
        this.ngOnChanges();
      }, error => {
        this.toastr.error("Th??ng tin chu???ng nu??i kh??ng h???p l???!", "L???i: ", {
          timeOut: 4000,
          extendedTimeOut: 1000
        })
      })
    }
  }
}
