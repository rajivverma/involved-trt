import { Component, OnInit } from '@angular/core';
import { MainService } from '../../commonService/main.service';
import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  providers: [TaskService, MainService]
})
export class TasksComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private taskService: TaskService,
  ) { }
  public studentId = localStorage.getItem('userid');
  public weekList: any = [];
  public taskList: any = [];
  public searchTask: string;
  public firstday = new Date();
  public lastday = new Date();
  public weekCount = 1;
  ngOnInit() {
    this.firstday.setDate(this.firstday.getDate() - 22);
    this.lastday.setDate(this.lastday.getDate() + 22);
    this.taskService.getWeekList(
      this.studentId,
      this.convertDate(this.firstday),
      this.convertDate(this.lastday)
    ).subscribe(
      (data) => {
        console.log(data);
        this.weekList = data;
        this.getStudentTasks(data);
      },
      (err) => {
        console.log(err);
      });
  }
  convertDate(date) {
    return date.getFullYear() +
      '-' + ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' + ('0' + date.getDate()).slice(-2);
  }
  getStudentTasks(data) {
    this.taskService.getStudentTasks(
      this.studentId,
      this.convertDate(new Date(data[3].StartDate)),
      this.convertDate(new Date(data[3].EndDate))
    ).subscribe(
      (dataT) => {
        this.taskList = dataT;
        console.log(dataT);
      },
      (err) => {
        console.log(err);
      });
  }
  getWeekTaskLIst(index) {
    const obj = this.weekList[index];
    this.taskService.getStudentTasks(
      this.studentId,
      this.convertDate(new Date(obj.StartDate)),
      this.convertDate(new Date(obj.EndDate))
    ).subscribe(
      (data) => {
        this.taskList = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      });
  }
  searchStudentTasks() {
    this.taskService.searchStudentTasks(
      this.studentId,
      this.searchTask
    ).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      });
  }
  loadMorePreviousWeek() {
    this.weekCount--;
    this.taskService.searchStudentTasks(
      this.studentId,
      this.searchTask
    ).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      });
  }
  loadMoreNextWeek() {
    this.weekCount++;
    this.taskService.searchStudentTasks(
      this.studentId,
      this.searchTask
    ).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      });
  }
}
