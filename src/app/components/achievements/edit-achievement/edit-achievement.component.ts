import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Achievement } from 'src/app/models/achievement';
import { AchievementService } from 'src/app/services/achievement.service';


@Component({
  selector: 'app-edit-achievement',
  templateUrl: './edit-achievement.component.html',
  styleUrls: ['./edit-achievement.component.css']
})
export class EditAchievementComponent implements OnInit {
  editAchievementForm!:FormGroup;
  achievementUpd!:Achievement;
  constructor(
    private fb:FormBuilder,
    private achievementServ:AchievementService,
    private activRouter:ActivatedRoute,
    private toastr:ToastrService,
    private ruta:Router
  ) { }

  ngOnInit(): void {
    const id = this.activRouter.snapshot.params['id'];
    this.achievementServ.detail(id).subscribe(data=>{
      this.achievementUpd = data;
      this.editAchievementForm = this.fb.group({
        name:[this.achievementUpd.name,Validators.required],
        details:[this.achievementUpd.details,Validators.required],
        releaseDate:[this.achievementUpd.releaseDate,Validators.required],
        url:[this.achievementUpd.url,Validators.required]
      });
    }, err =>{
      this.toastr.error("Ha ocurrido un error",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message)
      this.ruta.navigate(['portfolio'])
    })
  }

  get Name(){return this.editAchievementForm.get('name')}
  get Details(){return this.editAchievementForm.get('details')}
  get ReleaseDate(){return this.editAchievementForm.get('releaseDate')}
  get Url(){return this.editAchievementForm.get('url')}

  onUpdate(personid=1):void{
    const id = this.activRouter.snapshot.params['id'];
    const {
      name,
      details,
      releaseDate,
      url
    } = this.editAchievementForm.value;
    const achievement=new Achievement(
      name,
      details,
      releaseDate,
      url
    );
    this.achievementServ.update(id, achievement)
    .subscribe(data=>{
      this.toastr.success("Proyecto actualizado correctamente",'OK',{timeOut:3000,positionClass:'toast-top-full-width'});
      this.ruta.navigate(['portfolio'])
    }, err =>{
      this.toastr.error("Ha ocurrido un error",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message )
      this.ruta.navigate(['portfolio'])
    });
  }

}
