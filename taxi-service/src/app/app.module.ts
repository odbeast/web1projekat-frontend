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
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { AddPriceDestComponent } from './add-price-dest/add-price-dest.component';
import { ShowWaitDrivesComponent } from './show-wait-drives/show-wait-drives.component';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { SearchByNameComponent } from './search-by-name/search-by-name.component';
import { SortComponent } from './sort/sort.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/interceptors/tokeninterceptor';
import { IsAdminGuard } from './guards/isAdmin.guard';
import { IsDriverGuard } from './guards/isDriver.guard';
import { TakeATaxiComponent } from './take-a-taxi/take-a-taxi.component';
import { ShowUserDrivesComponent } from './show-user-drives/show-user-drives.component';
import { IsCustomerGuard } from './guards/isCustomer.guard';
import { IsNotAdminGuard } from './guards/isNotAdmin.guard';

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
    canActivate: [IsAdminGuard],
  },
  {
    path : "add-car", 
    component: AddCarComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path : "add-location", 
    component: AddLocationComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path : "user-profile", 
    component: UserProfileComponent,
    canActivate: [IsCustomerGuard],
  },
  {
    path : "change-location", 
    component: ChangeLocationComponent,
    canActivate: [IsDriverGuard],
  },
  {
    path : "add-drive", 
    component: AddDriveComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path : "show-drives", 
    component: ShowDrivesComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path : "show-own-drives", 
    component: ShowOwnDrivesComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path : "show-driver-drives", 
    component: ShowDriverDrivesComponent,
    canActivate: [IsDriverGuard],
  },
  {
    path : "change-status", 
    component: ChangeStatusComponent,
    canActivate: [IsDriverGuard],
  },
  {
    path : "driver-profile", 
    component: DriverProfileComponent,
    canActivate: [IsDriverGuard],
  },
  {
    path : "add-comment", 
    component: AddCommentComponent,
    canActivate: [IsNotAdminGuard],
  },
  {
    path : "add-price-destination", 
    component: AddPriceDestComponent,
    canActivate: [IsDriverGuard],
  },
  {
    path : "show-wait-drives", 
    component: ShowWaitDrivesComponent,
    canActivate: [IsDriverGuard],
  },
  {
    path : "filter", 
    component: FilterComponent,
  },
  {
    path : "search", 
    component: SearchComponent,
  },
  {
    path : "search-by-name", 
    component: SearchByNameComponent,
  },
  {
    path : "sort", 
    component: SortComponent,
  },
  {
    path : "take-a-taxi", 
    component: TakeATaxiComponent,
    canActivate: [IsCustomerGuard],
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
    ChangeStatusComponent,
    DriverProfileComponent,
    AddCommentComponent,
    AddPriceDestComponent,
    ShowWaitDrivesComponent,
    FilterComponent,
    SearchComponent,
    SearchByNameComponent,
    SortComponent,
    TakeATaxiComponent,
    ShowUserDrivesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(Routes),
    FormsModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  IsAdminGuard, 
  IsDriverGuard,
  IsCustomerGuard,
  IsNotAdminGuard,
  NavbarComponent,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
