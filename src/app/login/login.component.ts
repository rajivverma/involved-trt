import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService]
})

export class LoginComponent {
  public username: string;
  public password: string;
  // Internet Explorer 6-11
  public isIE = false || !!document.documentMode;
  // Chrome 1+
  public isChrome = !!window.chrome && !!window.chrome.webstore;
  // Firefox 1.0+
  public isFirefox = typeof InstallTrigger !== 'undefined';
  public browser: any;
  constructor(private loginService: LoginService, private router: Router) { }

  get_browser = function () {
    const ua = navigator.userAgent;
    let tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR|Edge\/(\d+)/);
      if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
      name: M[0],
      version: M[1]
    };
  };
  getDeviceToken() {
    let devicetoken;
    this.browser = this.get_browser();
    if (this.isIE === true) {
      devicetoken = '1' + '_' + this.browser.version;
    } else if (this.isChrome === true) {
      devicetoken = '2' + '_' + this.browser.version;
    } else if (this.isFirefox === true) {
      devicetoken = '3' + '_' + this.browser.version;
    } else {
      devicetoken = '4' + '_' + this.browser.version;
    }
    return devicetoken;
  }
  getPlateform() {
    const version = navigator.appVersion.split(' ');
    const platform = this.browser.name + '_' + this.browser.version + '_' + navigator.platform + '_' + version[0];
    return platform;
  }
  login() {
    if (!this.username || !this.password) {
      let divToChange;
      if (!this.username) {
        divToChange = (<HTMLInputElement>document.getElementById('username'));
        divToChange.placeholder = 'Please enter Username';
        if (!divToChange.className.includes('p-error')) {
          divToChange.className = divToChange.className + ' p-error';
        }
      }
      if (!this.password) {
        divToChange = (<HTMLInputElement>document.getElementById('password'));
        divToChange.placeholder = 'Please enter password';
        if (!divToChange.className.includes('p-error')) {
          divToChange.className = divToChange.className + ' p-error';
        }
      }
    } else {
      const devicetoken = this.getDeviceToken();
      const platform = this.getPlateform();
      const user = {
        'grant_type': 'password',
        'username': this.username,
        'password': this.password,
        'clientid': '3_3',
        'devicetoken': devicetoken,
        'platform': platform
      };
      console.log(user);
      this.router.navigate(['dashboard']);
      this.loginService.login(user).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('token', data.data.token);
          this.router.navigate(['dashboard']);
        },
        (err) => {
          alert('wrong email and password');
        });
    }
  }
}
declare global {
  interface Document {
    documentMode?: any;
  }
}
declare global {
  interface Window {
    chrome: any;
  }
}
declare const InstallTrigger: any;
