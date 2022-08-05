import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Education } from 'src/app/models/education';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { EducationService } from 'src/app/services/education.service';

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
    private toastr:ToastrService,
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
        this.toastr.success("Se Ha eliminado correctamente el elemento con id " + id, 'Borrado exitoso',{timeOut:3000,positionClass:'toast-top-center'});
      }, err => {
        this.toastr.error("no se pudo eliminar el id: " + id, 'Error',{timeOut:3000,positionClass:'toast-top-center'});
        console.log(err.error.message)
      })
    }
  }

}
