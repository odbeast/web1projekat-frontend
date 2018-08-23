export class CommentClass{
    
    Description : string;
    Date: Date;
    Grade : number;
    CustomerId : number;
    DriveId : number;

    constructor (description: string, 
        date: Date,
        grade : number,
        customerId : number,
        driveId : number) 
    {
        this.Description = description;
        this.Date = date;
        this.Grade = grade;
        this.CustomerId = customerId;
        this.DriveId = driveId;
    }
}