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
  submit(e) {
    if (this.username === undefined) {
      return false;
    }
    if (this.username.trim().length === 0) {
      this.username = undefined;
      const form = (<HTMLInputElement>document.getElementById('forgotPassword'));
      form.click();
      return false;
    }
    if (e === undefined) {
      return;
    }
    e.stopPropagation();
    this.forgotPaswordService.submit(this.username).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['login']);
      },
      (err) => {
        const data = JSON.parse(err._body);
        let msg = '';
        if (data.Message === 'ERROR_NOTFOUND_ACCOUNT') {
          msg = 'Username entered is not registered with InvolvEd.';
        } else if (data.Message === 'ERROR_INACTIVE_ACCOUNT') {
          msg = 'Account is not active. Please email your query to support@involvedtech.co.uk.';
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
  }
}
