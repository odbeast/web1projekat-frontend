import { Component, OnInit } from '@angular/core';
import { DriverClass } from '../models/driver';
import { DriveClass } from '../models/drive';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { HttpParams } from '@angular/common/http';
import { AddCarComponent } from '../add-car/add-car.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriveComponent } from '../add-drive/add-drive.component';

@Component({
  selector: 'app-assign-drive',
  templateUrl: './assign-drive.component.html',
  styleUrls: ['./assign-drive.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent]
})
export class AssignDriveComponent implements OnInit {

  Date : Date;
  CarType: string;
  Price : number;
  Status : string;
  OriginId : number;
  DestinationId : number;
  AdminId : number;
  NewAdminId: number;
  DriverId : number;
  Driver : DriverClass;
  drivers: DriverClass[];
  DriveId : number;
  Drive : DriveClass;
  drives : DriveClass[] = [];

  constructor(private driverComponent : AddDriverComponent,private route : Router, private httpClient: HttpClient) { }

  getDrivers()
  {
    this.driverComponent.getAllAvailableDrivers().subscribe(s => this.drivers = s);
  } 

  getAdmin(username){
    let params: HttpParams = new HttpParams()
    .set('username', username);
    let userId = this.httpClient.get("http://localhost:51680/api/AppUser/GetUser/"+username).subscribe(
      res => {        
        this.NewAdminId = res as number;
      }
    )
  }

  ngOnInit() {
    this.getDrivers();
    this.getAdmin(localStorage.getItem("username"));
    let driveData = this.getDrivesByStatus("Created");
    driveData.subscribe(
      res => {        
        this.drives = res as DriveClass[];
      }
    )
  }

  AssignDrive(Id : number){
    if(this.DriverId == undefined)
      {
        alert("Some required fields are empty."); 
      }
      else
      {
        let userId = this.httpClient.get("http://localhost:51680/api/Drive/AssignDrive/"+Id +`/` + this.DriverId +`/` + this.NewAdminId).subscribe(
          res => {        
              console.log("Drive assigned!");
                this.route.navigate(['/home']);
          });
      }
  }

  getDrivesByStatus(status : string)
  {
    let params: HttpParams = new HttpParams()
    .set('status', status);
    return this.httpClient.get("http://localhost:51680/api/Drive/GetDrivesByStatus/"+status);
  } 

}
