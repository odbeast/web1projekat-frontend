import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarClass } from '../models/car';

enum TypeOfCar {
  None,
  PassengerCar,
  Van,
}

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  CarYear : number;
  TaxiNumber: number;
  Registration : string;
  CarType : string;
  @ViewChild("f") myForm;

  constructor(private route : Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  getAllCars() : Observable<any>
  { 
    return this.httpClient.get('http://localhost:51680/api/Car/GetCars');
  }

  onSubmitAdd(){
    if(this.CarYear == undefined ||
      this.TaxiNumber == undefined ||
      this.Registration == "" ||
      this.CarType == "")
    {
      alert("Some required fields are empty."); 
    }
    else
    {
      let headers = new HttpHeaders();
      headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
      headers.append('enctype','multipart/form-data');

      let car = new CarClass(this.CarYear,this.TaxiNumber,this.Registration,this.CarType);

      let fd = new FormData();                 
      fd.append('car',JSON.stringify(car));          
      
        let y = this.httpClient.post(`http://localhost:51680/api/Car/AddCar`, fd.get('car') , {"headers": headers});
        y.subscribe(
        res => {  
          console.log("Car added successfuly!");  
          this.myForm.reset();
        },
        error => 
        {
          alert("Car not added." + error.error.Message);  
        });
      }
  }
}
