import { Component, OnInit } from '@angular/core';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { DriveClass } from '../models/drive';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent]
})
export class ChangeStatusComponent implements OnInit {

  drives : DriveClass[];
  Status : string;
  public static DriveId: number;

  constructor(private route : Router, private httpClient: HttpClient,private driveComponent : AddDriveComponent) { }
  
  ngOnInit() {
    this.getAllDrives();
  }

  getAllDrives()
  {
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
    return this.httpClient.get("http://localhost:51680/api/Drive/GetDriverDrives/"+username);
  } 

  ChangeStatus(Id : number)
  {
    if(this.Status == "" || this.Status == undefined)
    {
      alert("Some required fields are empty."); 
    }
    else
    {   
      ChangeStatusComponent.DriveId = Id;
      let userId = this.httpClient.get("http://localhost:51680/api/Drive/ChangeStatus/"+Id +`/` + this.Status).subscribe(
        res => {        
            console.log("Status changed!");
            if(this.Status == "Unsuccessfull")
            {
              this.route.navigate(['/add-comment'])
            }
            if(this.Status == "Successfull")
            {
              this.route.navigate(['/add-price-destination'])
            }
            this.getAllDrives();
        });
    }
  }
}
