import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Achievement } from 'src/app/models/achievement';
import { AchievementService } from 'src/app/services/achievement.service';
import Swal from 'sweetalert2';


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
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
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
      Swal.fire({
        icon: 'success',
        text: 'Actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.ruta.navigate(['portfolio'])
    }, err =>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.ruta.navigate(['portfolio'])
    });
  }

}
