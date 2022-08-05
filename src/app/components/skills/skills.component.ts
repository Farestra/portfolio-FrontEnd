import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';
import { ToastrService } from 'ngx-toastr'
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.loadSkill();
      this.isAdmin = this.token.isLoggedAdmin();
  }

  loadSkill(personid=1){
    this.skillService.list(personid).subscribe(data=>{
      this.skills=data;
    }, err => {
      this.toastr.error("No se pudieron cargar las habilidades",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      console.log(err.error.message);
    })
  }

  deleteSkill(id?:number){
    if(id != undefined){
      this.skillService.delete(id).subscribe(data=>{
        this.loadSkill();
        this.toastr.success("Eliminada habilidad con el id:" + id, 'Eliminado',{timeOut:3000,positionClass:'toast-top-full-width'});
      }, err =>{
        this.toastr.error("No se pudo eliminar el id:" + id, 'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
        console.log(err.error.message);
      })
    }
  }

}
