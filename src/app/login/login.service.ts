import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { URL } from '../app.service';

export class User {
  constructor(
    public username: string,
    public password: string) { }
}
@Injectable()
export class LoginService {
  constructor(private router: Router, private http: Http) {
  }
  login(data) {
    const body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);
    body.set('clientid', data.clientid);
    body.set('devicetoken', data.devicetoken);
    body.set('grant_type', data.grant_type);
    body.set('platform', data.platform);
    return this.http.post(URL + '/token', body)
      .map((res: Response) => res.json());
  }
}
