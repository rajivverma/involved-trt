import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarComponent) componentScroll: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  constructor() { }

  ngAfterViewInit() {
  }

  onScrollToXY(x: number, y: number) {
    this.directiveScroll.scrollTo(x, y, 500);
    this.componentScroll.directiveRef.scrollTo(x, y, 500);
  }

  onScrollToTop() {
    this.directiveScroll.scrollToTop();
    this.componentScroll.directiveRef.scrollToTop();
  }

  onScrollToLeft() {
    this.directiveScroll.scrollToLeft();
    this.componentScroll.directiveRef.scrollToLeft();
  }

  onScrollToRight() {
    this.directiveScroll.scrollToRight();
    this.componentScroll.directiveRef.scrollToRight();
  }

  onScrollToBottom() {
    this.directiveScroll.scrollToBottom();
    this.componentScroll.directiveRef.scrollToBottom();
  }
  ngOnInit() {
    let interval;
    setInterval(function () {
      if (navigator.onLine) {
        if (interval != undefined) {
          console.log(interval);
          clearInterval(interval);
          interval = undefined;
          document.getElementById('network-failed').style.opacity = '0';
          document.getElementById('network-failed').style.display = 'none';
          setTimeout(function () {
          }, 1000);
        }
      } else {
        if (interval === undefined) {
          console.log(interval);
          checkConnection();
          document.getElementById('network-failed').style.display = 'block';
          setTimeout(function () {
            document.getElementById('network-failed').style.opacity = '1';
          }, 1000);
        }
      }
    }, 2000);

    function checkConnection() {
      interval = setInterval(function () {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", '../assets/img/favicon.png', true);
        xmlHttp.send(null);
      }, 3000);
    }
  }
}
