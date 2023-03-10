import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HeaderComponent} from "../../component/header/header.component";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private shareService : ShareService,
              public dialogRef: MatDialogRef<LogOutComponent>,
             ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close()
  }

  logOut() {
    this.tokenStorageService.logOut();
    this.dialogRef.close({event: true});
    this.router.navigate(['/login']);

  }
}
