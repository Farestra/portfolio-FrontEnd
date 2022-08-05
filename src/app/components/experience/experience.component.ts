import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experience:Experience[]=[];
  isAdmin:boolean = false;
  constructor(
    private token:TokenStorageService,
    private experienceServ:ExperienceService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    //cargamos la experiencia
     this.loadExperience();
     //verificamos si el usuario loggeado es administrador
     this.isAdmin = this.token.isLoggedAdmin();
  }

  loadExperience(personid=1){
    this.experienceServ.list(personid).subscribe(data =>{
      this.experience = data;
    });
  }

  deleteExperience(id?:number){
    if(id != undefined){
      this.experienceServ.delete(id).subscribe(data =>{
        this.loadExperience();
      }, err => {
        this.toastr.error("No se pudo eliminar el id:" + id, 'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
        console.log(err.error.message);
      })
    }
  }

}
