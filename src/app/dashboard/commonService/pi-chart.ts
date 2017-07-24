import { NgModule, Injectable } from '@angular/core';

@Injectable()
export class PiChart {
  constructor() { }
  options: Object;

  getPieChartData(GradeSet: any, xAxixData: any, GradeResults: any, TargetGrades: any) {
    const results1 = [];
    const results2 = [];
    for (let i = 0; i < GradeResults.length; i++) {
      results1[i] = GradeSet.indexOf(GradeResults[i].Grade);
    }
    for (let i = 0; i < TargetGrades.length; i++) {
      results2[i] = GradeSet.indexOf(TargetGrades[i].Grade);
    }
    return {
      chart: {
        type: 'line',
        width: 1000
      },
      title: {
        text: 'Student'
      },
      xAxis: {
        categories: xAxixData
      },
      yAxis: {
        endOnTick: true,
        min: 0,
        max: 5,
        title: { text: 'Grade' },
        labels: {
          formatter: function () {
            if (GradeSet[this.value] !== undefined) {
              return '<b>' + GradeSet[this.value] + '</b>';
            }
          }
        },
      },
      credits: {
        enabled: false
      },
      series: [
        {
          data: results1,
          color: '#ff5958'
        },
        {
          data: results2,
          color: '#63d2e9',
          marker: {
            enabled: false
          },
          enableMouseTracking: false
        }]
    };
  }
}
