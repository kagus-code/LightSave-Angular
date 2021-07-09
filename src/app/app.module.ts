import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import {SharedService} from './shared.service';
import { ApplianceComponent } from './landing/appliance/appliance.component';
import { CostComponent } from './landing/cost/cost.component';
import { CustomAppComponent } from './custom-app/custom-app.component';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule,NgxUiLoaderHttpModule  } from "ngx-ui-loader";



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    ApplianceComponent,
    CostComponent,
    CustomAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule, // import NgxUiLoaderModule
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }), // import NgxUiLoaderHttpModule. By default, it will show background loader.
    // If you need to show foreground spinner, do as follow:
    // NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
