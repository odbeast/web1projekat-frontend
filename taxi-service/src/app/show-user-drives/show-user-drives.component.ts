import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DriveClass } from '../models/drive';
import { CommentClass } from '../models/comment';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-user-drives',
  templateUrl: './show-user-drives.component.html',
  styleUrls: ['./show-user-drives.component.css'],
  providers: [AddDriveComponent, AddLocationComponent, AddDriverComponent, AddCarComponent, AddCommentComponent, ChangeStatusComponent]
})
export class ShowUserDrivesComponent implements OnInit {

  drives : DriveClass[];
  comment : CommentClass;
  drive : DriveClass;

  constructor(private httpClient: HttpClient,private commentComponent : AddCommentComponent, private route : Router) { }

  getDrives(username)
  {
    let params: HttpParams = new HttpParams()
    .set('username', username);
    return this.httpClient.get("http://localhost:51680/api/AppUser/GetUserDrives/"+username);
  } 

  ngOnInit() {
    this.comment = new CommentClass("",null,null,null,null);
    let driveData = this.getDrives(localStorage.getItem("username"));
    driveData.subscribe(
      res => {        
        this.drives = res as DriveClass[];
      }
    )
  }

  CancelDrive(customerId : number, driveId : number)
  {
    let drive = this.httpClient.get("http://localhost:51680/api/Drive/GetDriveById/"+driveId).subscribe(
      res =>
      {
        let s = res[0].Status;
        if(s == "Canceled")
        {
          alert("Cannot cancel drive that has status other than Created!")
        }
        else
        {
          if(s == "Created")
          {
            ChangeStatusComponent.DriveId = driveId;
            let userId = this.httpClient.get("http://localhost:51680/api/AppUser/CancelDrive/"+customerId +`/` + driveId).subscribe(
              res => {        
                  console.log("Status changed!");
                    this.route.navigate(['/add-comment'])
              });
          }
          else
          {
            alert("Cannot cancel drive that has status other than Created!")
          }
        }
      })
  }
}
