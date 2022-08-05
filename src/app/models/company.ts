export class Company {
  id?:number;
  name:string="";
  image:string="";
  url:string="";


  constructor(
    name:string,
    image:string,
    url:string,

  ){
      this.name=name;
      this.image=image;
      this.url=url;
  }
}
