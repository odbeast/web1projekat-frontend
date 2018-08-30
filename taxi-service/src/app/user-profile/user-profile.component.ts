import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';

enum DriveType {
  Single,
  Multiple,
}

enum Gender {
  Male,
  Female,
}

enum Role {
  Customer,
  Admin,
  Driver,
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  Username : string;
  Password : string;
  FullName: string;
  Email : string;
  ConfirmPassword: string;
  Role: string;
  ContactNumber : string;
  Gender: string;
  DriveType: string;
  SSN : string;
  UserId: number;
  User : User;
  OldUsername : string;

  constructor(private httpClient: HttpClient, private route : Router) { }
  
  getUser(username){
    let params: HttpParams = new HttpParams()
    .set('username', username);
    let userId = this.httpClient.get("http://localhost:51680/api/AppUser/GetUser/"+username).subscribe(
      res => {        
        this.UserId = res as number;
        let user = this.httpClient.get("http://localhost:51680/api/AppUser/GetUserById/"+this.UserId).subscribe(
          res => {        
            this.User = res as User;
            this.Username = username;
            this.FullName = this.User.FullName;
            this.Email = this.User.Email;
            this.Password = this.User.Password;
            this.ConfirmPassword = this.User.ConfirmPassword;
            this.ContactNumber = this.User.ContactNumber;
            this.Role = Role[this.User.Role];
            this.Gender = Gender[this.User.Gender];
            this.DriveType = DriveType[this.User.DriveType];
            this.SSN = this.User.SSN;
          })
      }
    )
  }

  ngOnInit() {
    this.getUser(localStorage.getItem("username"));
  }

  onSubmit(){  
    if(this.Username == "" ||
    this.Password == "" ||
    this. FullName == "" ||
    this.SSN == "" ||
    this.Email == "" ||
    this.ConfirmPassword == "" ||
    this.Role == "" ||
    this.ContactNumber == "" ||
    this.Gender == "" ||
    this.DriveType == "")
    {
      alert("Some required fields are empty."); 
    }   
    else
    {
      let headers = new HttpHeaders();
      let user = new User(this.Username,this.Email,this.FullName,this.Role,this.SSN, this.Password,this.ConfirmPassword, this.Gender, this.DriveType, this.ContactNumber);
      this.httpClient.post("http://localhost:51680/api/AppUser/ChangeUser", user,  {"headers": headers}).subscribe(
      res => {  
        localStorage.setItem("username", this.Username);
        console.log("Successfully changed user!") 
        this.route.navigate(['/home'])         
      },
      error => 
      {
        alert("User not changed." + error.error.Message)  
      });
    }
  }
}
