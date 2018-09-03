import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddLocationComponent } from '../add-location/add-location.component';
import { DriverClass } from '../models/driver';
import { LocationClass } from '../models/location';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { DriveClass } from '../models/drive';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

enum TypeOfCar {
  None,
  PassengerCar,
  Van,
}

enum RideStatus {
  Created = 0,
  Canceled,
  Formed,
  Processed,
  Accepted,
  Unsuccessfull,
  Successfull,
}

@Component({
  selector: 'app-add-drive',
  templateUrl: './add-drive.component.html',
  styleUrls: ['./add-drive.component.css'],
  providers: [AddLocationComponent, AddDriverComponent, AddCarComponent]
})
export class AddDriveComponent implements OnInit {

  Date : Date;
  CarType: string;
  Price : number;
  Status : string;
  OriginId : number;
  DestinationId : number;
  AdminId : number;
  DriverId : number;
  Driver : DriverClass;
  drivers: DriverClass[];
  locations: LocationClass[];
  @ViewChild("f") myForm;

  constructor(private locationComponent : AddLocationComponent, private driverComponent : AddDriverComponent, private route : Router, private httpClient: HttpClient) { }

  getLocations()
  {
    this.locationComponent.getAllLocations().subscribe(s => this.locations = s);
  }

  getDrivers()
  {
    this.driverComponent.getAllAvailableDrivers().subscribe(s => this.drivers = s);
  }

  getAllDrives() : Observable<any>
  {
    return this.httpClient.get('http://localhost:51680/api/Drive/GetDrives');
  }

  getAdmin(username){
    let params: HttpParams = new HttpParams()
    .set('username', username);
    let userId = this.httpClient.get("http://localhost:51680/api/AppUser/GetUser/"+username).subscribe(
      res => {        
        this.AdminId = res as number;
      }
    )
  }

  ngOnInit() {
    this.Price = 0;
    this.Status = RideStatus[0]
    this.getAdmin(localStorage.getItem("username"));
    this.getLocations();
    this.getDrivers();
  }

  onSubmit(){
    if(this.CarType == "" ||
      this.Status == "" ||
      this.OriginId == undefined ||
      this.DestinationId == undefined)
      {
        alert("Some required fields are empty."); 
      }
      else
      {   
        let drive;
        if (this.DriverId == undefined)
        {
          this.Status = RideStatus[0];
          drive = new DriveClass(this.Date,this.CarType,0,this.Status,this.OriginId,this.DestinationId,this.AdminId,null);
        }
        else
        {
          this.Status = RideStatus[2];
          drive = new DriveClass(this.Date,this.CarType,0,this.Status,this.OriginId,this.DestinationId,this.AdminId,this.DriverId);
        }

        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
        headers.append('enctype','multipart/form-data');

        let fd = new FormData();                 
        fd.append('drive',JSON.stringify(drive));          
        
          let y = this.httpClient.post(`http://localhost:51680/api/Drive/AddDrive`, fd.get('drive') , {"headers": headers});
          y.subscribe(
          res => {  
            console.log("Successfully added drive!");
            this.myForm.reset();          
          },
          error => 
          {
            alert("Drive not added." + error.error.Message)  
          });
    }
  }
}
