import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { URL } from '../app.service';

@Injectable()
export class ForgotPaswordService {
  constructor(private router: Router, private http: Http) {
  }
  submit(username) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(URL + '/api/account/resetpassword/username=' + username, options)
      .map((res: Response) => res.json());
  }
}
