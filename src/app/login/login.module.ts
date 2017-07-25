import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ParticlesModule } from 'angular-particle';

@NgModule({
  imports: [
    LoginRoutingModule,
    RouterModule,
    FormsModule,
    HttpModule,
    ParticlesModule
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule { }
