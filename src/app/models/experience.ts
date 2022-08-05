export class Experience {
  id?:number;
  position:string="";
  company:string="";
  image:string="";
  details:string="";
  jobMode:string="";
  startDate:string="";
  endDate:string="";
  timeElapsed:string="";
  url:string="";

  constructor(
    position:string,
    company:string,
    image:string,
    details:string,
    jobMode:string,
    startDate:string,
    endDate:string,
    timeElapsed:string,
    url:string
  ){
      this.position=position;
      this.company=company;
      this.image=image;
      this.details=details;
      this.jobMode=jobMode;
      this.startDate=startDate;
      this.endDate=endDate;
      this.timeElapsed=timeElapsed;
      this.url=url;
  }

}
