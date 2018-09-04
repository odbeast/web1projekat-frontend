import { Component, OnInit } from '@angular/core';
import { DriveClass } from '../models/drive';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommentClass } from '../models/comment';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent,AddCommentComponent, ChangeStatusComponent]
})
export class SortComponent implements OnInit {

  drives : DriveClass[];
  comment : CommentClass;

  constructor(private commentComponent : AddCommentComponent,private httpClient: HttpClient,private driveComponent : AddDriveComponent) { }

  ngOnInit() {
    this.comment = new CommentClass("",null,null,null,null);
    this.getDrives();
  }

  sortByDate()
  {
    return this.httpClient.get("http://localhost:51680/api/Drive/SortByDate/");
  } 

  sortByGrade()
  {
    return this.httpClient.get("http://localhost:51680/api/Drive/SortByGrade/");
  } 

  getDrives()
  {
    return this.driveComponent.getAllDrives().subscribe(u => this.drives = u)
  } 

  onSubmitSortByDate(){
    let driveData = this.sortByDate();
     driveData.subscribe(
       res => {        
         this.drives = res as DriveClass[];
       },
       error => 
       {
         alert("There are no drives with selected date." + error.error.Message)  
       });
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
          this.comment.CustomerId = res[0].CustomerId;
        } 
        else
        {
          alert("No Comment")
        }   
       });   
   }

   onSubmitSortByGrade(){
   let driveData = this.sortByGrade();
    driveData.subscribe(
      res => {        
        this.drives = res as DriveClass[];
      },
      error => 
      {
        alert("There are no drives with selected grade." + error.error.Message)  
      });
  }
}
