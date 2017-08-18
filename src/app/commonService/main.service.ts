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
  eventStopPropagation(id) {
    document.getElementById(id)
      .getElementsByClassName('modal-content')[0]
      .addEventListener('click', function (e) {
        e.stopPropagation();
      });
  }
  bodyEventListener(id) {
    document.getElementsByTagName('body')[0].addEventListener('click', function () {
      const div = document.getElementById(id);
      if (div != null) {
        div.className = div.className.replace('in', '');
        document.querySelector('body').className = document.querySelector('body').className.replace('modal-back', '');
      }
    });
  }
  openModal(id) {
    const modal = document.getElementById(id);
    modal.className += ' in';
    document.querySelector('body').className += 'modal-back';
  }
  closeModal(id) {
    const d = document.getElementById(id);
    d.className = d.className.replace('in', '');
    document.querySelector('body').className = document.querySelector('body').className.replace('modal-back', '');
  }
}
