import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ForgotPaswordService } from './forgot-password.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  providers: [ForgotPaswordService]
})
export class ForgotPasswordComponent {
  public username: string;
  constructor(private router: Router, private forgotPaswordService: ForgotPaswordService) { }
  submit() {
    if (!this.username) {
      let divToChange = (<HTMLInputElement>document.getElementById("username"));
      divToChange.placeholder = "Please enter Username";
      if(!divToChange.className.includes("p-error")){
        divToChange.className = divToChange.className + " p-error";
      }
    }
    else {
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
