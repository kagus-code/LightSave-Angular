import { Component, OnInit } from '@angular/core';
import {Emitters} from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
   authenticated = false;
  constructor(

    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
Emitters.authEmitter.subscribe(
  (auth: boolean) => {
   this.authenticated = auth;
  }
);
  }

logout ():void{

  this.http.post('https://flash-save.herokuapp.com/logout/',{},{withCredentials:true}).subscribe(response =>{
    console.log(response)
    this.authenticated = false;
    localStorage.removeItem("token")
    this.router.navigateByUrl('/login');

  })

}

}
