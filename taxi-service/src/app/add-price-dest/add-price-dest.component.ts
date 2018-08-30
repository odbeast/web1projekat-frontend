import { Component, OnInit } from '@angular/core';
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
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';

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
  selector: 'app-add-price-dest',
  templateUrl: './add-price-dest.component.html',
  styleUrls: ['./add-price-dest.component.css'],
  providers: [AddLocationComponent, AddDriverComponent, AddCarComponent, AddDriveComponent, ChangeStatusComponent]
})
export class AddPriceDestComponent implements OnInit {

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
  DriveId : number;
  Drive : DriveClass;
  locations: LocationClass[];

  constructor(private driveComponent : AddDriveComponent, private locationComponent : AddLocationComponent, private driverComponent : AddDriverComponent, private route : Router, private httpClient: HttpClient) { }

  getLocations()
  {
    this.locationComponent.getAllLocations().subscribe(s => this.locations = s);
  }

  getDriveById()
  {
      let driveTmp = this.httpClient.get("http://localhost:51680/api/Drive/GetDriveById/"+this.DriveId).subscribe(
        res => {        
          this.Drive = res as DriveClass;
          this.Date = res[0].Date;
          this.CarType = res[0].CarType;
          this.Status = res[0].Status;
          this.OriginId = res[0].OriginId;
          this.AdminId = res[0].AdminId;
          this.DriverId = res[0].DriverId;
        }
      )
  } 

  ngOnInit() {
    this.DriveId = ChangeStatusComponent.DriveId;
    this.getLocations();
    this.getDriveById()   
  }

  AddPriceDestination(){
    if(this.Price == undefined ||
      this.DestinationId == undefined)
      {
        alert("Some required fields are empty."); 
      }
      else
      {
        let userId = this.httpClient.get("http://localhost:51680/api/Drive/ChangePriceDestination/"+this.DriveId +`/` + this.Price +`/` + this.DestinationId).subscribe(
          res => {        
              console.log("PriceDestination changed!");
                this.route.navigate(['/home']);
          });
      }
  }
} 
