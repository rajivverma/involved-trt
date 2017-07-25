import { Injectable } from '@angular/core';

@Injectable()
export class DashboardMainService {
  constructor() { }
  public studentInfo : any;
  setStudentInfo(data){
    console.log(data);
    this.studentInfo = data;
  }
  getStudentInfo(){
    return this.studentInfo;
  }
}
