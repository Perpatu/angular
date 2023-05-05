import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";



@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest);
  }
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;   
    console.log('inter',currentUser)
    if (currentUser && currentUser['jwt']) {      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser['jwt']}`,
        },
      });
    }

    return next.handle(request);
  }
}

