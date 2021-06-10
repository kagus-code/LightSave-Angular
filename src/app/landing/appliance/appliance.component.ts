import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AppList } from 'src/app/app-list';


@Component({
  selector: 'app-appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.css']
})
export class ApplianceComponent implements OnInit {

  constructor(

    private service: SharedService,
    private router: Router,
    private formbuilder: FormBuilder,
  ) { }

  ApplianceList:any=[];
  wattageVal:any = " ";
  applianceForm: FormGroup;

  ngOnInit(): void {
    this.refreshAppList();
    this.applianceForm = this.formbuilder.group({
      AppList: [null ]
	
});	
    
  }

refreshAppList(){
  this.service.getAppliances().subscribe(data=>{
    this.ApplianceList=data;
  });
}

wattVal(): void{
  this.wattageVal = this.applianceForm.value
  console.log(this.wattageVal)

}



}
