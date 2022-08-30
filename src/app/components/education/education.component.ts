import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { EducationService } from 'src/app/services/education.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  education:Education[]=[];
  isAdmin:boolean=false;
  constructor(
    private token:TokenStorageService,
    private educationServ:EducationService,
    private ruta:Router
    ) { }

  ngOnInit(): void {
    //en el inicio obtenemos el valor de la propiedad isAdmin
    //mediante el método del servicio de token
    this.isAdmin= this.token.isLoggedAdmin();
    this.loadEducation();
    
  }

  loadEducation(personid=1){
    this.educationServ.list(personid).subscribe(data =>{
      this.education=data;
    });
  }

  deleteEducation(id?:number){
    if(id != undefined){
      this.educationServ.delete(id).subscribe(data=>{
        this.loadEducation();
        Swal.fire({
          icon: 'success',
          text: 'Eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
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
  }

}
