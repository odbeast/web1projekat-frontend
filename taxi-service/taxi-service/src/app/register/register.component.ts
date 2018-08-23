import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from '../register.service';
import { User } from "../models/user";
import { Router } from '@angular/router'; 

enum TypeOfCar {
  None,
  PassengerCar,
  Van,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Username : string;
  Password : string;
  FullName: string;
  SSN: string;
  Email : string;
  ConfirmPassword: string;
  Role: string;
  ContactNumber : string;
  Gender: string;
  DriveType: string;

  constructor(private userService : UserRegisterService, private route : Router) { }

  ngOnInit() {
  }

  onSubmitRegister(){
    this.userService.register(new User(this.Username,this.Email,this.FullName,this.Role,this.SSN,this.Password,this.ConfirmPassword, this.Gender, this.DriveType, this.ContactNumber))
    .subscribe(
      o=>{
        alert("Register successful. Please log in.")
        this.route.navigate(['/login'])
      },
      error => 
      {
        alert("Register unsuccessful." + error.error.Message)
      });
  }
}
