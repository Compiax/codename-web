import { AuthService } from '../auth.service';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  private headers = new Headers({'Content-Type': 'application/X-www-form-urlencoded'});
  public as: AuthService;
  public r: Router;
  constructor(private http: Http, authService: AuthService, router: Router) {
    this.as = authService;
    this.r = router;
  }

  canActivate() {
    console.log('Calling canActivate');
    const self = this;
    return new Promise<boolean>((resolve, reject) => {
      self.as.isLoggedIn().then(() => {
        resolve(true);
      })
      .catch((res) => {
        if (res.status === 401) {
          console.log("Not logged in");
          self.r.navigate(['/login']);
          resolve(false);
        };
      });
    });
  }



  isLoggedIn() {
    const url = 'http://localhost:3000/auth/loggedIn';

    return this.http.post(url, '', {headers: this.headers})
    .toPromise();
  }

}