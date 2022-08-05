import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-education',
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.css']
})
export class NewEducationComponent implements OnInit {
  newEducationForm:FormGroup;
  
  
  constructor(
    private fb:FormBuilder,
    private educationServ:EducationService,
    private ruta:Router,
    private toastr:ToastrService
  ) {
      this.newEducationForm = this.fb.group(
        {
        school:['',Validators.required],
        title:['',Validators.required],
        image:['',Validators.required],
        career:['',Validators.required],
        score:[null,Validators.required],
        startDate:['',Validators.required],
        endDate:['',Validators.required]
      })
  }

  ngOnInit(): void {

  }

  get School(){return this.newEducationForm.get('school')}

  get Title(){return this.newEducationForm.get('title')}

  get Image(){return this.newEducationForm.get('image')}

  get Career(){return this.newEducationForm.get('career')}

  get Score(){return this.newEducationForm.get('score')}

  get StartDate(){return this.newEducationForm.get('startDate')}

  get EndDate(){return this.newEducationForm.get('endDate')}

  onCreate(personid=1):void{
    const {
      school,
      title,
      image,
      career,
      score,
      startDate,
      endDate
    } = this.newEducationForm.value;
    const education=new Education(
      school,
      title,
      image,
      career,
      score,
      startDate,
      endDate
    );
    this.educationServ.save(personid, education)
    .subscribe(data=>{
      this.toastr.success("Educación creada correctamente",'OK',{timeOut:3000,positionClass:'toast-top-full-width'});
      this.ruta.navigate(['portfolio']);
    }, err =>{
      this.toastr.error("Ha ocurrido un error",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      console.log(err.error.message);
      this.ruta.navigate(['portfolio']);
    });
  }

}
