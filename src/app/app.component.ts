import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public config: PerfectScrollbarConfigInterface = {};
  constructor() { }
  ngOnInit() {
    let interval;
    setInterval(function () {
      if (navigator.onLine) {
        if (interval !== undefined) {
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
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', '../assets/img/favicon.png', true);
        xmlHttp.send(null);
      }, 3000);
    }
  }
}
