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

  this.http.post('https://flash-save.herokuapp.com/',{},{withCredentials:true}).subscribe(response =>{
    console.log(response)
    confirm("Do you really want to Logout");
    this.authenticated = false;
    this.router.navigateByUrl('/login');

  })

}

}
