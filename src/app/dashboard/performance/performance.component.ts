import { Component, OnInit } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd, NavigationError,
  NavigationCancel, RoutesRecognized, ActivatedRoute, Params
} from '@angular/router';
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
  public intervalCount = 0;
  public intervalsId: any = [];
  public studentDetailInterval: any;
  public monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  constructor(private router: Router,
    private performanceService: PerformanceService,
    private dashboardService: DashboardService,
    private piChart: PiChart) {
    router.events.subscribe((val) => {
      // clearInterval();
      for (let i = 0; i < this.intervalsId.length; i++) {
        clearInterval(this.intervalsId[i]);
      }
    });
  }
  ngOnInit() {
    const id = localStorage.getItem('userid');
    this.performanceService.getSubjectData(id).subscribe(
      (data) => {
        console.log(data);
        this.subjectsData = data;
        const c = 2;
        const that = this;
        setTimeout(function () {
          for (let i = 0; i < data.length; i++) {
            document.getElementById(data[i].Id).children[1].className += ' subject-name-active';
            document.getElementById('t' + data[i].Id).children[0].className += ' teacher-image-active';
            (function (j, count) {
              const d = document.getElementById(data[j].Id);
              const td = document.getElementById('t' + data[j].Id);
              if (d.childElementCount > 2) {
                that.intervalCount++;
                that.intervalsId.push(setInterval(function () {
                  if (count === 1) {
                    d.children[count + 1].className = 'second';
                    d.children[count].className = 'second subject-name-active';
                    td.children[count - 1].className = 'teacher-image teacher-image-active';
                    td.children[count].className = 'teacher-image';
                  } else {
                    d.children[count - 1].className = 'second';
                    d.children[count].className = 'second subject-name-active';
                    td.children[count - 2].className = 'teacher-image';
                    td.children[count - 1].className = 'teacher-image teacher-image-active';
                  }
                  if (count === (d.childElementCount - 1)) {
                    count = 1;
                  } else {
                    count++;
                  }
                }, 5000));
              }
            })(i, c);
          }
        });
      },
      (err) => {
        // alert('something wrong');
      });
  }
  getColor(val) {
    if (val == 0) {
      return '#3c3c3c';
    } else if (val == 1) {
      return '#6bc04b';
    } else if (val == 2) {
      return '#ff7800';
    } else {
      return '#ff3c1f';
    }
  }
  getSubjectDetails(subject) {
    const id = localStorage.getItem('userid');
    this.performanceService.getStudentPerformanceData(id, subject.Id).subscribe(
      (data) => {
        this.subjectDetails = data;
        this.subjectDetails.subject = subject;
        const d = document.getElementById('performance-modal');
        d.className += ' in';
        const GradeSet = [];
        const GradeResults = [];
        let date;
        for (let i = 0; i < this.subjectDetails.GradeSet.length; i++) {
          GradeSet.push(this.subjectDetails.GradeSet[i].Code);
        }
        for (let i = 0; i < this.subjectDetails.XaxisGrades.length; i++) {
          date = new Date(this.subjectDetails.XaxisGrades[i].Date);
          date = this.monthNames[date.getMonth()] +' '+ date.getFullYear();
          GradeResults.push(date);
        }
        console.log(data);
        this.options = this.piChart.getPieChartData(GradeSet, GradeResults);
        let that = this;
        setTimeout(function () {
          document.getElementById('sd' + that.subjectDetails.subject.Id).children[1].children[1].className += ' subject-name-active';
          document.getElementById('sd' + that.subjectDetails.subject.Id).children[0].children[0].className += ' teacher-image-active';
          (function () {
            let d = document.getElementById('sd' + that.subjectDetails.subject.Id).children[1];
            let dp = document.getElementById('sd' + that.subjectDetails.subject.Id).children[0];
            let iCount = 0;
            if (d.childElementCount > 2) {
              iCount++;
              that.studentDetailInterval = setInterval(function () {
                if (iCount === 1) {
                  d.children[iCount + 1].className = 'second';
                  d.children[iCount].className = 'second subject-name-active';
                  dp.children[iCount - 1].className = 'teacher-image teacher-image-active';
                  dp.children[iCount].className = 'teacher-image';
                } else {
                  d.children[iCount - 1].className = 'second';
                  d.children[iCount].className = 'second subject-name-active';
                  dp.children[iCount - 2].className = 'teacher-image';
                  dp.children[iCount - 1].className = 'teacher-image teacher-image-active';
                }
                if (iCount === (d.childElementCount - 1)) {
                  iCount = 1;
                } else {
                  iCount++;
                }
              }, 5000);
            }
          })();
        });
      },
      (err) => {
        // alert('something wrong');
      });
  }
  closeModal() {
    const d = document.getElementById('performance-modal');
    d.className = d.className.replace('in', '');
    clearInterval(this.studentDetailInterval);
  }

}
