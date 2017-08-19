import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor() { }
  ngOnInit() {
    let interval;
    setInterval(function () {
      if (navigator.onLine) {
        if (interval !== undefined) {
          clearInterval(interval);
          interval = undefined;
          document.getElementById('network-failed').style.opacity = '0';
          document.getElementById('network-failed').style.display = 'none';
          setTimeout(function () {
          }, 1000);
        }
      } else {
        if (interval === undefined) {
          checkConnection();
          document.getElementById('network-failed').style.display = 'block';
          setTimeout(function () {
            document.getElementById('network-failed').style.opacity = '1';
          }, 1000);
        }
      }
    }, 1000);

    function checkConnection() {
      interval = setInterval(function () {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', '../assets/img/favicon.png', true);
        xmlHttp.send(null);
      }, 3000);
    }
  }
}
