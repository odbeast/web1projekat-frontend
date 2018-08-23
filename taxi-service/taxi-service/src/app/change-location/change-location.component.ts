import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DriverClass } from '../models/driver';
import { LocationClass } from '../models/location';
import { AddLocationComponent } from '../add-location/add-location.component';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.css'],
  providers: [AddLocationComponent]
})
export class ChangeLocationComponent implements OnInit {

  Username : string;
  UserId: number;
  Driver : DriverClass;
  OldUsername : string;
  Location : LocationClass;
  LocationId: number;
  locations: LocationClass[];


  constructor(private httpClient: HttpClient, private route : Router, private locationComponent : AddLocationComponent) { }

  getLocations()
  {
    this.locationComponent.getAllLocations().subscribe(s => this.locations = s);
  }

  getUser(username){
    let params: HttpParams = new HttpParams()
    .set('username', username);
    let driver = this.httpClient.get("http://localhost:51680/api/Driver/GetDriver/"+username).subscribe(
      res => {        
        this.Driver = res as DriverClass;
      }
    )
  }

  ngOnInit() {
    this.Username = localStorage.getItem("username");
    this.getLocations();
    this.getUser(localStorage.getItem("username"));
  }

  onSubmit(){       
    let user = this.httpClient.get("http://localhost:51680/api/Driver/ChangeLocation/"+this.Username + `/` + this.LocationId).subscribe(
      res => {  
        console.log("Successfully changed location!")           
      },
      error => 
      {
        alert("Location not changed." + error.error.Message)  
      });
  }
}
