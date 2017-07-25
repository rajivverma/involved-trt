import { NgModule, Injectable } from '@angular/core';

@Injectable()
export class PiChart {
  constructor() { }
  options: Object;

  getPieChartData(GradeSet: any, xAxixData: any, GradeResults: any, TargetGrades: any) {
    const results1 = [];
    const GradeResultsName = new Array();
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
                                                        var tooltiptxt = '';
                                                         if (this.series.name == "Grade") {
                                                        var date = new Date(this.x);
                                                        var id = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"-"+GradeSet[this.y];
                                                        console.log(id);
                                                        tooltiptxt = '<b> ' + GradeResultsName[id] + '</b><br> Grade '  + GradeSet[this.y] + ', ' + new Date(this.x);
                                                            
                                                            return tooltiptxt;
                                                             } else {
                                                            return false;
                                                        }
                                                    },
                                                    shared: false,
                                                    backgroundColor: '#5bd9a4',
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
                                            var data2 = [];
                                            for (var m = 0; m < xAxixData.length; m++) {
                                               data2.push({
                                                x : new Date(xAxixData[m].Date),
                                                y : GradeSet.indexOf(xAxixData[m].Grade)
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
                                    },{
                name: 'Target',
                                        color: '#48CAE5',
                                        data: (function () {
                                            var data1 = [];
                                            for (var m = 0; m < TargetGrades.length; m++) {
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
                                        }},
                                        {
                                        name: "Grade",
                                        color: "red",
                                        
                                        data: (function () {
                                            var data = [];
                                            for (var j = 0; j < GradeResults.length; j++) {
                                            var date = new Date(GradeResults[j].Date);
                                            var id = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"-"+GradeResults[j].Grade;
                                                GradeResultsName[id] = GradeResults[j].Name;
                                                            console.log(GradeResults[j].Date + " " + GradeResults[j].Name);
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
