import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { ILoginComponent } from './login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertServices } from '../../shereds/services/alert.services';
import { Router } from '@angular/router';
import { AuthURL } from '../../authentication/authentication.url';
import { AccountServices } from '../../shereds/services/account.services';
import { AuthenServic } from '../../serveices/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {

  constructor(
    private builder: FormBuilder,
    private alert: AlertServices,
    private router: Router,
    private account: AccountServices,
    private authen: AuthenServic
  ) { 
    this.initialCreatFormData();


  }
  Url = AppURL;
  form: FormGroup;

  //เข้าสู่ระบบ
  onSubmit(): void {
    if(this.form.invalid)
      return this.alert.somting_wrong();
    this.account
        .onLogin(this.form.value)
        .then(res=>{
          //เก็บ access Token 
          this.authen.setAuthenticated(res.accessToken)
          //alert และ redirect หน้า page 
          this.alert.notifly('เข้าสู่ระบบสำเร็จ', 'info')
          this.router.navigate(['/',AppURL.Authen, AuthURL.Dashboard])
        })
        .catch(err => this.alert.notifly(err.Message));
   
  }

  //สร้างฟอร์ม
  private initialCreatFormData(){
    this.form = this.builder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      remember: [true]
    });
  }
}
