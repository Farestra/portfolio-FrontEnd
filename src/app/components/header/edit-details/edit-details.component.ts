import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { School } from 'src/app/models/school';
import { CompanyService } from 'src/app/services/company.service';
import { SchoolService } from 'src/app/services/school.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  school:any;
  company:any;
  param:string;
  id:number;

  SchoolForm = this.fb.group(
    {
    s_name:['',Validators.required],
    s_image:['',Validators.required],
    s_url:['',Validators.required]
  })

  CompanyForm = this.fb.group(
    {
    c_name:['',Validators.required],
    c_image:['',Validators.required],
    c_url:['',Validators.required]
  })

  constructor(
    private fb:FormBuilder,
    private schoolsv:SchoolService,
    private companysv:CompanyService,
    private ruta:Router,
    private activRouter:ActivatedRoute
  ) {
    this.param='';
    this.id=0;
   }

  ngOnInit(): void {
    //obtenemos los parámetros para: ocultar lo que corresponda en el template usando [hidden]="!(param === 'param')";
    //y para obtener los respectivos objetos por su id
    this.param = this.activRouter.snapshot.params['param']
    this.id = this.activRouter.snapshot.params['id']
    if(this.param ==='company'){
      this.obtainC(this.id);
    } else if(this.param === 'school') {
      this.obtainS(this.id);
    } else {
      this.ruta.navigate(['**'])
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'No se puede capturar el parámetro para la ruta',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  get sName(){return this.SchoolForm.get('s_name')};
  get sImage(){return this.SchoolForm.get('s_image')};
  get sUrl(){return this.SchoolForm.get('s_url')};

  get cName(){return this.CompanyForm.get('c_name')};
  get cImage(){return this.CompanyForm.get('c_image')};
  get cUrl(){return this.CompanyForm.get('c_url')};

  obtainS(id:number){
    this.schoolsv.detail(this.id).subscribe(data=>{
      this.SchoolForm.patchValue({
        s_name:data.name,
        s_image:data.image,
        s_url:data.url
      })
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  obtainC(id:number){
    this.companysv.detail(id).subscribe(data=>{
      this.CompanyForm.patchValue({
        c_name:data.name,
        c_image:data.image,
        c_url:data.url
      })
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  onUpdateS(personid=1):void{
    const {
      s_name,
      s_image,
      s_url
    } = this.SchoolForm.value;
    const school=new School(
      s_name!,
      s_image!,
      s_url!
    );
    this.schoolsv.update(personid, school)
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

  onUpdateC(personid=1):void{
    const {
      c_name,
      c_image,
      c_url
    } = this.CompanyForm.value;
    const company=new Company(
      c_name!,
      c_image!,
      c_url!
    );
    this.companysv.update(personid, company)
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
