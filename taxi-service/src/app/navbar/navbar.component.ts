import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Taxi Service';

  constructor(private localStorageService : LocalStorageService) { }
  username: string;
  role: string;

  ngOnInit() {
  }

  IsLoggedIn() : boolean {

    this.username = localStorage.getItem("username");
    return this.localStorageService.IsLoggedIn();
  }

  IsAdmin() : boolean {
    this.role = localStorage.getItem("role");
    return this.localStorageService.isAdmin();
  }

  IsDriver() : boolean {
    this.role = localStorage.getItem("role");
    return this.localStorageService.isDriver();
  }

  IsCustomer() : boolean {
    this.role = localStorage.getItem("role");
    return this.localStorageService.isCustomer();
  }

  IsNotDriver() : boolean {
    this.role = localStorage.getItem("role");
    return this.localStorageService.IsNotDriver();
  }

}
