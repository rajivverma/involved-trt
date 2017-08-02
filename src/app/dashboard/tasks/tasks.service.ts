import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { URL } from '../../app.service';

@Injectable()
export class TaskService {
  constructor(private http: Http) {
  }
  getToken() {
    const headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    const options = new RequestOptions({ headers: headers });
    return options;
  }
  getWeekList(studentId, startDate, endDate) {
    const token = this.getToken();
    const url = '/api/studenttasks/weeklist/studentid=' + studentId + '&startdate=' + startDate + '&enddate=' + endDate;
    return this.http.get(URL + url, token)
      .map((res: Response) => res.json());
  }
  getStudentTasks(studentId, startDate, endDate) {
    const token = this.getToken();
    const url = '/api/studenttasks/studentid=' + studentId + '&startdate=' + startDate + '&enddate=' + endDate;
    return this.http.get(URL + url, token)
      .map((res: Response) => res.json());
  }
  searchStudentTasks(studentId, text) {
    const token = this.getToken();
    const url = '/api/search/studenttasks/studentid=' + studentId + '&text=' + text;
    return this.http.get(URL + url, token)
      .map((res: Response) => res.json());
  }
}
