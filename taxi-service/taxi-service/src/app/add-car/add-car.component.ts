import { Component, OnInit } from '@angular/core';
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

  constructor(private route : Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  getAllCars() : Observable<any>
  { 
    return this.httpClient.get('http://localhost:51680/api/Car/GetCars');
  }

  onSubmitAdd(){
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers.append('enctype','multipart/form-data');

    let car = new CarClass(this.CarYear,this.TaxiNumber,this.Registration,TypeOfCar[this.CarType]);

    let fd = new FormData();                 
    fd.append('car',JSON.stringify(car));          
    
      let y = this.httpClient.post(`http://localhost:51680/api/Car/AddCar`, fd.get('car') , {"headers": headers});
      y.subscribe(
      res => {  
        console.log("Car added successfuly!")           
      },
      error => 
      {
        alert("Car not added." + error.error.Message)  
      });
}

}
