import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  User:any = [];
  authenticated:boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;     
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.router.navigate(["/authentication/signin"]);
        return false;
      }
      return true;
    }

    this.router.navigate(["/authentication/signin"]);
    return false;
  }
}
