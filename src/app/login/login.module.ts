import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule,
    HttpModule
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule { }
