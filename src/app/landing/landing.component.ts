import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Emitters} from '../emitters/emitters';
import {SharedService} from 'src/app/shared.service';
import Swal from 'sweetalert2'
import { data } from 'jquery';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
user:any = []
message =" "

  constructor(private service: SharedService,

    private http: HttpClient,
    private router: Router

  ) { }
  ApplianceList:any=[];
  nameFilter:string;
  ApplianceListWithoutFilter:any=[];
  ngOnInit(): void {

    this.http.get('https://flash-save.herokuapp.com/user/',
    {withCredentials:true})
    .subscribe(response =>{
      this.user = response;
      Emitters.authEmitter.emit(true);
      
    },
     error => { 
      
      console.log('error', error)
      this.message ="no user found";
      Emitters.authEmitter.emit(false);

  }
    );

  }


  refreshAppList(){
    this.service.getAppliances().subscribe(data=>{
      this.ApplianceList=data;
    });
  }
  tableData(){
    this.service.getAppliances().subscribe(data=>{
      this.ApplianceList=data;
    });
    
  }

  deleteClick(item:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteAppliances(item.applianceId).subscribe(data=>{
          Swal.fire(
            'Deleted!',
            'Appliance has been deleted.',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            } 
          })
        })
        

      }
    })

  }

  filterfn(){
    var nameFilter =this.nameFilter;
    this.ApplianceList = this.ApplianceListWithoutFilter.filter(function(el:any){
      return el.name.toString().toLowerCase().includes(
        nameFilter.toString().trim().toLowerCase()
        
      )
    });
  }
}
