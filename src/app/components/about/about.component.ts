import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
/* definimos la variable para acceder a la info acerca de del servicio*/
about:any;  
isAdmin:boolean=false;
/* llamamos al servicio de datos en el constructor */
constructor(private profileServ:ProfileService,
  private token:TokenStorageService
  ) { }

ngOnInit(): void {
  this.profileServ.list().subscribe( data => {
    this.about=(data);
    this.isAdmin = this.token.isLoggedAdmin();
  })
}
}
