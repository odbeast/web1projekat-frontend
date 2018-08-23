import { Component, OnInit } from '@angular/core';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { DriveClass } from '../models/drive';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-own-drives',
  templateUrl: './show-own-drives.component.html',
  styleUrls: ['./show-own-drives.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent]
})
export class ShowOwnDrivesComponent implements OnInit {

  drives : DriveClass[];

  constructor(private httpClient: HttpClient,private driveComponent : AddDriveComponent) { }
  
  ngOnInit() {
    let driveData = this.getDrives(localStorage.getItem("username"));
    driveData.subscribe(
      res => {        
        this.drives = res as DriveClass[];
      }
    )
  }

  getDrives(username)
  {
    let params: HttpParams = new HttpParams()
    .set('username', username);
    return this.httpClient.get("http://localhost:51680/api/Drive/GetAdminDrives/"+username);
  } 
}