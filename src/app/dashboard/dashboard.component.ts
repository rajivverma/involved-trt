import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  public studentInfo: any = {};
  constructor(private dashboardService: DashboardService) { }
  ngOnInit() {
    this.dashboardService.getStudentDetails().subscribe(
      (data) => {
        this.studentInfo = data;
        localStorage.setItem('userid', data.id);
        console.log(data);
      },
      (err) => {
        console.log(err);
      });
  }
  logout() {
    this.dashboardService.logout();
  }
}
