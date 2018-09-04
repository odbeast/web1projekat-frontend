import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddLocationComponent } from '../add-location/add-location.component';
import { DriverClass } from '../models/driver';
import { LocationClass } from '../models/location';
import { DriveClass } from '../models/drive';
import { Router } from '@angular/router'; 
import { User } from '../models/user';
import { HttpParams } from '@angular/common/http';

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
  selector: 'app-take-a-taxi',
  templateUrl: './take-a-taxi.component.html',
  styleUrls: ['./take-a-taxi.component.css'],
  providers: [AddLocationComponent]
})
export class TakeATaxiComponent implements OnInit {

  Date : Date;
  CarType: string;
  Price : number;
  Status : string;
  OriginId : number;
  DestinationId : number;
  AdminId : number;
  DriverId : number;
  CustomerId: number;
  Customer : User;
  Driver : DriverClass;
  drivers: DriverClass[];
  locations: LocationClass[];
  @ViewChild("f") myForm;

  constructor(private locationComponent : AddLocationComponent, private route : Router, private httpClient: HttpClient) { }

  getLocations()
  {
    this.locationComponent.getAllLocations().subscribe(s => this.locations = s);
  }

  getUser(username){
    let params: HttpParams = new HttpParams()
    .set('username', username);
    let userId = this.httpClient.get("http://localhost:51680/api/AppUser/GetUser/"+username).subscribe(
      res => {        
        this.CustomerId = res as number;
      }
    )
  }


  ngOnInit() {
    this.getLocations();
    this.getUser(localStorage.getItem("username"));
  }

  onSubmit(){
    if(this.CarType == "" ||
      this.OriginId == undefined)
      {
        alert("Some required fields are empty."); 
      }
      else
      {   
        let drive;
        this.Status = RideStatus[0];
        drive = new DriveClass(this.Date,this.CarType,0,this.Status,this.OriginId,this.DestinationId,null,null,this.CustomerId);

        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
        headers.append('enctype','multipart/form-data');

        let fd = new FormData();                 
        fd.append('drive',JSON.stringify(drive));          
        
          let y = this.httpClient.post(`http://localhost:51680/api/Drive/AddDrive`, fd.get('drive') , {"headers": headers});
          y.subscribe(
          res => {  
            console.log("Successfully added drive!");
            this.route.navigate(['/home'])     
          },
          error => 
          {
            alert("Drive not added." + error.error.Message)  
          });
    }
  }
}
