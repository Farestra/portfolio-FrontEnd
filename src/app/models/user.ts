export class User {
  id?:number;
  usermane:string='';
  email:string='';
  password:string='';

  constructor(
    usermane:string,
    email:string,
    password:string,
  ){
    this.usermane=usermane;
    this.email=email;
    this.password=password;
  }
}
