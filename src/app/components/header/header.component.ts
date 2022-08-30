import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';
import { SchoolService } from 'src/app/services/school.service';

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
    private toastr:ToastrService,
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
      this.toastr.error("Ha ocurrido un error obteniendo la lista de última escuela", 'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message);
    })
  }

  loadCompanys(){
    this.companyServ.list(this.personid).subscribe(data=>{
      this.companys=data;
    }, err=>{
      this.toastr.error("Ha ocurrido un error obteniendo la lista de última compañía", 'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message);
    })
  }
  obtenerDatos(){
    this.profileServ.list().subscribe(data=>{
      this.miPortfolio=(data);
    }, err=>{
      this.toastr.error("Ha ocurrido un error obteniendo la lista de última escuela", 'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message);
    })
  }

  logout():void{
    this.token.signOut();
    this.ruta.navigate([""])
  }

  deleteSchool(id:number){
    this.schoolServ.delete(id).subscribe(data=>{
      this.toastr.success("Eliminada correctamente la entrada con id: " + id, 'Ok',{timeOut:3000,positionClass:'toast-top-full-width'});
      this.loadSchools();
      this.reloadComponent();
    }, err=>{
      this.toastr.error("Ha ocurrido un error eliminando la entrada school con id: " + id, 'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message);
    })
  }

  deleteCompany(id:number){
    this.companyServ.delete(id).subscribe(data=>{
      this.toastr.success("Eliminada correctamente la entrada con id: " + id, 'Ok',{timeOut:3000,positionClass:'toast-top-full-width'});
      this.loadCompanys();
      this.reloadComponent();
    }, err=>{
      this.toastr.error("Ha ocurrido un error eliminando la entrada school con id: " + id, 'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
      //console.log(err.error.message);
    })
  }

  reloadComponent() {
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate(['/portfolio']);
  }

}
