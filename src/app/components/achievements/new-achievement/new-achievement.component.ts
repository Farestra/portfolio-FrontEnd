import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Achievement } from 'src/app/models/achievement';
import { AchievementService } from 'src/app/services/achievement.service';
import Swal from 'sweetalert2';


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
    private acRuta:ActivatedRoute
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
      Swal.fire({
        icon: 'success',
        text: 'Creado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.ruta.navigate(['portfolio']);
    }, err =>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.ruta.navigate(['portfolio']);
    });
  }

}
