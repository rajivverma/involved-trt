import { Injectable } from '@angular/core';

@Injectable()
export class MainService {
  constructor() { }
  show(id) {
    document.getElementById(id).style.display = 'block';
  }
  hide(id) {
    document.getElementById(id).style.opacity = '0';
    setTimeout(function () {
      document.getElementById(id).style.display = '';
    }, 600);
  }
}
