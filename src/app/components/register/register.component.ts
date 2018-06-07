import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertServices } from '../../shereds/services/alert.services';
import { AccountServices } from '../../shereds/services/account.services';
import { Router } from '@angular/router';
declare const $;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertServices,
    private account: AccountServices,
    private router: Router
  ) {
    this.intialCreatFormData();
  }
  Url = AppURL;
  form: FormGroup;


  //ลงทะเบียน
  onSubmit() {

    if (this.form.invalid) 
      return this.alert.somting_wrong();
    //ส่งข้อมูลหา Server 
    this.account
      .onRegister(this.form.value)
      .then(res => {
        this.alert.notifly('ลงทะเบียนสำเร็จ', 'info');
          this.router.navigate(['/',AppURL.Login]); 
      })
      .catch(err=> this.alert.notifly(err.Message));

  }

  //สร้างฟอร์ม
  private intialCreatFormData() {

    this.form = this.builder.group({
      fristname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern(/^[A-z0-9]{6,15}$/)]],
      cpassword: ['', [Validators.required,this.comparePassword('password')]], 
    });
  }

  //สร้าง validate
  private comparePassword(passwordField: string) {
    return function (confirm_password: AbstractControl) {
      if (!confirm_password.parent) return;
      const password = confirm_password.parent.get(passwordField);
      const passwordSubscribe = password.valueChanges.subscribe(()=>{
        confirm_password.updateValueAndValidity();
        passwordSubscribe.unsubscribe();
      })

      if (confirm_password.value === password.value)
        return;
      return { compare: true };

    }
  }



}
