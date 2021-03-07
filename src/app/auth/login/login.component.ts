import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor( private fb: FormBuilder,
               private authService: AuthService,
               public router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  loginUsuario() {
    if (this.loginForm.invalid){
      return
    }
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const {email, password} = this.loginForm.value;
    this.authService.loginUsuario(email,password)
    .then(login => {
      console.log(login);
      Swal.close();
      this.router.navigate(['/dashboard']);
      })
    .catch( err => {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    });
  }

}
