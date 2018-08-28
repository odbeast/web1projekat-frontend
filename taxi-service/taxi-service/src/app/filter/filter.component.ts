import { Component, OnInit } from '@angular/core';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { DriveClass } from '../models/drive';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent]
})
export class FilterComponent implements OnInit {

  drives : DriveClass[];
  Status : string;

  constructor(private httpClient: HttpClient,private driveComponent : AddDriveComponent) { }

  ngOnInit() {
  }

  getDrivesByStatus()
  {
    return this.httpClient.get("http://localhost:51680/api/Drive/GetDrivesByStatus/"+this.Status);
  } 

  onSubmit(){
   let driveData = this.getDrivesByStatus();
    driveData.subscribe(
      res => {        
        this.drives = res as DriveClass[];
      },
      error => 
      {
        alert("There are no drives with selected status." + error.error.Message)  
      });
  }
}

