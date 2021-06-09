import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
user:any = []
message =""

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/user/',
    {withCredentials:true})
    .subscribe(response =>{
      console.log(response);
      this.user = response
    },
    error => this.message ="no user found"
    
    );

    

  }

}
