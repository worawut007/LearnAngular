import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { Router } from '@angular/router';
import { AuthenServic } from '../../../serveices/authen.service';
import { AlertServices } from '../../services/alert.services';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authen: AuthenServic,
    private alert: AlertServices
  ) { }

  ngOnInit() {
  }

  AppURL = AppURL;
  AuthURL = AuthURL;

  //ออกจากระบบ
  onLogout(){
    this.alert.notifly('ออกจากระบบสำเร็จ', 'info');
    this.authen.clearAuthenticatied();
    this.router.navigate(['/',AppURL.Login]);
  }

}
