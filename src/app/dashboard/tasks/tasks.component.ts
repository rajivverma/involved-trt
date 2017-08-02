import { Component, OnInit } from '@angular/core';
import { MainService } from '../../commonService/main.service';
import { TaskService } from './tasks.service';
import { DateFormatPipe } from '../../filter/dateformat.filter';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  providers: [TaskService, MainService, DateFormatPipe]
})
export class TasksComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private taskService: TaskService,
  ) { }
  public studentId = localStorage.getItem('userid');
  public weekList: any = [];
  public taskList: any = [];
  public searchTask: string = '';
  public firstday = new Date();
  public lastday = new Date();
  public nextWeekCount = 0;
  public activeWeekIndex = 3;
  public searchResultData: any = [];
  public monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
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
        this.displayDropDownDate(data);
        this.getStudentTasks(data);
      },
      (err) => {
        console.log(err);
      });
    document.getElementsByTagName('body')[0].addEventListener('click', function () {
      const d = document.getElementById('dropdown-week');
      if (d != null) {
        d.style.display = '';
      }
      const sT = document.getElementById('searchTask');
      if (sT != null) {
        sT.style.display = '';
      }
    });
  }
  convertDate(date) {
    return date.getFullYear() +
      '-' + ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' + ('0' + date.getDate()).slice(-2);
  }
  displayDropDownDate(data) {
    let dateS, dateE;
    for (let i = 0; i < data.length; i++) {
      dateS = new Date(data[i].StartDate);
      dateE = new Date(data[i].EndDate);
      data[i].displayStartDate = this.monthNames[(dateS.getMonth())]
        + ' ' + ('0' + dateS.getDate()).slice(-2);
      data[i].displayEndDate = this.monthNames[(dateE.getMonth())]
        + ' ' + ('0' + dateE.getDate()).slice(-2);
    }
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
        this.firstday.setDate(this.firstday.getDate() - (7 * (3 - index)));
        this.lastday.setDate(this.lastday.getDate() - (7 * (3 - index)));
        const timeDiff = Math.abs(this.lastday.getTime() - this.firstday.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays != 44) {
          this.lastday = new Date(this.firstday);
          this.lastday.setDate(this.lastday.getDate() + 44);
        }
        this.taskService.getWeekList(
          this.studentId,
          this.convertDate(this.firstday),
          this.convertDate(this.lastday)
        ).subscribe(
          (data) => {
            this.weekList = data;
            this.activeWeekIndex = 3;
            this.displayDropDownDate(data);
          },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
        console.log(err);
      });
  }
  searchStudentTasks(e) {
    e.stopPropagation();
    if (this.searchTask === undefined) {
      console.log(this.searchTask);
    }
    else if (this.searchTask.length < 3) {
    }
    else {
      this.taskService.searchStudentTasks(
        this.studentId,
        this.searchTask
      ).subscribe(
        (data) => {
          const msg = document.getElementById('userChar');
          if (data.Data === null) {
            msg.innerHTML = 'No task found Please refine your search';
          }
          else if (data.Data.length === 0) {
            msg.innerHTML = 'No task found Please refine your search';
          }
          else {
            msg.innerHTML = '';
            msg.style.display = 'none';
            this.searchResultData = data.Data;
            console.log(data.Data);
          }
        },
        (err) => {
          console.log(err);
        });
    }
  }
  loadMorePreviousWeekTask() {
    const obj = this.weekList[this.activeWeekIndex - 1];
    this.taskService.getStudentTasks(
      this.studentId,
      this.convertDate(new Date(obj.StartDate)),
      this.convertDate(new Date(obj.EndDate))
    ).subscribe(
      (data) => {
        this.taskList = data;
        console.log(data);
        this.firstday.setDate(this.firstday.getDate() - 7);
        this.lastday.setDate(this.lastday.getDate() - 7);
        this.taskService.getWeekList(
          this.studentId,
          this.convertDate(this.firstday),
          this.convertDate(this.lastday)
        ).subscribe(
          (data) => {
            this.weekList = data;
            this.activeWeekIndex = 3;
            this.displayDropDownDate(data);
          },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
        console.log(err);
      });
  }
  loadMoreNextWeekTask() {
    const obj = this.weekList[this.activeWeekIndex + 1];
    this.taskService.getStudentTasks(
      this.studentId,
      this.convertDate(new Date(obj.StartDate)),
      this.convertDate(new Date(obj.EndDate))
    ).subscribe(
      (data) => {
        this.taskList = data;
        console.log(data);
        this.firstday.setDate(this.firstday.getDate() + 7);
        this.lastday.setDate(this.lastday.getDate() + 7);
        this.taskService.getWeekList(
          this.studentId,
          this.convertDate(this.firstday),
          this.convertDate(this.lastday)
        ).subscribe(
          (data) => {
            this.weekList = data;
            this.activeWeekIndex = 3;
            this.displayDropDownDate(data);
          },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
        console.log(err);
      });
  }
  loadMorePreviousWeek(e) {
    e.stopPropagation();
    this.firstday.setDate(this.firstday.getDate() - (7 * 3));
    this.lastday.setDate(this.lastday.getDate());
    this.taskService.getWeekList(
      this.studentId,
      this.convertDate(this.firstday),
      this.convertDate(this.lastday)
    ).subscribe(
      (data) => {
        this.weekList = data;
        this.activeWeekIndex += 3;
        this.displayDropDownDate(data);
      },
      (err) => {
        console.log(err);
      });
  }
  loadMoreNextWeek(e) {
    e.stopPropagation();
    this.firstday.setDate(this.firstday.getDate());
    this.lastday.setDate(this.lastday.getDate() + (7 * 3));
    this.taskService.getWeekList(
      this.studentId,
      this.convertDate(this.firstday),
      this.convertDate(this.lastday)
    ).subscribe(
      (data) => {
        this.weekList = data;
        this.displayDropDownDate(data);
      },
      (err) => {
        console.log(err);
      });

  }
  openWeekList(e) {
    e.stopPropagation();
    const d = document.getElementById('dropdown-week');
    if (d.style.display != 'block') {
      d.style.display = 'block';
    } else {
      d.style.display = '';
    }
  }
  searchTextValidation(e) {
    const msg = document.getElementById('userChar');
    const d = document.getElementById('searchTask');
    msg.style.display = 'block';
    this.searchResultData = [];
    if (e != undefined) {
      e.stopPropagation();
      d.style.display = 'block';
      if (this.searchTask.length < 4) {
        msg.innerHTML = 'Enter a minimum of 3 characters';
      }
      return;
    }
    if (this.searchTask != undefined) {
      if (this.searchTask.length > 3) {
        msg.innerHTML = 'Press Enter to search';
      }
      else if (msg.innerHTML === 'Enter a minimum of 3 characters') {
      }
      else {
        msg.innerHTML = 'Enter a minimum of 3 characters';
      }
    }
  }
  clearSearch() {
    this.searchTask = '';
    const msg = document.getElementById('userChar');
    msg.innerHTML = 'Enter a minimum of 3 characters';
  }
}
