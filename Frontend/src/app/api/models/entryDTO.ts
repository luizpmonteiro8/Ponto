export class EntryDTO {
  constructor(
    public id: number,
    public type: string,
    public dateTime: Date,
    public obs: string,
    public employeeId: number,
    public buildingId: number,
  ) {}
}
