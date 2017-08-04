import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { MainService } from '../commonService/main.service';
import { DashboardMainService } from '../dashboard/commonService/dashboard.main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardService, MainService, DashboardMainService]
})
export class DashboardComponent implements OnInit {

  public studentInfo: any = {};
  public counterData: any = {};
  public cookieInterval;
  constructor(private dashboardService: DashboardService,
    private router: Router,
    private mainService: MainService,
    private dashboardMainService: DashboardMainService) { }
  ngOnInit() {
    this.mainService.show('dashboard-loader');
    this.dashboardService.getStudentDetails().subscribe(
      (data) => {
        this.mainService.hide('dashboard-loader');
        this.studentInfo = data;
        localStorage.setItem('PerformanceGradeUrl',data.PerformanceGradeUrl);
        localStorage.setItem('PerformanceGraph',data.SupportedFeatures.PerformanceGraph);
        this.dashboardMainService.setStudentInfo(data);
        localStorage.setItem('userid', data.Id);
        localStorage.setItem('fullname', data.Firstname + ' ' + data.Lastname);
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
        this.clearCookies();
        this.router.navigate(['login']);
        console.log(err);
      });
    document.getElementById('mainDiv').addEventListener('click', function () {
      const d = document.getElementById('performance-modal');
      if (d != null) {
        d.className = d.className.replace('in', '');
      }
    });
    const that = this;
    this.cookieInterval = setInterval(function () {
      const val = that.mainService.getCookie('token');
      if (val === undefined || val === '') {
        that.mainService.show('cookie-delete');
      }
    }, 1000);
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
        this.clearCookies();
        clearInterval(this.cookieInterval);
        this.cookieInterval = undefined;
        this.router.navigate(['login']);
      },
      (err) => {
        console.log(err);
      });
  }
  goToLogin() {
    this.clearCookies();
    clearInterval(this.cookieInterval);
    this.cookieInterval = undefined;
    this.router.navigate(['login']);
  }
  clearCookies() {
    document.cookie = 'token' + "=";
    document.cookie = 'userid' + "=";
    document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'userid' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
