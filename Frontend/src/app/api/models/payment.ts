import { Employee } from './employee';
import { Building } from './building';

export class Payment {
  constructor(
    public id: number,
    public dayOfPayment: Date,
    public totalSalary: number,
    public building: Building,
    public paymentItem: PaymentItem[],
  ) {}
}

export class PaymentItem {
  constructor(
    public id: number,
    public absentDay: number,
    public totalWithDiscont: number,
    public employee: Employee,
  ) {}
}
