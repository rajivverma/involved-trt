import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PerformanceComponent } from './performance/performance.component';
import { TasksComponent } from './tasks/tasks.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AnnouncementsComponent } from './announcements/announcements.component';


@NgModule({
  imports: [
    DashboardRoutingModule,
    RouterModule,
    FormsModule,
    HttpModule
  ],
  exports: [],
  declarations: [DashboardComponent, PerformanceComponent, TasksComponent, TimetableComponent, AnnouncementsComponent],
  providers: [],
})
export class DashboardModule { }
