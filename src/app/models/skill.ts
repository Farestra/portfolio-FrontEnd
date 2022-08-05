export class Skill {
  id?:number;
  name:string="";
  image:string="";
  progress:number=0;

  constructor(
    name:string,
    image:string,
    progress:number,

  ){
      this.name=name;
      this.image=image;
      this.progress=progress;
  }
}
