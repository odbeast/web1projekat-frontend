import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { DriverClass } from '../models/driver';
import { LocationClass } from '../models/location';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { CarClass } from '../models/car';

enum DriveType {
  Single,
  Multiple,
}

enum Gender {
  Male,
  Female,
}

enum Role {
  Customer,
  Admin,
  Driver,
}

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css'],
  providers: [AddLocationComponent, AddCarComponent]
})
export class DriverProfileComponent implements OnInit {

  Username : string;
  Password : string;
  FullName: string;
  Email : string;
  ConfirmPassword: string;
  Role: string;
  ContactNumber : string;
  Gender: string;
  DriveType: string;
  SSN : string;
  Available : boolean;
  Driver : DriverClass;
  OldUsername : string;
  LocationId;
  CarId;
  locations: LocationClass[];
  cars: CarClass[];
  
  constructor(private carComponent : AddCarComponent, private locationComponent : AddLocationComponent, private httpClient: HttpClient, private route : Router) { }

  ngOnInit() {
    this.getUser(localStorage.getItem("username"));
    this.getLocations();
    this.getCars();
  }

  getLocations()
  {
    this.locationComponent.getAllLocations().subscribe(s => this.locations = s);
  }

  getCars()
  {
    this.carComponent.getAllCars().subscribe(s => this.cars = s);
  }

  getUser(username){
    let params: HttpParams = new HttpParams()
    .set('username', username);
    let driver = this.httpClient.get("http://localhost:51680/api/Driver/GetDriver/"+username).subscribe(
         res => {        
            this.Driver = res as DriverClass;
            this.Username = username;
            this.FullName = this.Driver.FullName;
            this.Email = this.Driver.Email;
            this.Password = this.Driver.Password;
            this.ConfirmPassword = this.Driver.ConfirmPassword;
            this.ContactNumber = this.Driver.ContactNumber;
            this.Role = Role[this.Driver.Role];
            this.Gender = Gender[this.Driver.Gender];
            this.DriveType = DriveType[this.Driver.DriveType];
            this.SSN = this.Driver.SSN;
            this.LocationId = this.Driver.LocationId;
            this.CarId = this.Driver.CarId;
            this.Available = this.Driver.Available;
          })
      }

  onSubmit(){  
    if(this.Username == "" ||
    this.Password == "" ||
    this.FullName == "" ||
    this.SSN == "" ||
    this.Email == "" ||
    this.ConfirmPassword == "" ||
    this.Role == "" ||
    this.ContactNumber == "" ||
    this.Gender == "" ||
    this.DriveType == "" ||
    this.CarId == undefined ||
    this.LocationId == undefined)
    {
      alert("Some required fields are empty."); 
    }
    else
    {        
      let headers = new HttpHeaders();
      let driver = new DriverClass(this.Username,this.Email,this.FullName,this.Role,this.SSN,this.Password,this.ConfirmPassword,this.Password,this.Gender,this.DriveType,this.ContactNumber,this.LocationId,this.CarId,this.Available);
      this.httpClient.post("http://localhost:51680/api/Driver/ChangeDriver", driver,  {"headers": headers}).subscribe(
      res => {  
        console.log("Successfully changed user!") 
        this.route.navigate(['/home'])         
      },
      error => 
      {
        alert("User not changed." + error.error.Message)  
      });
    }
  }
}
