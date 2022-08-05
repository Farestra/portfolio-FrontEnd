import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin:FormGroup;
  nombreUsuario = null
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private token: TokenStorageService,
    private ruta:Router,
    private toastr:ToastrService
  ) { 
    this.formlogin=this.fb.group(
      {
        username:['',[Validators.required,Validators.maxLength(20)]],
        password:['',[Validators.required,Validators.minLength(6)]]
      }
    )
  }
  
  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getUser().roles;
    }
  }

  get Username(){
    return this.formlogin.get('username');
  }

  get Password(){
    return this.formlogin.get('password');
  }

  onSubmit(): void {
    const { username, password } = this.formlogin.value;
    this.auth.login(username, password).subscribe({
      next: data => {
        this.token.saveToken(data.accessToken);
        this.token.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.token.getUser().roles;
        this.nombreUsuario = this.token.getUser().username;
        console.log("DATA: " + JSON.stringify(data));
        this.ruta.navigate(['/portfolio'])
        this.toastr.success("Bienvenido : " + this.nombreUsuario ,'Inicio de sesión OK',{timeOut:3000,positionClass:'toast-top-full-width'});
      },
      error: err => {
        this.toastr.error("Error al iniciar sesión, verifique sus credenciales",'Error',{timeOut:3000,positionClass:'toast-top-full-width'});
        console.log(err.error.message)
        this.isLoginFailed = true;
      }
    });
  }
}
