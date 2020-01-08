
import { UserService } from './user.service';

import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UowService {
  users = new UserService();
  constructor() { }
}
