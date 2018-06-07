import { Component, OnInit, Input } from '@angular/core';
import { IChangePasswordComponent } from './change-password.interface';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IChangePasswordComponent {

  constructor(
    private builder: FormBuilder
  ) {
    this.initalCreatData();
   }

    @Input('modalRef') modalRef: BsModalRef;
    from:FormGroup

    //เปลี่ยนรหัสผ่าน
    onSubmit(){
      console.log(this.from.value);
    }

    //สร้างฟอร์ม
    private initalCreatData(){
      this.from =  this.builder.group({
        old_pass:[],
        new_pass:[],
        cnew_pass:[]
      });
    }
}
