enum TypeOfCar {
    None,
    PassengerCar,
    Van,
  }

export class CarClass{
    
    Id : number;
    CarYear : number;
    TaxiNumber: number;
    Registration : string;
    CarType : string;

    constructor (year: number, 
        taxiNumber: number,
        registration : string,
        type : string) 
    {
        this.CarYear = year;
        this.TaxiNumber = taxiNumber;
        this.Registration = registration;
        this.CarType = type;
    }
}