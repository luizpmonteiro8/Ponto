import { Address } from './address';
import { Job } from './job';

export class Employee {
  constructor(
    public id: number,
    public name: string,
    public salary: number,
    public cpf: string,
    public job: Job,
    public address: Address,
  ) {}
}
