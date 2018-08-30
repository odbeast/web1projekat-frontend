export class LocationClass{
    
    Id : number;
    CooridateX : number;
    CooridateY: number;
    HouseNumber : string;
    PostalCode: string;
    Street : string;
    City : string;   

    constructor (
            cooridateX: number, 
            cooridateY: number,
            houseNumber: string, 
            postalCode: string,
            street : string,
            city : string)
    {
        this.CooridateX = cooridateX;
        this.CooridateY = cooridateY;
        this.HouseNumber = houseNumber;
        this.PostalCode = postalCode;
        this.Street = street;
        this.City = city;
    }
}