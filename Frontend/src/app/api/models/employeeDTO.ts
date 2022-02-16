import { Address } from './address';

export class EmployeeDTO {
  constructor(
    public id: number,
    public name: string,
    public salary: number,
    public cpf: string,
    public jobId: number,
    public address: Address,
  ) {}
}
