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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent, AddCommentComponent, ChangeStatusComponent]
})
export class SearchComponent implements OnInit {

  constructor(private commentComponent : AddCommentComponent,private httpClient: HttpClient,private driveComponent : AddDriveComponent) { }

  Date1 : Date;
  Date2 : Date;
  Grade1 : number;
  Grade2 : number;
  Price1 : number;
  Price2 : number;
  drives : DriveClass[];
  comment : CommentClass;
  
  ngOnInit() {
    this.comment = new CommentClass("",null,null,null,null);
  }

  searchByDate()
  {
    return this.httpClient.get("http://localhost:51680/api/Drive/SearchByDate/"+this.Date1 + `/` + this.Date2);
  } 

  searchByGrade()
  {
    return this.httpClient.get("http://localhost:51680/api/Drive/SearchByGrade/"+this.Grade1 + `/` + this.Grade2);
  } 

  searchByPrice()
  {
    return this.httpClient.get("http://localhost:51680/api/Drive/SearchByPrice/"+this.Price1 + `/` + this.Price2);
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

  onSubmitSearchByDate(){
    if(this.Date1 == undefined ||
      this.Date2 == undefined)
      {
        alert("Some required fields are empty."); 
      }
      else
      {   
        let driveData = this.searchByDate();
        driveData.subscribe(
          res => {        
            this.drives = res as DriveClass[];
          },
          error => 
          {
            alert("There are no drives with selected date." + error.error.Message)  
          });
      }
   }

  onSubmitSearchByGrade(){
    if(this.Grade1 == undefined &&
      this.Grade2 == undefined)
      {
        alert("Some required fields are empty."); 
      }
      else
      {   
        if(this.Grade1 == undefined)
        {
          this.Grade1 = -1;
        }
        if(this.Grade2 == undefined)
        {
          this.Grade2 = -1;
        }
        let driveData = this.searchByGrade();
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

  onSubmitSearchByPrice(){
    if(this.Price1 == undefined &&
    this.Price2 == undefined)
    {
      alert("Some required fields are empty."); 
    }
    else
    {   
        if(this.Price1 == undefined)
        {
          this.Price1 = -1;
        }
        if(this.Price2 == undefined)
        {
          this.Price2 = -1;
        }
      let driveData = this.searchByPrice();
      driveData.subscribe(
        res => {        
          this.drives = res as DriveClass[];
        },
        error => 
        {
          alert("There are no drives with selected price." + error.error.Message)  
        });
      }
   }
}
