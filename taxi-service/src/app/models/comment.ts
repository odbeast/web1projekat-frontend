export class CommentClass{
    
    Description : string;
    Date: Date;
    Grade : number;
    CustomerId : number;
    DriveId : number;

    constructor (description: string, 
        date: Date,
        grade : number,
        driveId : number,
        customerId : number) 
    {
        this.Description = description;
        this.Date = date;
        this.Grade = grade;
        this.DriveId = driveId;
        this.CustomerId = customerId;
    }
}