import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() {
  }

  checkName(name)         { return name ?     true : false }
  checkLogin(login)       { return login ?    true : false }
  checkEmail(email)       { return email ?    true : false }
  checkPassword(password) { return password ? true : false }
}
