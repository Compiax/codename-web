import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  private headers = new Headers({'Content-Type': 'application/X-www-form-urlencoded'});
  public as: AuthService;
  constructor(private http: Http, authService: AuthService) {
    this.as = authService;
  }

  canActivate() {
    console.log('Calling canActivate');
    const self = this;
    // return new Promise<boolean>((resolve, reject) => {
    //   self.as.isLoggedIn().then(() => {
    //     resolve(true);
    //   })
    //   .catch((res) => {
    //     if (res.status === 401) {
    //       console.log("Not logged in");
    //       resolve(false);
    //     };
    //   });
    // });
    return true;
  }



  isLoggedIn() {
    const url = 'http://localhost:3000/auth/loggedIn';

    return this.http.post(url, '', {headers: this.headers})
    .toPromise();
  }

}
