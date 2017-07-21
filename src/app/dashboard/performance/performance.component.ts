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
  public subjectsData: any[];
  constructor(private router: Router,
    private performanceService: PerformanceService,
    private dashboardService: DashboardService,
    private piChart: PiChart) { }
  ngOnInit() {
    const id = localStorage.getItem('userid');
    this.performanceService.getSubjectData(id).subscribe(
      (data) => {
        console.log(data);
        this.subjectsData = data;
      },
      (err) => {
        // alert('something wrong');
      });
  }
  getSubjectDetails(sId) {
    const id = localStorage.getItem('userid');
    this.performanceService.getStudentPerformanceData(id, sId).subscribe(
      (data) => {
        console.log(data);
        const d = document.getElementById('performance-modal');
        d.className += ' in';
        this.getPieChartData();
      },
      (err) => {
        // alert('something wrong');
      });
  }
  closeModal() {
    const d = document.getElementById('performance-modal');
    d.className = d.className.replace('in', '');
  }
  getPieChartData() {
    this.options = this.piChart.getPieChartData();
  }
}
