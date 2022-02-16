import { Address } from './address';
import { Employee } from './employee';

export class Building {
  constructor(
    public id: number,
    public name: string,
    public status: boolean,
    public address: Address,
    public employeeList: Employee[],
  ) {}
}
