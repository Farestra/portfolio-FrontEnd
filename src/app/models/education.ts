export class Education {
  id?:number;
  school:string="";
  title:string="";
  image:string="";
  career:string="";
  score:number=0;
  startDate:string="";
  endDate:string="";

  constructor(
    school:string,
    title:string,
    image:string,
    career:string,
    score:number,
    startDate:string,
    endDate:string
  ){
      this.school=school;
      this.title=title;
      this.image=image;
      this.career=career;
      this.score=score;
      this.startDate=startDate;
      this.endDate=endDate
  }
}
