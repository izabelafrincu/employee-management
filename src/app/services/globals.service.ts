import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {
  public user: any;
  public employees: any[] = [];

  constructor() {
  }

  setUser(user): void {
    this.user = user;
  }
}
