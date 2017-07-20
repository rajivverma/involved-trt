import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { URL } from '../app.service';

@Injectable()
export class LoginService {
  constructor(private router: Router, private http: Http) {
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  login(data) {
    return this.http.post(URL + '/api/user/authenticate', data)
      .map((res: Response) => res.json());
  }
}
