import { Injectable } from "@angular/core";
import { IRegisterComponent, IRegister } from "../../components/register/register.interface";
import { ILogin } from "../../components/login/login.interface";
import { resolve } from "url";
import { reject } from "q";
import { IProfile } from "../../authentication/components/profile/profile.interface";




@Injectable()
export class AccountServices{

    private mockUserItems: IAccount[] = [
        {
            id:1,
            firstname:'Worawut',
            lastname:'sangangam',
            email:'boyjam1@hotmail.com',
            password:'123456',
            position:'Frontend Developer',
            image:'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg',
            created:new Date(),
            updated:new Date()


        }
    ]

    // แก้ไขข้อมูลส่วนตัว Update Profile
    onUPdateProfile(accessToken: string,model: IProfile){
        return new Promise((resolve, reject)=>{
            const userProfile = this.mockUserItems.find(user => user.id == accessToken);
            if(!userProfile) return reject({ Message: 'ไม่มีผู้ใช้ในระบบ' });
            userProfile.firstname = model.firstname;
            userProfile.lastname = model.lastname;
            userProfile.position = model.position;
            userProfile.image   = model.image;
            userProfile.updated = new Date();
            resolve(userProfile);
        })

    }

    //ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก token

    getUserLogin(accessToken: string){
        return new Promise<IAccount>(( resolve, reject )=> {
            const userLogin = this.mockUserItems.find( m => m.id == accessToken);
            if(!userLogin) return reject({ Message:'access Token ไม่ถูกต้อง' });
            resolve(userLogin);
        });
    }


    //เข้าสู่ระบบ
    onLogin(model: ILogin){
        return new Promise<{ accessToken: string }>((resolve,reject)=>{
         const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password)
        if(!userLogin) return reject ({ Message : 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' })
             resolve({
                 accessToken: userLogin.id
             });
        })
    }
    
    //ลงทะเบียน
    onRegister(model: IRegister){
        return new Promise((resolve,reject)=>{
            model['id'] = Math.random();
            this.mockUserItems.push(model);
            resolve(model); 
        })
    }
}

export interface IAccount{
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?:any;
    position?:string;
    image?:string;
    created?: Date;
    updated?: Date;
}