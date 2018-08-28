import { CommentClass } from "./comment";

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


    constructor (date: Date, 
        carType: string,
        price : number,
        status : string,
        originId : number,
        destinationId : number,
        adminId : number,
        driverId : number) 
    {
        this.Date = date;
        this.CarType = carType;
        this.Price = price;
        this.Status = status;
        this.OriginId = originId;
        this.DestinationId = destinationId;
        this.AdminId = adminId;
        this.DriverId = driverId;
    }
}