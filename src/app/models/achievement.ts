export class Achievement {
  id?:number;
  name:string="";
  details:string="";
  releaseDate:string="";
  url:string="";

  constructor(
    name:string,
    details:string,
    releaseDate:string,
    url:string,

  ){
    this.name=name;
    this.details=details;
    this.releaseDate=releaseDate;
    this.url=url;
  }
}
