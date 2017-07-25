import { NgModule, Injectable } from '@angular/core';

@Injectable()
export class PiChart {
  constructor() { }
  options: Object;

  getPieChartData(GradeSet: any,
    xAxixData: any,
    GradeResults: any,
    TargetGrades: any,
    color: any) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const GradeResultsName = new Array();
    return {
      chart: {
        type: 'line',
        width: 1000
      },
      title: {
        text: '<h2><b>Performance Graph</b></h2>'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Month'
        },

        labels: {
          format: '{value:%b %Y}',
          style: {
            fontWeight: 'bold'
          }
        },
        gridLineWidth: 1,
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
      tooltip: {
        formatter: function () {
          let tooltiptxt = '';
          if (this.series.name === 'Grade') {
            const date = new Date(this.x);
            const id = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + '-' + GradeSet[this.y];
            const dateT = date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
            tooltiptxt = '<b> ' + GradeResultsName[id] + '</b><br> Grade ' + GradeSet[this.y] + ', ' + dateT;
            return tooltiptxt;
          } else {
            return false;
          }
        },
        shared: false,
        backgroundColor: color,
        style: {
          color: 'white'
        },
      },
      series: [
        {
          showInLegend: false,
          name: 'XaxisGrades',
          color: '#FFF',
          data: (function () {
            const data2 = [];
            for (let m = 0; m < xAxixData.length; m++) {
              data2.push({
                x: new Date(xAxixData[m].Date),
                y: GradeSet.indexOf(xAxixData[m].Grade)
              });
            }
            return data2;
          }()),
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          },
        }, {
          name: 'Target',
          color: '#48CAE5',
          data: (function () {
            const data1 = [];
            for (let m = 0; m < TargetGrades.length; m++) {
              data1.push({
                x: new Date(TargetGrades[m].Date),
                y: GradeSet.indexOf(TargetGrades[m].Grade),
              });
            }
            return data1;
          }()),
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        {
          name: 'Grade',
          color: color,
          data: (function () {
            const data = [];
            for (let j = 0; j < GradeResults.length; j++) {
              const date = new Date(GradeResults[j].Date);
              const id = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + '-' + GradeResults[j].Grade;
              GradeResultsName[id] = GradeResults[j].Name;
              data.push({
                x: date,
                y: GradeSet.indexOf(GradeResults[j].Grade),
              });
            }
            return data;
          }()),
          marker: {
            enabled: true,
            radius: 5,
            symbol: 'circle'
          },
        }
      ]
    };
  }
}
