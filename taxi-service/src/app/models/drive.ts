import { CommentClass } from "./comment";

enum RideStatus {
    Created = 0,
    Canceled,
    Formed,
    Processed,
    Accepted,
    Unsuccessfull,
    Successfull,
  }
  

export class DriveClass{
    
    Id : number;
    Date : Date;
    CarType: string;
    Price : number;
    Status : string;
    OriginId : number;
    DestinationId : number;
    AdminId : number;
    DriverId : number;
    CustomerId : number;


    constructor (date: Date, 
        carType: string,
        price : number,
        status : string,
        originId : number,
        destinationId : number,
        adminId : number,
        driverId : number,
        customerId : number) 
    {
        this.Date = date;
        this.CarType = carType;
        this.Price = price;
        this.Status = status;
        this.OriginId = originId;
        this.DestinationId = destinationId;
        this.AdminId = adminId;
        this.DriverId = driverId;
        this.CustomerId = customerId;
    }
}