import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {
  newSkillForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private skillService:SkillService,
    private ruta:Router,
  ) { 
    this.newSkillForm = this.fb.group(
      {
      name:['',Validators.required],
      image:['',Validators.required],
      progress:[null,Validators.required]
    })
  }

  ngOnInit(): void {
  }

  get Name(){return this.newSkillForm.get('name')};
  get Image(){return this.newSkillForm.get('image')};
  get Progress(){return this.newSkillForm.get('progress')};

  onCreate(personid=1):void{
    const {
      name,
      image,
      progress
    } = this.newSkillForm.value;
    const skill=new Skill(
      name,
      image,
      progress
    );
    this.skillService.save(personid, skill)
    .subscribe(data=>{
      Swal.fire({
        icon: 'success',
        text: 'Creado Correctamente',
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
