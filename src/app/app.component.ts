import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
    // setInterval(function () {
    //   if (navigator.onLine) {
    //     console.log('online');
    //   } else {
    //     console.log('offline');
    //   }
    // },1000);
  }
}
