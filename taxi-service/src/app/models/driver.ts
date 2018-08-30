import { User } from "./user";

export class DriverClass extends User{
    
    LocationId: number;
    CarId : number;
    PasswordLogin : string;
    Available : boolean;

    constructor (username: string, 
                email: string,
                fullname : string,
                role : string,    
                ssn : string,
                password: string,
                confPassword: string,
                passwordLogin : string,
                gender: string,
                driveType : string,
                contactNumber : string,
                locationId : number,
                carId : number,
                available : boolean) {
            super(username,email,fullname,role,ssn,password,confPassword,gender,driveType,contactNumber);
            this.LocationId = locationId;
            this.CarId = carId;
            this.PasswordLogin = passwordLogin;
            this.Available = available;
        }
    }