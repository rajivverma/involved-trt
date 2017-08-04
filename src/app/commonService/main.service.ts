import { Injectable } from '@angular/core';

@Injectable()
export class MainService {
  constructor() { }
  show(id) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.opacity = '1';
  }
  hide(id) {
    document.getElementById(id).style.opacity = '0';
    setTimeout(function () {
      document.getElementById(id).style.display = '';
    }, 600);
  }
  getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
}
