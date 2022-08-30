import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { AchievementService } from 'src/app/services/achievement.service';
import { Router } from '@angular/router';
import { Achievement } from 'src/app/models/achievement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  achievement:Achievement[]=[];
  isAdmin:boolean=false;

  constructor(private achievementServ:AchievementService,
    private token:TokenStorageService,
    private ruta:Router) { }

  ngOnInit(): void {
    this.isAdmin = this.token.isLoggedAdmin();
    this.loadAchievement();
  }

  loadAchievement(personid=1){
    this.achievementServ.list(personid).subscribe(data =>{
      this.achievement=data;
    });
  }

  deleteAchievement(id?:number){
    if(id != undefined){
      this.achievementServ.delete(id).subscribe(data=>{
        this.loadAchievement();
        Swal.fire({
          icon: 'success',
          text: 'Eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text:'' + err.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      })
    }
  }
}
