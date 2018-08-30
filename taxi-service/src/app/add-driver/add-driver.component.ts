import { Component, OnInit, ViewChild } from '@angular/core';
import { CarClass } from '../models/car';
import { LocationClass } from '../models/location';
import { AddDriverService } from '../add-driver.service';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { DriverClass } from '../models/driver';
import { Observable } from 'rxjs';

enum TypeOfCar {
  PassengerCar,
  Van,
}

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
  providers: [AddLocationComponent, AddCarComponent]
})
export class AddDriverComponent implements OnInit {

  constructor(private carComponent : AddCarComponent, private locationComponent : AddLocationComponent, private driverService : AddDriverService, private route : Router, private httpClient: HttpClient) { this.locations = []}

  Username : string;
  Password : string;
  FullName: string;
  SSN: string;
  Email : string;
  ConfirmPassword: string;
  Role: string;
  ContactNumber : string;
  Gender: string;
  DriveType: string;
  CarType: string;
  CarYear: number;
  TaxiNumber : number;
  Registration : string;
  Car : CarClass;
  CarId: number;
  cars: CarClass[];
  Location : LocationClass;
  LocationId: number;
  locations: LocationClass[];
  @ViewChild("f") myForm;
  
  
  getLocations()
  {
    this.locationComponent.getAllLocations().subscribe(s => this.locations = s);
  }

  getCars()
  {
    this.carComponent.getAllCars().subscribe(s => this.cars = s);
  }

  getAllDrivers() : Observable<any>
  { 
    return this.httpClient.get('http://localhost:51680/api/Driver/GetDrivers');
  }

  getAllAvailableDrivers() : Observable<any>
  { 
    return this.httpClient.get('http://localhost:51680/api/Driver/GetAvailableDrivers');
  }

  ngOnInit() {
    this.getLocations();
    this.getCars();
    console.log(this.locations);
  }
  

  onSubmitAdd(){
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
    this.CarType == "" ||
    this.CarId == undefined ||
    this.LocationId == undefined)
    {
      alert("Some required fields are empty."); 
    }
    else
    {    
      let driver = new DriverClass(this.Username,this.Email,this.FullName,this.Role,this.SSN, this.Password,this.ConfirmPassword, this.Password, this.Gender, this.DriveType, this.ContactNumber, this.LocationId, this.CarId, true);
      let headers = new HttpHeaders();
      headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
      headers.append('enctype','multipart/form-data');

      let fd = new FormData();                 
      fd.append('driver',JSON.stringify(driver));          
      
        let y = this.httpClient.post(`http://localhost:51680/api/Driver/AddDriver`, fd.get('driver') , {"headers": headers});
        y.subscribe(
        res => {  
          console.log("Successfully added driver!")     
          this.myForm.reset();       
        },
        error => 
        {
          alert("Driver not added." + error.error.Message)  
        });
      }
  }
}

