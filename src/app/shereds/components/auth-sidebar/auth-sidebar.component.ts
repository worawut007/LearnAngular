import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { IAuthSidebarComponent } from './auth.sidebar.interface';
import { IAccount, AccountServices } from '../../services/account.services';
import { AuthenServic } from '../../../serveices/authen.service';
import { AlertServices } from '../../services/alert.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {

  constructor(
    private account:AccountServices,
    private authen:AuthenServic,
    private alert:AlertServices,
    private router:Router

  ) { 
      this.initialLoadeUserLogin();
   }

  ngOnInit() {
  }

  AppURL = AppURL;
  AuthURL = AuthURL;
  UserLogin: IAccount;

  // โหลดข้อมูล user login จาก Token  
  private initialLoadeUserLogin(){
    this.account
        .getUserLogin(this.authen.getAuthenticated())
        .then(userLogin => this.UserLogin = userLogin)
        .catch(err => {
          this.alert.notifly(err.Message);
          this.authen.clearAuthenticatied();
          this.router.navigate(['/',AppURL.Login])
        });
        
  }
}
