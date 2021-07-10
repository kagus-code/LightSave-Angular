import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AppList } from 'src/app/app-list';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'app-appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.css']
})


export class ApplianceComponent implements OnInit {

  @Input()
  required: boolean | string
  
  constructor(

    private service: SharedService,
    private router: Router,
    private formbuilder: FormBuilder,
  ) { }

  ApplianceList:any=[];
  app:any;
  applianceId :string
  name:string
  wattage:string

  wattageVal:any = " ";
  applianceForm: FormGroup;
  costForm:FormGroup;
  hoursDay:number;
  kwhDay:any="";
  kwhMonth:any="";
  kwhYear:any="";

  kwhDayCost:any="";
  kwhMonthCost:any="";
  kwhYearCost:any="";

  resDay: string = "";
  resMonth: string = "";
  resYear: string = "";
  ngOnInit(): void {
    this.refreshAppList();
    this.applianceForm = this.formbuilder.group({
      AppList: [null ],
});	
this.costForm = this.formbuilder.group({
  AppList: [null ],
});	


  }

refreshAppList(){
  this.service.getAppliances().subscribe(data=>{
    this.ApplianceList=data;
  });
}

wattVal(): void{
  this.wattageVal = this.applianceForm.value


}

costwattVal(): void{
  this.wattageVal = this.costForm.value


}



energyCalc(event:any){
// this.hoursDay = event.target.dayHrs.value
let power=parseInt(this.wattageVal.AppList);
let hrs = parseInt(event.target.dayHrs.value);
if ( event.target.dayHrs.value <= 0 || event.target.powerWatt.value <= 0) {
  alert("enter valid value")
  
  return;}

  if ( event.target.dayHrs.value > 24) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'A day only has 24hrs',

    })
    
    return;}
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


this.resDay ="Energy Consumed per Day &nbsp;&nbsp;---&nbsp;&nbsp;" +this.kwhDay + "&nbsp; (units kw/h)  "
this.resMonth= "Energy Consumed Month &nbsp;&nbsp;---&nbsp;&nbsp;" +this.kwhMonth + "&nbsp; (units kw/h) " 
this.resYear ="Energy Consumed Year &nbsp;&nbsp;---&nbsp;&nbsp;" +this.kwhYear + "&nbsp; (units kw/h)"
this.applianceForm.reset();
event.target.dayHrs.value =""
event.target.powerWatt.value=""
$('#exampleModal').modal('hide');
}






costCalc(event:any){

  let power=parseInt(this.wattageVal.AppList);
let hrs = parseInt(event.target.dayHrs.value);
let cost = parseInt(event.target.costKw.value)
if ( event.target.dayHrs.value <= 0 || event.target.powerWatt.value <= 0) {
  Swal.fire({
      icon: 'error',
      text: 'Enter a valid value',

    })
  
  return;}

  if ( event.target.dayHrs.value > 24) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'A day only has 24hrs',

    })
    
    return;}
power/=1000;
let kwhDay = power * hrs;
let kwhMonth = kwhDay * 30;
let kwhYear = kwhDay * 365;
kwhDay   = parseFloat(kwhDay.toFixed(5));

kwhMonth = parseFloat(kwhMonth.toFixed(5));
kwhYear  = parseFloat(kwhYear.toFixed(5));

let kwhDayCost = kwhDay * cost
let kwhMonthCost = kwhMonth * cost
let kwhYearCost = kwhYear * cost

this.kwhDayCost = Math.round( kwhDayCost)
this.kwhMonthCost =Math.round(kwhMonthCost)
this.kwhYearCost = Math.round(kwhYearCost)



this.resDay ="Cost per Day &nbsp;&nbsp;---&nbsp;&nbsp;" +this.kwhDayCost + "&nbsp; shillings "
this.resMonth= "Cost per Month &nbsp;&nbsp;---&nbsp;&nbsp;" +this.kwhMonthCost + "&nbsp; shillings " 
this.resYear ="Cost per Year &nbsp;&nbsp;---&nbsp;&nbsp;" +this.kwhYearCost + "&nbsp; shillings "
this.costForm.reset();
event.target.dayHrs.value =""
event.target.powerWatt.value =""
$('#calcModal').modal('hide');

}



addCustomApp(){
  this.app ={
    applianceId :0,
    name:"",
    wattage:0
  }
var val = {
  applianceId : this.applianceId,
  name:this.name,
  wattage:this.wattage
};
this.service.addAppliances(val).subscribe(res=>{
  $('#customAppModal').modal('hide');
  Swal.fire('',
  'Saved Successfully',
  'success').then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    } 
  })

});

}

closeClick(){
this.refreshAppList()

}






}
