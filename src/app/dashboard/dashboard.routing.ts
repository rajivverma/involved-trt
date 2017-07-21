import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthGuard } from '../auth/auth-gaurd.service';
import { PerformanceComponent } from './performance/performance.component';
import { TasksComponent } from './tasks/tasks.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AnnouncementsComponent } from './announcements/announcements.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'performance', component: PerformanceComponent },
          { path: 'tasks', component: TasksComponent },
          { path: 'timetable', component: TimetableComponent },
          { path: 'announcements', component: AnnouncementsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})

export class DashboardRoutingModule { }
