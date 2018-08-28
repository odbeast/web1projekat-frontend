import { Component, OnInit } from '@angular/core';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { DriveClass } from '../models/drive';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentClass } from '../models/comment';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriveComponent, AddDriverComponent, AddCarComponent, ChangeStatusComponent]
})
export class AddCommentComponent implements OnInit {

  Description : string;
  Date: Date;
  Grade : number;
  CustomerId : number;
  DriveId : number;
  Drive: DriveClass;
  static ChangeStatusComponent: any;

  constructor(private changeStatusComponent: ChangeStatusComponent,private route : Router,private httpClient : HttpClient ,private driveComponent : AddDriveComponent) { }

  ngOnInit() {
    this.DriveId = ChangeStatusComponent.DriveId;
    this.getDriveById();;
  }

  getDriveById()
  {
      let driveTmp = this.httpClient.get("http://localhost:51680/api/Drive/GetDriveById/"+this.DriveId).subscribe(
        res => {        
          this.Drive = res as DriveClass;
        }
      )
  } 

  getComment(id : number) : Observable<any>
  {
    return this.httpClient.get('http://localhost:51680/api/Comment/GetComment/' + id);
  }

  onSubmitAdd(){
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers.append('enctype','multipart/form-data');

    let comment = new CommentClass(this.Description,this.Date,this.Grade,this.DriveId);

    let fd = new FormData();                 
    fd.append('comment',JSON.stringify(comment));          
    
      let y = this.httpClient.post(`http://localhost:51680/api/Comment/AddComment`, fd.get('comment') , {"headers": headers});
      y.subscribe(
      res => {  
        console.log("Successfully added comment!") 
        this.route.navigate(['/home'])          
      },
      error => 
      {
        alert("Comment not added." + error.error.Message)  
      });
}

}
