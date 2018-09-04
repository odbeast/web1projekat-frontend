import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddCarComponent } from '../add-car/add-car.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NavbarComponent, AddLocationComponent, AddDriverComponent, AddCarComponent]
})
export class HomeComponent implements OnInit {

  role: string;
  constructor(private navbar : NavbarComponent) { }

  ngOnInit() {
  }

  IsAdmin() {
    return this.navbar.IsAdmin();
  }

  IsDriver() {
    return this.navbar.IsDriver();
  }

  IsCustomer() {
    return this.navbar.IsCustomer();
  }
}
