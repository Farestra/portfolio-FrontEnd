import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  editSkillForm!:FormGroup;
  skillUpd!:Skill;
  constructor(
    private fb:FormBuilder,
    private skillService:SkillService,
    private activRouter:ActivatedRoute,
    private toastr:ToastrService,
    private ruta:Router
  ) { 

  }

  ngOnInit(): void {
    const id = this.activRouter.snapshot.params['id'];
    this.skillService.detail(id).subscribe(data=>{
      this.skillUpd = data;
      this.editSkillForm = this.fb.group({
        name:[this.skillUpd.name,Validators.required],
        image:[this.skillUpd.image,Validators.required],
        progress:[this.skillUpd.progress,Validators.required]
      });
    }, err =>{
      this.toastr.error("Ha ocurrido un error",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message)
      this.ruta.navigate(['portfolio'])
    });
  }

  get Name(){return this.editSkillForm.get('name')};
  get Image(){return this.editSkillForm.get('image')};
  get Progress(){return this.editSkillForm.get('progress')};

  onUpdate(personid=1):void{
    const id = this.activRouter.snapshot.params['id'];
    const {
      name,
      image,
      progress
    } = this.editSkillForm.value;
    const skill=new Skill(
      name,
      image,
      progress
    );
    this.skillService.update(id, skill)
    .subscribe(data=>{
      this.toastr.success("Habilidad actualizada correctamente",'OK',{timeOut:3000,positionClass:'toast-top-full-width'});
      this.ruta.navigate(['portfolio'])
    }, err =>{
      this.toastr.error("Ha ocurrido un error",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message)
      this.ruta.navigate(['portfolio'])
    });
  }
}
