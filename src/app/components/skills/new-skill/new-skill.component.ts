import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

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
    private toastr:ToastrService
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
      this.toastr.success("Habilidad creada correctamente",'OK',{timeOut:3000,positionClass:'toast-top-full-width'});
      this.ruta.navigate(['portfolio']);
    }, err =>{
      this.toastr.error("Ha ocurrido un error",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      console.log(err.error.message);
      this.ruta.navigate(['portfolio']);
    });
  }
}
