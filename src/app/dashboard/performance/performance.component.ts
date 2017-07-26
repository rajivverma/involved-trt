import { Component, OnInit } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd, NavigationError,
  NavigationCancel, RoutesRecognized, ActivatedRoute, Params
} from '@angular/router';
import { PerformanceService } from './performance.service';
import { DashboardService } from '../dashboard.service';
import { PiChart } from '../commonService/pi-chart';
import { MainService } from '../../commonService/main.service';

declare var Circles: any;
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  providers: [PerformanceService, DashboardService, PiChart, MainService]
})
export class PerformanceComponent implements OnInit {
  options: Object;
  chart: Object;
  public subjectsData: any[];
  public subjectDetails: any = {};
  public intervalCount = 0;
  public intervalsId: any = [];
  public studentDetailInterval: any;
  public studentName: string;
  public monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  constructor(private router: Router,
    private performanceService: PerformanceService,
    private dashboardService: DashboardService,
    private piChart: PiChart,
    private mainService: MainService) {
    router.events.subscribe((val) => {
      // clearInterval();
      for (let i = 0; i < this.intervalsId.length; i++) {
        clearInterval(this.intervalsId[i]);
      }
    });
  }
  ngOnInit() {
    const id = localStorage.getItem('userid');
    this.studentName = localStorage.getItem('fullname');
    this.mainService.show('performance-loader');
    this.performanceService.getSubjectData(id).subscribe(
      (data) => {
        console.log(data);
        this.mainService.hide('performance-loader');
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
    document.getElementById('performance-modal').addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
  getColor(val) {
    if (val === 0) {
      return '#3c3c3c';
    } else if (val === 1) {
      return '#6bc04b';
    } else if (val === 2) {
      return '#ff7800';
    } else {
      return '#ff3c1f';
    }
  }
  getSubjectDetails(subject, e) {
    e.stopPropagation();
    const id = localStorage.getItem('userid');
    this.performanceService.getStudentPerformanceData(id, subject.Id).subscribe(
      (data) => {
        this.subjectDetails = data;
        this.subjectDetails.subject = subject;
        const d = document.getElementById('performance-modal');
        d.className += ' in';
        const GradeSet = [];
        const GradeResults = [];
        const XaxisGrades = [];
        for (let i = 0; i < this.subjectDetails.GradeSet.length; i++) {
          GradeSet.push(this.subjectDetails.GradeSet[i].Code);
        }
        console.log(data);
        this.options = this.piChart.getPieChartData(GradeSet,
          this.subjectDetails.XaxisGrades,
          this.subjectDetails.GradeResults,
          this.subjectDetails.TargetGrades,
          this.getColor(this.subjectDetails.subject.Performance.Column3.Trend)
        );
        const that = this;
        setTimeout(function () {
          document.getElementById('sd' + that.subjectDetails.subject.Id).children[1].children[1].className += ' subject-name-active';
          document.getElementById('sd' + that.subjectDetails.subject.Id).children[0].children[0].className += ' teacher-image-active';
          (function () {
            const ds = document.getElementById('sd' + that.subjectDetails.subject.Id).children[1];
            const dp = document.getElementById('sd' + that.subjectDetails.subject.Id).children[0];
            let iCount = 0;
            if (ds.childElementCount > 2) {
              iCount++;
              that.studentDetailInterval = setInterval(function () {
                if (iCount === 1) {
                  ds.children[iCount + 1].className = 'second';
                  ds.children[iCount].className = 'second subject-name-active';
                  dp.children[iCount - 1].className = 'teacher-image teacher-image-active';
                  dp.children[iCount].className = 'teacher-image';
                } else {
                  ds.children[iCount - 1].className = 'second';
                  ds.children[iCount].className = 'second subject-name-active';
                  dp.children[iCount - 2].className = 'teacher-image';
                  dp.children[iCount - 1].className = 'teacher-image teacher-image-active';
                }
                if (iCount === (ds.childElementCount - 1)) {
                  iCount = 1;
                } else {
                  iCount++;
                }
              }, 5000);
            }
          })();
          that.createCircle('attendance-circles',
            that.subjectDetails.subject.Performance.Column1.Value,
            '#b981d1',
            that.getClassName(that.subjectDetails.subject.Performance.Column1.Trend)
          );
          that.createCircle('target-circles',
            100,
            '#48cae5',
            that.getClassName(that.subjectDetails.subject.Performance.Column2.Trend)
          );
          that.createCircle('grade-circles',
            100,
            that.getColor(that.subjectDetails.subject.Performance.Column3.Trend),
            that.getClassName(that.subjectDetails.subject.Performance.Column3.Trend)
          );
        });
      },
      (err) => {
        // alert('something wrong');
      });
  }
  getClassName(name) {
    if (name === 0) {
      return 'class-zero';
    } else if (name === 1) {
      return 'class-one';
    } else if (name === 2) {
      return 'class-two';
    } else {
      return 'class-three';
    }
  }
  createCircle(id, val, color, txtColor) {
    Circles.create({
      id: id,
      radius: 35,
      value: val,
      maxValue: 100,
      width: 3,
      text: '',
      colors: ['transparent', color],
      duration: 100,
      wrpClass: 'circles-wrp',
      textClass: txtColor,
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
  }
  closeModal() {
    const d = document.getElementById('performance-modal');
    d.className = d.className.replace('in', '');
    clearInterval(this.studentDetailInterval);
  }

}
