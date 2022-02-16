export class Address {
  constructor(
    public id: number,
    public zipcode: string,
    public street: string,
    public number: string,
    public district: string,
    public city: string,
    public state: string,
  ) {}
}
