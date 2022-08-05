export class Achievement {
  id?:number;
  name:string="";
  details:string="";
  image:string="";
  url:string="";

  constructor(
    name:string,
    details:string,
    image:string,
    url:string,

  ){
    this.name=name;
    this.details=details;
    this.image=image;
    this.url=url;
  }
}
