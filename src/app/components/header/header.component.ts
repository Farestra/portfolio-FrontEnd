import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CompanyService } from 'src/app/services/company.service';
import { SchoolService } from 'src/app/services/school.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /* efectuamos el databinding definiendo la variable
  y asignandola en el método más abajo*/
  miPortfolio:any;  
  personid:number=1
  schools:any[] = [];
  companys:any[] = [];
  isAdmin:boolean = false
  constructor(private profileServ:ProfileService,
    private token: TokenStorageService,
    private ruta:Router,
    private companyServ:CompanyService,
    private schoolServ:SchoolService
    ) { }

  ngOnInit(): void {
    /* al inicio del componente utilizamos el servicio de datos
    a traves de su método obtener datos y nos subscribimos para
    poder retornar por consola los datos */
    this.obtenerDatos();
    this.loadCompanys();
    this.loadSchools();
    //console.log(this.token.getUser());
    this.isAdmin = this.token.isLoggedAdmin();
    
  }

  loadSchools(){
    this.schoolServ.list(this.personid).subscribe(data=>{
      this.schools=data;
    }, err=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  loadCompanys(){
    this.companyServ.list(this.personid).subscribe(data=>{
      this.companys=data;
    }, err=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }
  obtenerDatos(){
    this.profileServ.list().subscribe(data=>{
      this.miPortfolio=(data);
    }, err=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  logout():void{
    this.token.signOut();
    this.ruta.navigate([""])
  }

  deleteSchool(id:number){
    this.schoolServ.delete(id).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        text: 'Eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.loadSchools();
      this.reloadComponent();
    }, err=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  deleteCompany(id:number){
    this.companyServ.delete(id).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        text: 'Eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.loadCompanys();
      this.reloadComponent();
    }, err=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text:'' + err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  reloadComponent() {
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate(['/portfolio']);
  }

}
