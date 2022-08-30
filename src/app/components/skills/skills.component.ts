import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills:Skill[]=[];
  isAdmin:boolean=false;

  constructor(
    private skillService:SkillService,
    private token:TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.loadSkill();
      this.isAdmin = this.token.isLoggedAdmin();
  }

  loadSkill(personid=1){
    this.skillService.list(personid).subscribe(data=>{
      this.skills=data;
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo obtener la información',
        text: ''+ err.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  deleteSkill(id?:number){
    if(id != undefined){
      this.skillService.delete(id).subscribe(data=>{
        this.loadSkill();
        Swal.fire({
          icon: 'success',
          text: 'Eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }, err =>{
        Swal.fire({
          icon: 'error',
          text: 'No se pudo eliminar la habilidad',
          showConfirmButton: false,
          timer: 1500
        });
      })
    }
  }

}
