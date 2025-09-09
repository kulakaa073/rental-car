import type { Brands } from './brands';

export interface Car {
  id: string;
  year: number;
  brand: Brands;
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
