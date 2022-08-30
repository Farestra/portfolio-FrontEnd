import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { AchievementService } from 'src/app/services/achievement.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Achievement } from 'src/app/models/achievement';

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
    private toastr:ToastrService,
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
        this.toastr.success("Se Ha eliminado correctamente el elemento con id " + id, 'Borrado exitoso',{timeOut:3000,positionClass:'toast-top-center'});
      }, err => {
        this.toastr.error("no se pudo eliminar el id: " + id, 'Error',{timeOut:3000,positionClass:'toast-top-center'});
        //console.log(err.error.message)
      })
    }
  }
}
