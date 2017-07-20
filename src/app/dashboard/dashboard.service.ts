import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { URL } from '../app.service';

@Injectable()
export class DashboardService {
  constructor(private http: Http) {

  }
  getToken() {
    const headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    const options = new RequestOptions({ headers: headers });
    return options;
  }
  getCounter(id) {
    let token = this.getToken();
    return this.http.get(URL + '/api/students/' + id + '/counters', token)
      .map((res: Response) => res.json());
  }
}
