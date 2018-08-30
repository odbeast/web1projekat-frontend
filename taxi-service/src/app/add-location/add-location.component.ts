import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationClass } from '../models/location';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  LocationX : number;
  LocationY : number;
  HouseNumber : string;
  PostalCode : string;
  Street : string;
  City : string;
  @ViewChild("f") myForm;

  constructor(private route : Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  getAllLocations() : Observable<any>
  { 
    return this.httpClient.get('http://localhost:51680/api/Location/GetLocations');
  }

  onSubmitAdd(){
    if(this.LocationX == undefined ||
      this.LocationY == undefined ||
      this.HouseNumber == "" ||
      this.PostalCode == "" ||
      this.Street == "" ||
      this.City == "")
      {
        alert("Some required fields are empty."); 
      }
      else
      { 
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
        headers.append('enctype','multipart/form-data');

        let location = new LocationClass(this.LocationX,this.LocationY, this.HouseNumber,this.PostalCode,this.Street,this.City);

        let fd = new FormData();                 
        fd.append('location',JSON.stringify(location));          
        
          let y = this.httpClient.post(`http://localhost:51680/api/Location/AddLocation`, fd.get('location') , {"headers": headers});
          y.subscribe(
          res => {  
            console.log("Successfully added location!") ;
            this.myForm.reset();          
          },
          error => 
          {
            alert("Location not added." + error.error.Message)  
          });
        }
    }
}
