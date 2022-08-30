import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import Swal from 'sweetalert2';


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
    private experienceServ:ExperienceService
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
