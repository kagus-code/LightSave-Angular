import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  jwt:any;
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }

    ngOnInit(): void {
      this.form = this.formbuilder.group({
        email:"",
        password:"",
      });
    }
    submit(): void{
      this.http.post('https://flash-save.herokuapp.com/login/',this.form.getRawValue(),
      {withCredentials:true})
      .subscribe(
        response => {
          console.log(response)
          this.jwt = response
         localStorage.setItem("token",`${this.jwt.jwt}`)
          this.router.navigateByUrl('');
        },
        error =>Swal.fire(error.error.detail,'Login Unsuccessful!')
      
        
        
      );
        
    }
}
