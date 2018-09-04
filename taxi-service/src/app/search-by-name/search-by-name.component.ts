import { Component, OnInit } from '@angular/core';
import { DriveClass } from '../models/drive';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { HttpClient } from '@angular/common/http';
import { CommentClass } from '../models/comment';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent, AddCommentComponent, ChangeStatusComponent]
})
export class SearchByNameComponent implements OnInit {

  FirstName : string;
  LastName : string;
  drives : DriveClass[];
  comment : CommentClass;

  constructor(private commentComponent : AddCommentComponent, private httpClient: HttpClient,private driveComponent : AddDriveComponent) { }

  ngOnInit() {
    this.comment = new CommentClass("",null,null,null,null);
  }

  searchByName()
  {
    if (this.FirstName == undefined || this.FirstName == "")
      this.FirstName = "undefined"

      if (this.LastName == undefined || this.LastName == "")
      this.LastName = "undefined"

      if(this.FirstName == undefined && this.LastName == undefined)
      {
        alert("Some required fields are empty."); 
      }
      else
      {
          return this.httpClient.get("http://localhost:51680/api/Drive/SearchByName/" + this.FirstName + `/` + this.LastName);
      }
  } 

  onSubmitSearchByName(){
    let driveData = this.searchByName();
     driveData.subscribe(
       res => {        
         this.drives = res as DriveClass[];
       },
       error => 
       {
         alert("There are no drives with selected name." + error.error.Message)  
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
}
