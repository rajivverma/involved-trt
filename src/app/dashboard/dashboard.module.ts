import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PerformanceComponent } from './performance/performance.component';
import { TasksComponent } from './tasks/tasks.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { DateFormatPipe } from '../filter/dateformat.filter';
import { SafeHtmlPipe } from '../filter/safeHTML.filter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);
  return hc;
}
@NgModule({
  imports: [
    DashboardRoutingModule,
    RouterModule,
    FormsModule,
    HttpModule,
    ChartModule,
    CommonModule,
     PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    DateFormatPipe,
    SafeHtmlPipe,
    PerformanceComponent,
    TasksComponent,
    TimetableComponent,
    AnnouncementsComponent
  ],
  providers: [{
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  }]
})
export class DashboardModule { }
