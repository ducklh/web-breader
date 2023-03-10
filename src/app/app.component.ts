import {Component, NgZone} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'A0421I1 Project';

  isLogin: boolean;
  token: string;
  constructor (private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/forgot-password' || event.url === '/verify-reset-password?token=' + this.token) {
          this.isLogin= true;
        } else {
          this.isLogin= false;
        }
      }
    });
  }

}
