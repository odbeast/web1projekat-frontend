import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangeLocationComponent } from './change-location/change-location.component';
import { AddDriveComponent } from './add-drive/add-drive.component';
import { ShowDrivesComponent } from './show-drives/show-drives.component';
import { ShowOwnDrivesComponent } from './show-own-drives/show-own-drives.component';
import { ShowDriverDrivesComponent } from './show-driver-drives/show-driver-drives.component';
import { ChangeStatusComponent } from './change-status/change-status.component';

const  Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path : "logout", 
    component: LogoutComponent,
  },
  {
    path : "add-driver", 
    component: AddDriverComponent,
  },
  {
    path : "add-car", 
    component: AddCarComponent,
  },
  {
    path : "add-location", 
    component: AddLocationComponent,
  },
  {
    path : "user-profile", 
    component: UserProfileComponent,
  },
  {
    path : "change-location", 
    component: ChangeLocationComponent,
  },
  {
    path : "add-drive", 
    component: AddDriveComponent,
  },
  {
    path : "show-drives", 
    component: ShowDrivesComponent,
  },
  {
    path : "show-own-drives", 
    component: ShowOwnDrivesComponent,
  },
  {
    path: "other",
    redirectTo: "home"
  },
  {
    path: "home",
    component: HomeComponent,
  }  
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    NavbarComponent,
    AddDriverComponent,
    AddCarComponent,
    AddLocationComponent,
    UserProfileComponent,
    ChangeLocationComponent,
    AddDriveComponent,
    ShowDrivesComponent,
    ShowOwnDrivesComponent,
    ShowDriverDrivesComponent,
    ChangeStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(Routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
