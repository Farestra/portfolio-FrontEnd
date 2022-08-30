import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';
import { Experience } from 'src/app/models/experience';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {
  editExperienceForm!:FormGroup;
  experienceUpd!:Experience;
  constructor(
    private fb:FormBuilder,
    private experienceServ:ExperienceService,
    private activRouter:ActivatedRoute,
    private ruta:Router
  ) { }

  ngOnInit(): void {
    const id = this.activRouter.snapshot.params['id'];
    this.experienceServ.detail(id).subscribe(data=>{
      this.experienceUpd = data;
      this.editExperienceForm = this.fb.group({
        position:[this.experienceUpd.position,Validators.required],
        company:[this.experienceUpd.company,Validators.required],
        image:[this.experienceUpd.image,Validators.required],
        details:[this.experienceUpd.details,Validators.required],
        jobMode:[this.experienceUpd.jobMode,Validators.required],
        startDate:[this.experienceUpd.startDate,Validators.required],
        endDate:[this.experienceUpd.endDate,Validators.required],
        timeElapsed:[this.experienceUpd.timeElapsed,Validators.required],
        url:[this.experienceUpd.url,Validators.required]
      })
    }, err =>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.ruta.navigate(['portfolio'])
    })
  }

  get Position(){return this.editExperienceForm.get('position')}
  get Company(){return this.editExperienceForm.get('company')}
  get Image(){return this.editExperienceForm.get('image')}
  get Details(){return this.editExperienceForm.get('details')}
  get JobMode(){return this.editExperienceForm.get('jobMode')}
  get StartDate(){return this.editExperienceForm.get('startDate')}
  get EndDate(){return this.editExperienceForm.get('endDate')}
  get TimeElapsed(){return this.editExperienceForm.get('timeElapsed')}
  get Url(){return this.editExperienceForm.get('url')}

  onUpdate():void{
    const id = this.activRouter.snapshot.params['id'];
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
    } = this.editExperienceForm.value;
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
    this.experienceServ.update(id, experience)
    .subscribe(data=>{
      Swal.fire({
        icon: 'success',
        text: 'Actualizado correctamente',
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
