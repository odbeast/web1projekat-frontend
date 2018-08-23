import { Component, OnInit } from '@angular/core';
import { AddDriveComponent } from '../add-drive/add-drive.component';
import { DriveClass } from '../models/drive';

@Component({
  selector: 'app-show-drives',
  templateUrl: './show-drives.component.html',
  styleUrls: ['./show-drives.component.css'],
  providers: [AddDriveComponent]
})
export class ShowDrivesComponent implements OnInit {

  drives : DriveClass[];

  constructor(private driveComponent : AddDriveComponent) { }
  
  ngOnInit() {
    this.getDrives();
  }

  getDrives()
  {
    return this.driveComponent.getAllDrives().subscribe(u => this.drives = u)
  } 
}
