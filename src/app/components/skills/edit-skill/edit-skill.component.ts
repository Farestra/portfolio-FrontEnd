import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        text: 'Ha ocurrido un error obteniendo la información',
        showConfirmButton: false,
        timer: 1500
      })
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
        text: 'Ha ocurrido un error obteniendo la información',
        showConfirmButton: false,
        timer: 1500
      })
      //console.log(err.error.message)
      this.ruta.navigate(['portfolio'])
    });
  }
}
