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
  hoursDay:number;
  kwhDay:any="";
  kwhMonth:any="";
  kwhYear:any="";
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
energyCalc(event:any){
// this.hoursDay = event.target.dayHrs.value
let power=parseInt(this.wattageVal.AppList);
let hrs = parseInt(event.target.dayHrs.value);
if (power== NaN || hrs == NaN) return;
power/=1000;
let kwhDay = power * hrs;
let kwhMonth = kwhDay * 30;
let kwhYear = kwhDay * 365;
kwhDay   = parseFloat(kwhDay.toFixed(5));

kwhMonth = parseFloat(kwhMonth.toFixed(5));
kwhYear  = parseFloat(kwhYear.toFixed(5));
this.kwhDay=kwhDay;
this.kwhMonth = kwhMonth;
this.kwhYear =kwhYear;
console.log(kwhDay+"--"+kwhMonth+"--"+kwhYear);
this.applianceForm.reset();
event.target.dayHrs.value = " "
event.target.powerWatt.value = " "




}

}
