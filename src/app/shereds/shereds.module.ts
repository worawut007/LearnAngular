import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule,ModalModule} from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertServices } from './services/alert.services';
import { AccountServices } from './services/account.services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule ,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    
  AuthNavbarComponent,
  AuthSidebarComponent,
  AuthContentComponent
],
  exports: [
    AuthNavbarComponent,
    BsDropdownModule,
    ModalModule,
    AuthSidebarComponent,
    AuthContentComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AlertServices,
    AccountServices
  ]
})
export class SheredsModule { }
