import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountServices } from '../../../shereds/services/account.services';
import { AuthenServic } from '../../../serveices/authen.service';
import { AlertServices } from '../../../shereds/services/alert.services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {

  constructor(
    private buider: FormBuilder,
    private account: AccountServices,
    private authen: AuthenServic,
    private alert: AlertServices,
    private modalService: BsModalService
  ) {
    this.initialCreatFormData();
    this.initialLoadUpdateFormData();
  }

  form: FormGroup;
  modalRef: BsModalRef;

  positionItems: any[] = [
    'Frontend Developer',
    'Backend Developer'
  ];

  //บันทึกข้อมูล
  onSubmit() {
    if (this.form.invalid) return this.alert.somting_wrong();
    this.account
        .onUPdateProfile(this.authen.getAuthenticated(), this.form.value)
        .then(() => this.alert.notifly('แก้ไขข้อมูลสำเร็จ'))
        .catch(err => this.alert.notifly(err.Message));
    // console.log(this.form.value);
  }

  //แปลงรไฟล์รูปภาพ base64
  onConverImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    const imageTypes = ['image/jpeg', 'imgae/png']

    imageControl.setValue(null);
    if (input.files.length == 0) return;
 
    console.log(input.files[0].type)
       //ตรวจสอบบไฟล์ที่อัพโหลดเข้ามา
    if (imageTypes.indexOf(input.files[0].type) < 0) {
      input.value = null;
      return this.alert.notifly('กรุณาอัพโหลดรูปภาพเท่านั้น');
    }


    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', () => {
      imageControl.setValue(reader.result);
    })
  }

  // เปิด modal dialog
  openModal(template:TemplateRef<any>){
   
    this.modalService.show(template);
  } 

  //สร้างฟอร์ม
  private initialCreatFormData() {
    this.form = this.buider.group({
      email: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      image: [null]
    });

    //disabled อีเมล์
    this.form.get('email').disable();
  }

  //โหลดข้อมูลใหม่พร้อม  update form data
  private initialLoadUpdateFormData() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.form.controls['email'].setValue(user.email);
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);


      })
      .catch(err => this.alert.notifly(err.Message));
  }

}
