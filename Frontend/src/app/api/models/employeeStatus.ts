import { Address } from './address';
import { Job } from './job';

export class EmployeeStatus {
  constructor(
    public id: number,
    public name: string,
    public salary: number,
    public cpf: string,
    public job: Job,
    public address: Address,
    public status: boolean,
    public buildingEmployeeId: number,
  ) {}
}
