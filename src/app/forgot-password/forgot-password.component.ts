import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ForgotPaswordService } from './forgot-password.service';
import { ParticalService } from '../commonService/partical.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  providers: [ForgotPaswordService, ParticalService]
})
export class ForgotPasswordComponent implements OnInit {
  public username: string;
  particalStyle: object = {};
  particalParams: object = {};
  constructor(private router: Router,
    private forgotPaswordService: ForgotPaswordService,
    private particalService: ParticalService) { }
  ngOnInit() {
    this.particalStyle = this.particalService.getParticalStyle();
    this.particalParams = this.particalService.getParticalParams();
  }
  submit() {
    if (this.username === undefined || this.username === '') {
      const username = (<HTMLInputElement>document.getElementById('username'));
      if (!username.className.includes('p-error')) {
        username.placeholder = 'Please enter username';
        username.className += ' p-error';
      }
      return false;
    }
    this.username = this.username.trim();
    if (this.username.includes(' ')) {
      document.getElementById('username-error').innerHTML = 'Invalid Username';
      return;
    }
    this.forgotPaswordService.submit(this.username).subscribe(
      (data) => {
        console.log(data);
        document.getElementById('username-error').innerHTML = 'A new temporary password has been sent to the registered email address of the parent/guardians.';
      },
      (err) => {
        const data = JSON.parse(err._body);
        let msg = '';
        if (data.Message === 'ERROR_NOTFOUND_ACCOUNT') {
          msg = 'Username entered is not registered with InvolvEd.';
        } else if (data.Message === 'ERROR_INACTIVE_ACCOUNT') {
          msg = 'Account has not been unlocked by parent/guardian.';
        } else if (data.Message === 'ERROR_INCOMPATIBLE_CLIENT') {
          msg = 'Please enter valid student login username to reset password.';
        } else if (data.Message === 'ERROR_INVALID_CLIENT') {
          msg = 'Account is not active. Please email your query to support@involvedtech.co.uk';
        } else {
          msg = 'Server failed to respondServer failed to respond. Please check your internet connection.';
        }
        document.getElementById('username-error').innerHTML = msg;
      });
  }
  changedExtraHandler() {
    document.getElementById('username-error').innerHTML = '';
    const username = (<HTMLInputElement>document.getElementById('username'));
    username.className = username.className.replace('p-error', '');
    username.placeholder = 'Enter username';
  }
}
