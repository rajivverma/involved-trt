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
    const id = localStorage.getItem('userid');
    this.dashboardService.getCounter(id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        // alert('something wrong');
      });
    this.performanceService.getStudentData(id).subscribe(
      (data) => {
        console.log(data);
        this.studentPerformance();
      },
      (err) => {
        // alert('something wrong');
      });
  }
  studentPerformance() {
    const id = localStorage.getItem('userid');
    this.performanceService.getStudentPerformanceData(id, 414).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        // alert('something wrong');
      });
  }

  getPieChartData() {
    this.options = this.piChart.getPieChartData();
  }
}
