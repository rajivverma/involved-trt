import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  public studentInfo: any = {};
  constructor(private dashboardService: DashboardService, private router: Router) { }
  ngOnInit() {
    this.dashboardService.getStudentDetails().subscribe(
      (data) => {
        this.studentInfo = data;
        localStorage.setItem('userid', data.Id);
        console.log(data);
        if (this.router.url === '/dashboard') {
          this.router.navigate(['dashboard/performance']);
        }
      },
      (err) => {
        console.log(err);
      });
  }
  logoutPopup() {
    document.getElementById('logout').style.display = 'block';
    setTimeout(function () {
      document.getElementById('logout').className = 'show-logout';
    }, 100);
  }
  cancelLogout() {
    document.getElementById('logout').className = '';
    setTimeout(function () {
      document.getElementById('logout').style.display = '';
    }, 100);
  }
  logout() {
    this.dashboardService.logout();
  }
}
