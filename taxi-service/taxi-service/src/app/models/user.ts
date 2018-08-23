import { LocationClass } from "./location";
import { CarClass } from "./car";

export class User{
    
    Username : string;
    Email: string;
    FullName : string;
    Role : string;
    SSN : string;
    Password : string;
    ConfirmPassword: string;
    Gender: string;
    DriveType : string;
    ContactNumber: string;

    constructor (
                 username: string, 
                 email: string,
                 fullname : string,
                 role : string,    
                 ssn : string,
                 password: string,
                 confPassword: string,
                 gender: string,
                 driveType : string,
                 contactNumber : string) {
        this.SSN = ssn;
        this.Username = username;
        this.Password = password;
        this.Role = role;
        this.Email = email;
        this.ConfirmPassword = confPassword;
        this.Gender = gender;
        this.FullName = fullname;
        this.DriveType = driveType;
        this.ContactNumber = contactNumber;
    }
}