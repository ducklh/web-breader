import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {ShareService} from "../../service/share.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LogOutComponent} from "../../sercurity/log-out/log-out.component";
import {CageService} from "../../service/cage.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  role: string;
  isLoggedIn: boolean;
  dialogRef: MatDialogRef<LogOutComponent>
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private shareService : ShareService,
              public dialog: MatDialog,
              private cageService: CageService
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    })
  }

  ngOnInit(): void {
    this.loadHeader()
    // this.cageService.sendUsernameForCreateCage(this.username)
  }

  private loadHeader():void {
    if (this.tokenStorageService.getUser() !== null) {
      this.username = this.tokenStorageService.getUser().name;
    }else {
      this.username = null;
    }
    this.isLoggedIn = (this.username !== null);
  }


  openDialog() {

    this.dialogRef = this.dialog.open(LogOutComponent, {
      width: '450px',

    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }


}
