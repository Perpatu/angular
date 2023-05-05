import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SharedService } from "./shared.service";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";



@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  User:any = [];


  constructor(
      private http: HttpClient,
      private service: SharedService
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(      
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable(); 
  }
  
  public get currentUserValue(): User {    

    
    return JSON.parse(localStorage.getItem("currentUser"))
  }

  login(name: string, password: string) {   
    return this.service.login(name, password).pipe(map((user) => {      
        this.service.getUserCurrent().subscribe(
          (currentUser: any) => {
            this.service.authToken(name, password).subscribe((authToken: any) => {    
              this.User = currentUser
              localStorage.setItem("auth", authToken.token);
              localStorage.setItem("currentUser", JSON.stringify(currentUser)); 
              localStorage.setItem('theme', 'dark');
              localStorage.setItem('dark', 'theme-black');
              localStorage.setItem('menuOption', 'menu_dark');
              localStorage.setItem('choose_logoheader', 'logo-black');
              localStorage.setItem('choose_skin', 'theme-black');
              localStorage.setItem('tableShowSecretariat', 'false');
              localStorage.setItem('tableShow', 'false');
              this.currentUserSubject.next(user);              
            })
          },
        );
        return user;
      })
    );
  }

  logout() {  
    localStorage.removeItem("currentUser");
    localStorage.removeItem("auth");
    localStorage.removeItem("pdfjs.history");
    this.service.logout().subscribe();   
    this.currentUserSubject.next(null);
    window.location.reload();
    window.location.reload();
    //return of({ success: false });
  }
}
