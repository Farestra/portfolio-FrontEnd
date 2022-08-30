import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {
  editEducationForm!:FormGroup;
  educationUpd!:Education;
  constructor(
    private fb:FormBuilder,
    private educationServ:EducationService,
    private activRouter:ActivatedRoute,
    private ruta:Router
  ) {
      
   }

  ngOnInit(): void {
    const id = this.activRouter.snapshot.params['id'];
    this.educationServ.detail(id).subscribe(data=>{
      this.educationUpd = data;
      this.editEducationForm = this.fb.group({
        school:[this.educationUpd.school,Validators.required],
        title:[this.educationUpd.title,Validators.required],
        image:[this.educationUpd.image,Validators.required],
        career:[this.educationUpd.career,Validators.required],
        score:[this.educationUpd.score,Validators.required],
        startDate:[this.educationUpd.startDate,Validators.required],
        endDate:[this.educationUpd.endDate,Validators.required]
      });
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

  get School(){return this.editEducationForm.get('school')}

  get Title(){return this.editEducationForm.get('title')}

  get Image(){return this.editEducationForm.get('image')}

  get Career(){return this.editEducationForm.get('career')}

  get Score(){return this.editEducationForm.get('score')}

  get StartDate(){return this.editEducationForm.get('startDate')}

  get EndDate(){return this.editEducationForm.get('endDate')}

  onUpdate():void{
    const id = this.activRouter.snapshot.params['id'];
    const {
      school,
      title,
      image,
      career,
      score,
      startDate,
      endDate
    } = this.editEducationForm.value;
    const education=new Education(
      school,
      title,
      image,
      career,
      score,
      startDate,
      endDate,
    );
    this.educationServ.update(id, education)
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
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.ruta.navigate(['portfolio'])
    });
  }
}
