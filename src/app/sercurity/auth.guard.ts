import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "../service/token-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

  constructor(private router: Router,
              private tokenStorageService:TokenStorageService,
              private toastr: ToastrService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.tokenStorageService.getUser();
    let actualRole: string [] = [];
    if (currentUser !== null){

      let roles = currentUser.roles;

      for (let role of roles){
        actualRole.push(role['authority']);
      }
      // console.log(" 2 dieu kien: " + !this.tokenStorageService.isAuthenticated() + " and " + (route.data.role.indexOf(actualRole[0]) === -1))

      actualRole.sort()

      if (!this.tokenStorageService.isAuthenticated() || route.data.expectedRole.indexOf(actualRole[0]) == -1){
        // this.router.navigate(['/login']);
        this.toastr.warning("Bạn không có quyền truy cập vào đường dẫn này." +
                                    " Vui lòng đăng nhập bằng tài khoản có quyền truy cập cao hơn!",
                                "Từ chối truy cập: ",
          {
            timeOut:7000}
            );
        actualRole.length = 0;
        return false;
      }
      actualRole.length = 0;
      return true;
    }
    // this.router.navigate(['/login']);
    this.toastr.warning("Bạn không có quyền truy cập vào đường dẫn này." +
      " Vui lòng đăng nhập bằng tài khoản có quyền truy cập cao hơn!",
      "Từ chối truy cập: ",
      {
        timeOut:7000}
        );
    actualRole.length = 0;
    return false;
  }


}
