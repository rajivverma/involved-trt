import { NgModule } from '@angular/core';
import { ForgotPasswordRoutingModule } from './forgot-password.routing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    ForgotPasswordRoutingModule,
    FormsModule,
    HttpModule
  ],
  exports: [],
  declarations: [ForgotPasswordComponent],
  providers: [],
})
export class ForgotPasswordModule { }
