import { Component, OnInit } from '@angular/core';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { DriveClass } from '../models/drive';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommentClass } from '../models/comment';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';

@Component({
  selector: 'app-show-own-drives',
  templateUrl: './show-own-drives.component.html',
  styleUrls: ['./show-own-drives.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent, AddCommentComponent, ChangeStatusComponent]
})
export class ShowOwnDrivesComponent implements OnInit {

  drives : DriveClass[];
  comment : CommentClass;

  constructor(private commentComponent : AddCommentComponent, private httpClient: HttpClient,private driveComponent : AddDriveComponent) { }
  
  ngOnInit() {
    this.comment = new CommentClass("",null,null,null);
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
    return this.httpClient.get("http://localhost:51680/api/Drive/GetAdminDrives/"+username);
  } 

  sameId(id : number) : boolean
  {
    if(this.comment.DriveId == id)
    return true;
  }

  ShowComment(Id : number)
  {
    let com = this.commentComponent.getComment(Id);
    com.subscribe(
      res => {        
        if (res.length != 0)
        {
          this.comment = res as CommentClass;
          this.comment.Description = res[0].Description
          this.comment.Date = res[0].Date;
          this.comment.Grade = res[0].Grade;
          this.comment.DriveId = res[0].DriveId;
        } 
        else
        {
          alert("No Comment")
        }   
      });   
  }
}