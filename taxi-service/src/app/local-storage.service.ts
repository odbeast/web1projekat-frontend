import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  IsLoggedIn() : boolean {
    if (localStorage.getItem("username") !== null)
    {
        return true;
    }
    
    return false;
  }

  isAdmin() : boolean {
    if ( localStorage.getItem("role") == "Admin")
    {
        return true;
    }

    return false;
}

isDriver() : boolean {
    if ( localStorage.getItem("role") == "Driver")
    {
        return true;
    }

    return false;
}

isCustomer() : boolean {
    if ( localStorage.getItem("role") == "Customer")
    {
        return true;
    }

    return false;
  }
}
