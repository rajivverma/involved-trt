import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPasswordRoutingModule } from './forgot-password.routing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    ForgotPasswordRoutingModule,
    RouterModule,
    FormsModule,
    HttpModule
  ],
  exports: [],
  declarations: [ForgotPasswordComponent],
  providers: [],
})
export class ForgotPasswordModule { }
