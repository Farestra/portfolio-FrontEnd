import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  isAdmin:boolean = false
  constructor(
    private token:TokenStorageService,
    private ruta:Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.token.isLoggedAdmin();
  }

  logout():void{
    this.token.signOut();
    this.ruta.navigate(["/login"])
  }

  login():void{
    this.ruta.navigate(['/login'])
  }

}
