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
    if (!this.username) {
      const divToChange = (<HTMLInputElement>document.getElementById('username'));
      divToChange.placeholder = 'Please enter Username';
      if (!divToChange.className.includes('p-error')) {
        divToChange.className = divToChange.className + ' p-error';
      }
    } else {
      this.forgotPaswordService.submit(this.username).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['login']);
        },
        (err) => {
          alert('wrong email and password');
        });
    }
  }
}
