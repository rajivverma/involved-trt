import { Component, OnInit } from '@angular/core';
import { MainService } from '../../commonService/main.service';
import { TaskService } from './tasks.service';
import { DateFormatPipe } from '../../filter/dateformat.filter';
import { SafeHtmlPipe } from '../../filter/safeHTML.filter';
import 'rxjs/Rx';
import * as moment from 'moment';
import * as _ from 'lodash';

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
  public taskDescription: any;
  public weekList: any = [];
  public taskList: any = [];
  public searchTask = '';
  public firstday = new Date();
  public lastday = new Date();
  public nextWeekCount = 0;
  public activeWeekIndex = 3;
  public searchResultData: any = [];
  public taskDescriptionDetails: any;
  public monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  public daysList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  public todayDate = new Date();
  public todayDay = this.todayDate.getDate();
  public todayDayMonth = this.todayDate.getMonth() + 1;
  public todayDayYear = this.todayDate.getFullYear();
  public yearsList = [this.todayDayYear - 1, this.todayDayYear];
  public selectedYearIndex = 1;
  public taskDetails = {
    'title': '',
    'description': ''
  };
  public dropDownDate: any;
  ngOnInit() {
    this.dropDownDate = document.querySelectorAll('.dropdown-date');
    this.taskDescription = document.getElementById('task-description');
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
    const that = this;
    document.getElementsByTagName('body')[0].addEventListener('click', function () {
      that.hideOpenDiv('dropdown-week');
      that.hideOpenDiv('searchTask');
      that.hideOpenDiv('task-description');
      const addTask = document.getElementById('add-task');
      if (addTask != null) {
        that.mainService.closeModal('add-task');
        document.querySelector('body').className = document.querySelector('body').className.replace('modal-back', '');
      }
    });
    _.forEach(document.querySelectorAll('.date-cell'), function (element, index) {
      element.addEventListener('click', function (e) {
        e.stopPropagation();
        if (this.querySelector('.dropdown-date').style.display === 'block') {
          this.querySelector('.dropdown-date').style.display = '';
          this.querySelector('.fa-caret-down').style.transform = '';
        } else {
          removeDisplayTransform();
          this.querySelector('.dropdown-date').style.display = 'block';
          this.querySelector('.fa-caret-down').style.transform = 'rotate(180deg)';
        }
      });
    });
    const addTask = document.getElementById('add-task').querySelector('.modal-content');
    addTask.addEventListener('click', function (e) {
      e.stopPropagation();
      removeDisplayTransform();
    });
    setTimeout(function (todayDay, todayDayMonth) {
      that.dropDownDate[0].querySelectorAll('li')[todayDay].className = 'active-week';
      that.dropDownDate[1].querySelectorAll('li')[todayDayMonth].className = 'active-week';
      that.dropDownDate[2].querySelectorAll('li')[2].className = 'active-week';
    }, 1000, this.todayDay, this.todayDayMonth);
    function removeDisplayTransform() {
      _.forEach(document.querySelectorAll('.date-cell'), function (value) {
        (<HTMLElement>value.querySelector('.dropdown-date')).style.display = '';
        (<HTMLElement>value.querySelector('.fa-caret-down')).style.transform = '';
      });
    }
  }
  preventDefault(e) {
    e.stopPropagation();
  }
  hideOpenDiv(id) {
    const openDiv = document.getElementById(id);
    if (openDiv != null) {
      openDiv.style.display = '';
    }
  }
  convertDate(date) {
    return date.getFullYear() +
      '-' + ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' + ('0' + date.getDate()).slice(-2);
  }
  displayDropDownDate(data) {
    let dateS, dateE;
    const that = this;
    _.forEach(data, function (value) {
      dateS = new Date(value.StartDate);
      dateE = new Date(value.EndDate);
      value.displayStartDate = that.monthNames[(dateS.getMonth())]
        + ' ' + ('0' + dateS.getDate()).slice(-2);
      value.displayEndDate = that.monthNames[(dateE.getMonth())]
        + ' ' + ('0' + dateE.getDate()).slice(-2);
    });
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
    this.mainService.show('task-loader');
    this.taskService.getStudentTasks(
      this.studentId,
      this.convertDate(new Date(obj.StartDate)),
      this.convertDate(new Date(obj.EndDate))
    ).subscribe(
      (data) => {
        this.taskList = data;
        this.mainService.hide('task-loader');
        this.firstday.setDate(this.firstday.getDate() - (7 * (3 - index)));
        this.lastday.setDate(this.lastday.getDate() - (7 * (3 - index)));
        const timeDiff = Math.abs(this.lastday.getTime() - this.firstday.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays !== 44) {
          this.lastday = new Date(this.firstday);
          this.lastday.setDate(this.lastday.getDate() + 44);
        }
        this.taskService.getWeekList(
          this.studentId,
          this.convertDate(this.firstday),
          this.convertDate(this.lastday)
        ).subscribe(
          (dataC) => {
            this.weekList = dataC;
            this.activeWeekIndex = 3;
            this.displayDropDownDate(dataC);
          },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
        this.mainService.hide('task-loader');
        console.log(err);
      });
  }
  searchStudentTasks(e) {
    e.stopPropagation();
    if (this.searchTask === undefined) {
      console.log(this.searchTask);
    } else if (this.searchTask.length < 3 || this.searchTask.length > 10) {
    } else {
      this.taskService.searchStudentTasks(
        this.studentId,
        this.searchTask
      ).subscribe(
        (data) => {
          const msg = document.getElementById('userChar');
          if (data.Data === null) {
            msg.innerHTML = 'The search text should be make more specific as it matches more than 20 records';
          } else if (data.Count === 0) {
            msg.innerHTML = 'No task found Please refine your search';
          } else {
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
    this.mainService.show('task-loader');
    this.taskService.getStudentTasks(
      this.studentId,
      this.convertDate(new Date(obj.StartDate)),
      this.convertDate(new Date(obj.EndDate))
    ).subscribe(
      (data) => {
        this.taskList = data;
        console.log(data);
        this.mainService.hide('task-loader');
        this.firstday.setDate(this.firstday.getDate() - 7);
        this.lastday.setDate(this.lastday.getDate() - 7);
        this.taskService.getWeekList(
          this.studentId,
          this.convertDate(this.firstday),
          this.convertDate(this.lastday)
        ).subscribe(
          (dataC) => {
            this.weekList = dataC;
            this.activeWeekIndex = 3;
            this.displayDropDownDate(dataC);
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
    this.mainService.show('task-loader');
    this.taskService.getStudentTasks(
      this.studentId,
      this.convertDate(new Date(obj.StartDate)),
      this.convertDate(new Date(obj.EndDate))
    ).subscribe(
      (data) => {
        this.taskList = data;
        console.log(data);
        this.mainService.hide('task-loader');
        this.firstday.setDate(this.firstday.getDate() + 7);
        this.lastday.setDate(this.lastday.getDate() + 7);
        this.taskService.getWeekList(
          this.studentId,
          this.convertDate(this.firstday),
          this.convertDate(this.lastday)
        ).subscribe(
          (dataC) => {
            this.weekList = dataC;
            this.activeWeekIndex = 3;
            this.displayDropDownDate(dataC);
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
    this.hideOpenDiv('searchTask');
    this.toggleWeekList();
  }
  toggleWeekList() {
    const dropdownWeek = document.getElementById('dropdown-week');
    if (dropdownWeek.style.display !== 'block') {
      dropdownWeek.style.display = 'block';
    } else {
      dropdownWeek.style.display = '';
      document.getElementsByTagName('body')[0].click();
    }
  }
  searchTextValidation(e) {
    const msg = document.getElementById('userChar');
    const searchTask = document.getElementById('searchTask');
    msg.style.display = 'block';
    if (e !== undefined) {
      e.stopPropagation();
      document.getElementsByTagName('body')[0].click();
      if (this.searchResultData.length !== 0) {
        this.searchResultData = [];
        msg.innerHTML = 'Press Enter to search';
      }
      searchTask.style.display = 'block';
      if (this.searchTask.length < 3) {
        msg.innerHTML = 'Enter a minimum of 3 characters';
      }
      return;
    }
    if (this.searchTask !== undefined) {
      this.searchResultData = [];
      this.searchTask = this.searchTask.trim();
      if (this.searchTask.length > 2 && this.searchTask.length < 11) {
        msg.innerHTML = 'Press Enter to search';
      } else if (this.searchTask.length > 10) {
        msg.innerHTML = 'You can enter a maximum of 10 characters';
      } else if (msg.innerHTML === 'Enter a minimum of 3 characters') {
      } else {
        msg.innerHTML = 'Enter a minimum of 3 characters';
      }
    }
  }
  clearSearch() {
    this.searchTask = '';
    const msg = document.getElementById('userChar');
    msg.innerHTML = 'Enter a minimum of 3 characters';
  }
  openTaskDescription(task, e) {
    e.stopPropagation();
    document.getElementsByTagName('body')[0].click();
    this.taskDescription.style.display = 'block';
    this.taskService.getTaskDetails(task.Id).subscribe(
      (data) => {
        this.taskDescriptionDetails = data;
        console.log(data);
        if (data.IsRead === false) {
          this.taskService.markAsRead(data.Id).subscribe(
            (dataC) => {
            },
            (err) => {
              console.log(err);
            });
        }
      },
      (err) => {
        console.log(err);
      });
  }
  closeTaskDescription() {
    this.taskDescription.style.display = '';
  }
  downloadAttachment(id, filename) {
    console.log(id);
    this.taskService.downloadAttachment(id).subscribe(
      (data) => {
        console.log(data);
        const file = new Blob([data['_body']], { type: 'octet/stream' });
        const fileURL = URL.createObjectURL(file);
        const anchor = document.createElement('a');
        anchor.download = filename;
        anchor.href = fileURL;
        anchor.id = 'download_myfile';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      },
      (err) => {
        console.log(err);
      });
  }
  requestTeacherSupport(id) {
    this.taskService.requestTeacherSupport(id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      });
  }
  setTaskStatus() {
    const status = !this.taskDescriptionDetails.IsCompleted;
    this.taskService.setTaskStatus(this.taskDescriptionDetails.Id, status).subscribe(
      (data) => {
        this.taskDescriptionDetails.IsCompleted = !this.taskDescriptionDetails.IsCompleted;
        console.log(data);
      },
      (err) => {
        console.log(err);
      });
  }
  createTask(e) {
    e.stopPropagation();
    const addTask = document.getElementById('add-task');
    this.changedExtraHandler('addTaskTitle', 'Title');
    this.changedExtraHandler('addTaskDescription', 'Description');
    this.mainService.openModal('add-task');
  }
  closeModal() {
    this.mainService.closeModal('add-task');
  }
  removeClassFromDropDown(index, prm) {
    _.forEach(this.dropDownDate[index].querySelectorAll('li'), function (value) {
      value.className = '';
    });
    this.dropDownDate[index].querySelectorAll('li')[prm].className = 'active-week';
  }
  daySelect(day) {
    this.todayDay = day;
    this.removeClassFromDropDown(0, this.todayDay);
  }
  monthSelect(month) {
    this.todayDayMonth = this.monthNames.indexOf(month) + 1;
    this.removeClassFromDropDown(1, this.todayDayMonth);
  }
  yearSelect(year) {
    this.todayDayYear = year;
    let index;
    if (this.yearsList.indexOf(year) === 0) {
      index = 1;
      this.dropDownDate[2]
        .querySelectorAll('li')[index + 1].className = '';
    } else {
      index = 2;
      this.dropDownDate[2]
        .querySelectorAll('li')[index - 1].className = '';
    }
    this.dropDownDate[2]
      .querySelectorAll('li')[index].className = 'active-week';

  }
  changedExtraHandler(id, name) {
    const username = (<HTMLInputElement>document.getElementById(id));
    username.className = username.className.replace('p-error', '');
    username.placeholder = name;
  }
  saveTask() {
    this.taskDetails.title = this.taskDetails.title.trim();
    this.taskDetails.description = this.taskDetails.description.trim();
    if (this.taskDetails.title === '') {
      (<HTMLInputElement>document.getElementById('addTaskTitle')).placeholder =
        'Please enter task title';
      document.getElementById('addTaskTitle').className += ' p-error';
    } else if (this.taskDetails.description === '') {
      (<HTMLInputElement>document.getElementById('addTaskDescription')).placeholder =
        'Please enter task description';
      document.getElementById('addTaskDescription').className += ' p-error';
    } else {
      const date = moment();
      date.date(this.daysList[this.todayDay - 1]);
      date.month(this.todayDayMonth - 1);
      date.year(this.todayDayYear);
      const obj = {
        'StudentId': this.studentId,
        'Title': this.taskDetails.title,
        'Description': this.taskDetails.description,
        'DueDate': date.utc().format(),
        'Attachments': []
      };
      console.log(obj);
      this.taskService.saveTask(obj).subscribe(
        (data) => {
          this.mainService.closeModal('add-task');
        },
        (err) => {
          console.log(err);
        });
    }

  }
}
