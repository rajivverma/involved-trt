import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerformanceService } from './performance.service';
import { DashboardService } from '../dashboard.service';
import { PiChart } from '../commonService/pi-chart';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  providers: [PerformanceService, DashboardService, PiChart]
})
export class PerformanceComponent implements OnInit {
  options: Object;
  chart: Object;
  constructor(private router: Router,
    private performanceService: PerformanceService,
    private dashboardService: DashboardService,
    private piChart: PiChart) { }
  ngOnInit() {
    this.getPieChartData();
    this.dashboardService.getCounter(13).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        alert('something wrong');
      });
    this.performanceService.getStudentData(13).subscribe(
      (data) => {
        console.log(data);
        this.studentPerformance();
      },
      (err) => {
        alert('something wrong');
      });
  }
  studentPerformance() {
    this.performanceService.getStudentPerformanceData(13, 414).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        alert('something wrong');
      });
  }

  getPieChartData() {
    this.options = this.piChart.getPieChartData();
  }
}
