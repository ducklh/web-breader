export class Entities {

  private _entitiesId: string;
  private _inDate: String;
  private _outDate: string;
  private _status: string;
  private _weight: string;
  private _isDelete: boolean;
  private _cage: string

  constructor(entitiesId: string, inDate: String, outDate: string, status: string, weight: string, isDelete: boolean, cage: string) {
    this._entitiesId = entitiesId;
    this._inDate = inDate;
    this._outDate = outDate;
    this._status = status;
    this._weight = weight;
    this._isDelete = isDelete;
    this._cage = cage;
  }

  get entitiesId(): string {
    return this._entitiesId;
  }

  set entitiesId(value: string) {
    this._entitiesId = value;
  }

  get inDate(): String {
    return this._inDate;
  }

  set inDate(value: String) {
    this._inDate = value;
  }

  get outDate(): string {
    return this._outDate;
  }

  set outDate(value: string) {
    this._outDate = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get weight(): string {
    return this._weight;
  }

  set weight(value: string) {
    this._weight = value;
  }

  get isDelete(): boolean {
    return this._isDelete;
  }

  set isDelete(value: boolean) {
    this._isDelete = value;
  }

  get cage(): string {
    return this._cage;
  }

  set cage(value: string) {
    this._cage = value;

  }
}
