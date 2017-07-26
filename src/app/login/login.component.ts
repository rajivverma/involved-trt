import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService, User } from './login.service';
import { ParticalService } from '../commonService/partical.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService, ParticalService]
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
    private particalService: ParticalService) { }
  ngOnInit() {
    this.particalStyle = this.particalService.getParticalStyle();
    this.particalParams = this.particalService.getParticalParams();
    this.user.username = localStorage.getItem('username');
    if (localStorage.token) {
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
        const val = (<HTMLInputElement>document.getElementById('test2')).checked;
        if (val) {
          localStorage.setItem('username', this.user.username);
        }
        localStorage.setItem('token', 'Bearer ' + data.access_token);
        localStorage.setItem('userid', data.userid);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        if (err.status === 400) {
          // document.getElementById('server-failed').innerHTML = 'Invalid username or password';
        } else {
          document.getElementById('login-error').innerHTML = 'Invalid username or password';
        }
      });
  }
  changedExtraHandler() {
    document.getElementById('login-error').innerHTML = '';
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
