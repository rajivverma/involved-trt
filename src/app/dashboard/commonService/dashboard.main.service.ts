import { Injectable } from '@angular/core';

@Injectable()
export class DashboardMainService {
  constructor() { }
  public studentInfo: any;
  setStudentInfo(data) {
    this.studentInfo = data;
  }
  getStudentInfo() {
    return this.studentInfo;
  }
}
