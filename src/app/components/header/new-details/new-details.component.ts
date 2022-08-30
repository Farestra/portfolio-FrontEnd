import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/models/school';
import { Company } from 'src/app/models/company';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.css']
})
export class NewDetailsComponent implements OnInit {
  newSchoolForm:FormGroup;
  newCompanyForm:FormGroup;

  isSchool:boolean=false;
  isCompany:boolean=false;
  personid:number=1

  constructor(
    private fb:FormBuilder,
    private schoolsv:SchoolService,
    private companysv:CompanyService,
    private ruta:Router
  ) { 
    this.newSchoolForm = this.fb.group(
      {
      s_name:['',Validators.required],
      s_image:['',Validators.required],
      s_url:['',Validators.required]
    })
    this.newCompanyForm = this.fb.group(
      {
      c_name:['',Validators.required],
      c_image:['',Validators.required],
      c_url:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.schoolsv.list(this.personid).subscribe(data=>{
      //console.log(data.length);
      if(data.length===0){
        this.isSchool=false;
      } else {
        this.isSchool=true;
      }
    }, err =>{
      //console.log(err.error.message);
    });

    this.companysv.list(this.personid).subscribe(data=>{
      //console.log(data.length);
      if(data.length===0){
        this.isCompany=false;
      } else {
        this.isCompany=true;
      }
      
    }, err =>{
      //console.log(err.error.message);
    });
  }

  get sName(){return this.newSchoolForm.get('s_name')};
  get sImage(){return this.newSchoolForm.get('s_image')};
  get sUrl(){return this.newSchoolForm.get('s_url')};

  get cName(){return this.newCompanyForm.get('c_name')};
  get cImage(){return this.newCompanyForm.get('c_image')};
  get cUrl(){return this.newCompanyForm.get('c_url')};

  onCreateS(personid=1):void{
    const {
      s_name,
      s_image,
      s_url
    } = this.newSchoolForm.value;
    const school=new School(
      s_name,
      s_image,
      s_url
    );
    this.schoolsv.save(personid, school)
    .subscribe(data=>{
      Swal.fire({
        icon: 'success',
        text: 'Creado correctamente',
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
      console.log(err.error.message);
      this.ruta.navigate(['portfolio']);
    });
  }

  onCreateC(personid=1):void{
    const {
      c_name,
      c_image,
      c_url
    } = this.newCompanyForm.value;
    const company=new Company(
      c_name,
      c_image,
      c_url
    );
    this.companysv.save(personid, company)
    .subscribe(data=>{
      Swal.fire({
        icon: 'success',
        text: 'Creado correctamente',
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
