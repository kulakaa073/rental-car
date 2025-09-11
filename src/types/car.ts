export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: Array<string>;
  functionalities: Array<string>;
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: Array<string>;
  mileage: number;
}
