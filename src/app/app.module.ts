import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { AppRouting } from './app.routing';
import { SheredsModule } from './shereds/shereds.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    SheredsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
