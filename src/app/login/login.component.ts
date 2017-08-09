import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService, User } from './login.service';
import { ParticalService } from '../commonService/partical.service';
import { MainService } from '../commonService/main.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService, ParticalService, MainService, CookieService]
})

export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public user = new User('', '');

  // Internet Explorer 6-11
  public isIE = false || !!document.documentMode;
  // Chrome 1+
  public isChrome = !!window.chrome && !!window.chrome.webstore;
  // Firefox 1.0+
  public isFirefox = typeof InstallTrigger !== 'undefined';
  public browser: any;
  particalStyle: object = {};
  particalParams: object = {};
  constructor(private loginService: LoginService,
    private router: Router,
    private particalService: ParticalService,
    private mainService: MainService,
    private cookieService: CookieService) { }
  ngOnInit() {
    this.particalStyle = this.particalService.getParticalStyle();
    this.particalParams = this.particalService.getParticalParams();
    this.user.username = localStorage.getItem('username');
    if (this.mainService.getCookie('token')) {
      this.router.navigate(['dashboard']);
    }
  }
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
    if (this.user.username === undefined || this.user.username === '') {
      const username = (<HTMLInputElement>document.getElementById('username'));
      if (!username.className.includes('p-error')) {
        username.placeholder = 'Please enter username';
        username.className += ' p-error';
      }
      return;
    }
    if (this.user.username.includes(' ')) {
      document.getElementById('login-error').innerHTML = 'Invalid Username';
      return;
    }
    if (this.user.password === undefined || this.user.password === '') {
      const password = (<HTMLInputElement>document.getElementById('password'));
      if (!password.className.includes('p-error')) {
        password.placeholder = 'Please enter password';
        password.className += ' p-error';
      }
      return;
    }
    this.user.username = this.user.username.trim();
    const devicetoken = this.getDeviceToken();
    const platform = this.getPlateform();
    const user = {
      'grant_type': 'password',
      'username': this.user.username,
      'password': this.user.password,
      'clientid': '2_3',
      'devicetoken': devicetoken,
      'platform': platform
    };
    this.loginService.login(user).subscribe(
      (data) => {
        if (data.isactivated === 'False') {
          document.getElementById('login-error').innerHTML = 'Locked.Parent has not unlocked this account.';
          return;
        }
        const val = (<HTMLInputElement>document.getElementById('test2')).checked;
        if (val) {
          localStorage.setItem('username', this.user.username);
        }
        this.cookieService.put('userid', data.userid);
        this.cookieService.put('token', data.access_token);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        if (err.status === 400) {
          document.getElementById('login-error').innerHTML = 'Invalid username or password';
        } else if (err.status === 0) {
          document.getElementById('login-error').innerHTML = 'Server failed to respond!';
        }
      });
  }
  changedExtraHandler() {
    document.getElementById('login-error').innerHTML = '';
    const username = (<HTMLInputElement>document.getElementById('username'));
    username.className = username.className.replace('p-error', '');
    username.placeholder = 'Username';
    const password = (<HTMLInputElement>document.getElementById('password'));
    password.className = password.className.replace('p-error', '');
    password.placeholder = 'Password';
  }
  setRememberMe(e) {
    if (e.target.checked) {
      if (this.user.username) {
        localStorage.setItem('username', this.user.username);
      }
    } else {
      localStorage.removeItem('username');
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
