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
    if (e === undefined) {
      return;
    }
    e.stopPropagation();
    if (this.username === undefined) {
      return false;
    }
    if (this.username.trim().length === 0) {
      this.username = undefined;
      const form = (<HTMLInputElement>document.getElementById('forgotPassword'));
      form.click();
      return false;
    }
    this.forgotPaswordService.submit(this.username).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['login']);
      },
      (err) => {
        document.getElementById('username-error').innerHTML = 'Invalid username';
      });
  }
  changedExtraHandler() {
    document.getElementById('username-error').innerHTML = '';
  }
}
