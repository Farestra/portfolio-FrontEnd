import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Achievement } from 'src/app/models/achievement';
import { AchievementService } from 'src/app/services/achievement.service';


@Component({
  selector: 'app-new-achievement',
  templateUrl: './new-achievement.component.html',
  styleUrls: ['./new-achievement.component.css']
})
export class NewAchievementComponent implements OnInit {
  newAchievementForm:FormGroup;


  constructor(
    private fb:FormBuilder,
    private achievementServ:AchievementService,
    private ruta:Router,
    private acRuta:ActivatedRoute,
    private toastr:ToastrService
  ) { 
    this.newAchievementForm = this.fb.group({
      name:['',Validators.required],
      details:['',Validators.required],
      releaseDate:['',Validators.required],
      url:['',Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  get Name(){return this.newAchievementForm.get('name')}
  get Details(){return this.newAchievementForm.get('details')}
  get ReleaseDate(){return this.newAchievementForm.get('releaseDate')}
  get Url(){return this.newAchievementForm.get('ul')}

  onCreate(personid=1):void{
    const {
      name,
      details,
      releaseDate,
      url
    } = this.newAchievementForm.value;
    const achievement=new Achievement(
      name,
      details,
      releaseDate,
      url
    );
    this.achievementServ.save(personid, achievement)
    .subscribe(data=>{
      this.toastr.success("Proyecto creado correctamente",'OK',{timeOut:3000,positionClass:'toast-top-full-width'});
      this.ruta.navigate(['portfolio']);
    }, err =>{
      this.toastr.error("Ha ocurrido un error" ,'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message );
      this.ruta.navigate(['portfolio']);
    });
  }

}
