import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { URL } from '../../app.service';
import { MainService } from '../../commonService/main.service';

@Injectable()
export class TaskService {
  constructor(private http: Http, private mainService: MainService) {
  }
  getToken() {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.mainService.getCookie('token') });
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
  getTaskDetails(taskId) {
    const token = this.getToken();
    return this.http.get(URL + '/api/studenttasks/' + taskId, token)
      .map((res: Response) => res.json());
  }
  downloadAttachment(id) {
    const token = this.getToken();
    token.headers.append('responseType', 'arraybuffer');
    return this.http.get(URL + '/api/files/taskattachment=' + id, token)
      .map((res: Response) => res);
  }
  requestTeacherSupport(id) {
    const token = this.getToken();
    return this.http.post(URL + '/api/studenttasks/' + id + '/requestsupport', {}, token)
      .map((res: Response) => res.json());
  }
  markAsRead(id) {
    const token = this.getToken();
    return this.http.post(URL + '/api/studenttasks/' + id + '/markasread', {}, token)
      .map((res: Response) => res.json());
  }
  setTaskStatus(id, status) {
    const token = this.getToken();
    return this.http.post(URL + '/api/studenttasks/' + id + '/iscompleted=' + status, {}, token)
      .map((res: Response) => res.json());
  }
  saveTask(data) {
    const token = this.getToken();
    return this.http.post(URL + '/api/personaltasks', data, token)
      .map((res: Response) => res.json());
  }
}
