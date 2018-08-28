import { Component, OnInit } from '@angular/core';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { DriveClass } from '../models/drive';
import { CommentClass } from '../models/comment';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';

@Component({
  selector: 'app-show-drives',
  templateUrl: './show-drives.component.html',
  styleUrls: ['./show-drives.component.css'],
  providers: [AddDriveComponent, AddCommentComponent, ChangeStatusComponent]
})
export class ShowDrivesComponent implements OnInit {

  drives : DriveClass[];
  comment : CommentClass;

  constructor(private commentComponent : AddCommentComponent,private driveComponent : AddDriveComponent) { }
  
  ngOnInit() {
    this.getDrives();
    this.comment = new CommentClass("",null,null,null);
  }

  getDrives()
  {
    return this.driveComponent.getAllDrives().subscribe(u => this.drives = u)
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
        this.comment = res as CommentClass;
        this.comment.Description = res[0].Description
        this.comment.Date = res[0].Date;
        this.comment.Grade = res[0].Grade;
        this.comment.DriveId = res[0].DriveId;
      });   
  }
}
