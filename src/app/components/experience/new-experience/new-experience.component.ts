import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { ToastrService } from 'ngx-toastr'
import { ExperienceService } from 'src/app/services/experience.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-experience',
  templateUrl: './new-experience.component.html',
  styleUrls: ['./new-experience.component.css']
})
export class NewExperienceComponent implements OnInit {
  newExperienceForm:FormGroup;

  constructor(
    private experienceServ:ExperienceService,
    private ruta:Router,
    private fb:FormBuilder,
    private toastr:ToastrService
  ) { 
    this.newExperienceForm = this.fb.group({
      position:['',Validators.required],
      company:['',Validators.required],
      image:['',Validators.required],
      details:['',Validators.required],
      jobMode:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      timeElapsed:['',Validators.required],
      url:['',Validators.required]
    })
  }

  get Position(){return this.newExperienceForm.get('position')}
  get Company(){return this.newExperienceForm.get('company')}
  get Image(){return this.newExperienceForm.get('image')}
  get Details(){return this.newExperienceForm.get('details')}
  get JobMode(){return this.newExperienceForm.get('jobMode')}
  get StartDate(){return this.newExperienceForm.get('startDate')}
  get EndDate(){return this.newExperienceForm.get('endDate')}
  get TimeElapsed(){return this.newExperienceForm.get('timeElapsed')}
  get Url(){return this.newExperienceForm.get('url')}

  ngOnInit(): void {

  }

  onCreate(personid=1):void{
    const {
      position,
      company,
      image,
      details,
      jobMode,
      startDate,
      endDate,
      timeElapsed,
      url
    } = this.newExperienceForm.value;
    const experience=new Experience(
      position,
      company,
      image,
      details,
      jobMode,
      startDate,
      endDate,
      timeElapsed,
      url
    );
    this.experienceServ.save(personid, experience)
    .subscribe(data=>{
      this.toastr.success("Experiencia creada correctamente",'OK',{timeOut:3000,positionClass:'toast-top-full-width'});
      this.ruta.navigate(['portfolio']);
    }, err =>{
      this.toastr.error("Ha ocurrido un error",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      console.log(err.error.message);
      this.ruta.navigate(['portfolio']);
    });
  }

}
