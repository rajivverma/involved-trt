import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';
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
  public subjectDetails: any = {};
  public intervalCount: number = 0;
  public intervalsId: any = [];
  constructor(private router: Router,
    private performanceService: PerformanceService,
    private dashboardService: DashboardService,
    private piChart: PiChart) {
    router.events.subscribe((val) => {
      // clearInterval();
      for (var i = 0; i < this.intervalsId.length; i++) {
        clearInterval(this.intervalsId[i]);
      }
    })
  }
  ngOnInit() {
    const id = localStorage.getItem('userid');
    this.performanceService.getSubjectData(id).subscribe(
      (data) => {
        console.log(data);
        this.subjectsData = data;
        const count = 2;
        let that = this;
        setTimeout(function () {
          for (let i = 0; i < data.length; i++) {
            document.getElementById(data[i].Id).children[1].className += ' subject-name-active';
            document.getElementById('t' + data[i].Id).children[0].className += ' teacher-image-active';
            (function (i, count) {
              const d = document.getElementById(data[i].Id);
              const td = document.getElementById('t' + data[i].Id);
              if (d.childElementCount > 2) {
                that.intervalCount++;
                that.intervalsId.push(setInterval(function () {
                  if (count == 1) {
                    d.children[count + 1].className = 'second';
                    d.children[count].className = 'second subject-name-active';
                    td.children[count - 1].className = 'teacher-image teacher-image-active';
                    td.children[count].className = 'teacher-image';
                  }
                  else {
                    d.children[count - 1].className = 'second';
                    d.children[count].className = 'second subject-name-active';
                    td.children[count - 2].className = 'teacher-image';
                    td.children[count - 1].className = 'teacher-image teacher-image-active';
                  }
                  if (count == (d.childElementCount - 1)) {
                    count = 1;
                  }
                  else {
                    count++;
                  }
                }, 5000));
              }
            })(i, count);
          }
        })

      },
      (err) => {
        // alert('something wrong');
      });
  }
  getSubjectDetails(subject) {
    const id = localStorage.getItem('userid');
    this.performanceService.getStudentPerformanceData(id, subject.Id).subscribe(
      (data) => {
        this.subjectDetails = data;
        this.subjectDetails.subject = subject;
        console.log(this.subjectDetails);
        const d = document.getElementById('performance-modal');
        d.className += ' in';
        const GradeSet = [];
        const GradeResults = [];
        for (let i = 0; i < this.subjectDetails.GradeSet.length; i++) {
          GradeSet.push(this.subjectDetails.GradeSet[i].Code);
        }
        for (let i = 0; i < this.subjectDetails.GradeResults.length; i++) {
          GradeResults.push(this.subjectDetails.GradeResults[i].Code);
        }
        this.options = this.piChart.getPieChartData(GradeSet);
      },
      (err) => {
        // alert('something wrong');
      });
  }
  closeModal() {
    const d = document.getElementById('performance-modal');
    d.className = d.className.replace('in', '');
  }

}
