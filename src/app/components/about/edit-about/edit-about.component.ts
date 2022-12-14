import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Person } from 'src/app/models/person';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {

  acercade:any;  
  param:string;
  profileForm = this.fb.group({
      name:['',Validators.required],
      backImg:['',Validators.required],
      profileImg:['',Validators.required],
      email:['',Validators.required],
      location:['',Validators.required],
      about:['',Validators.required]
  })

  constructor(
    private fb:FormBuilder,
    private profileServ:ProfileService,
    private ruta:Router,
    private activRouter:ActivatedRoute
  ) { 
    this.param='';
    
  }

  ngOnInit(): void {
    //obtenemos el parámetro para ocultar lo que corresponda en el template usando [hidden]="!(param === 'param')"
    this.param = this.activRouter.snapshot.params['param'];
    //obtenemos los datos y populamos los campos del formulario
    this.profileServ.list().subscribe( data => {
      this.acercade=(data);
      this.profileForm.patchValue({
        name:this.acercade.name,
        backImg:this.acercade.backImg,
        profileImg:this.acercade.profileImg,
        email:this.acercade.email,
        location:this.acercade.location,
        about:this.acercade.about
      })
    }, err =>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  
  }

  get Name(){return this.profileForm.get('name')}
  get BackImg(){return this.profileForm.get('backImg')}
  get ProfileImg(){return this.profileForm.get('profileImg')}
  get Email(){return this.profileForm.get('email')}
  get Location(){return this.profileForm.get('location')}
  get About(){return this.profileForm.get('about')}

    onUpdate(personid=1):void{
      const {
        name,
        backImg,
        profileImg,
        email,
        location,
        about
      } = this.profileForm.value;
      const person=new Person(
        name!,
        backImg!,
        profileImg!,
        email!,
        location!,
        about!
      );
      this.profileServ.update(personid, person)
      .subscribe(data=>{
        Swal.fire({
          icon: 'success',
          text: 'Actualizado Correctamente',
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
      })
    }

}
