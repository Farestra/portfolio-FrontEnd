import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import Swal from 'sweetalert2';

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
  btnEnabled:boolean = true
  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private token: TokenStorageService,
    private ruta:Router,
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
    this.btnEnabled = false;
    Swal.fire({
      icon: 'info',
      title: 'Verificando credenciales:',
      text: 'Por favor aguarde',
      showConfirmButton: false,
      timer: 1000
    })
    const { username, password } = this.formlogin.value;
    this.auth.login(username, password).subscribe({
      next: data => {
        this.token.saveToken(data.accessToken);
        this.token.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.token.getUser().roles;
        this.nombreUsuario = this.token.getUser().username;
        this.ruta.navigate(['/portfolio'])
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido: ' + this.nombreUsuario,
          text: 'Inicio de sesión Correcto',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de Sesión',
          text: 'Por favor, verifique sus credenciales',
          showConfirmButton: false,
          timer: 1500
        })
        this.btnEnabled = true
        this.isLoginFailed = true;
      }
    });
  }
}
