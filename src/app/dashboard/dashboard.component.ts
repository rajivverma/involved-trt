import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { MainService } from '../commonService/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardService, MainService]
})
export class DashboardComponent implements OnInit {

  public studentInfo: any = {};
  public counterData: any = {};
  constructor(private dashboardService: DashboardService,
    private router: Router,
    private mainService: MainService) { }
  ngOnInit() {
    this.mainService.show('dashboard-loader');
    this.dashboardService.getStudentDetails().subscribe(
      (data) => {
        this.mainService.hide('dashboard-loader');
        this.studentInfo = data;
        localStorage.setItem('userid', data.Id);
        localStorage.setItem('fullname', data.Firstname + ' ' + data.Lastname);
        console.log(data);
        if (this.router.url === '/dashboard') {
          this.router.navigate(['dashboard/performance']);
        }
        this.dashboardService.getCounter(data.Id).subscribe(
          (dataC) => {
            this.counterData = dataC;
          },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
        localStorage.clear();
        this.router.navigate(['login']);
        console.log(err);
      });
  }
  logoutPopup() {
    document.getElementById('logout').style.display = 'block';
    setTimeout(function () {
      document.getElementById('logout').className = 'show-logout';
    }, 100);
  }
  cancelLogout(event) {
    event.stopPropagation();
    document.getElementById('logout').className = '';
  }
  logout() {
    this.dashboardService.logout().subscribe(
      (data) => {
        console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('fullname');
        this.router.navigate(['login']);
      },
      (err) => {
        console.log(err);
      });
  }
}
