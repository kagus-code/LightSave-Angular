import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   form : FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:"",
      username:"",
      password:"",
    });
  }
submit(): void{
  this.http.post('https://flash-save.herokuapp.com/register/',this.form.getRawValue()).subscribe(response =>{
    alert("Account created succesfully welcome to lightSave")
    this.router.navigateByUrl('/login');

  })


}
}
