import { Employee } from './employee';

export class Entry {
  constructor(
    public id: number,
    public type: string,
    public dateTime: Date,
    public obs: string,
    public employee: Employee,
    public buildingId: number,
  ) {}
}
