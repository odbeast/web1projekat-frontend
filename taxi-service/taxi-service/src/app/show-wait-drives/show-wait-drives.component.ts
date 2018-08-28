import { Component, OnInit } from '@angular/core';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { DriveClass } from '../models/drive';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DriverClass } from '../models/driver';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-show-wait-drives',
  templateUrl: './show-wait-drives.component.html',
  styleUrls: ['./show-wait-drives.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent]
})
export class ShowWaitDrivesComponent implements OnInit {

  drives : DriveClass[];
  DriverId : number;
  Driver : DriverClass;

  constructor(private httpClient: HttpClient,private driveComponent : AddDriveComponent,private route : Router) { }

  ngOnInit() {
    this.getDriverId();
    let driveData = this.getDrivesByStatus("Created");
    driveData.subscribe(
      res => {        
        this.drives = res as DriveClass[];
      }
    )
  }

  getDriverId()
  {
    let di = this.httpClient.get("http://localhost:51680/api/AppUser/GetUser/"+localStorage.getItem("username"))
    di.subscribe(
      res => {
          this.DriverId = res as number;
      }
    )
  }

  TakeDrive(Id : number)
  {
     this.httpClient.get("http://localhost:51680/api/Driver/TakeDrive/"+this.DriverId + `/` +Id).subscribe(
      res => {
        console.log("Succesfully accepted drive!");
        this.route.navigate(['/home']);
      });
  }

  getDrivesByStatus(status : string)
  {
    let params: HttpParams = new HttpParams()
    .set('status', status);
    return this.httpClient.get("http://localhost:51680/api/Drive/GetDrivesByStatus/"+status);
  } 
}
