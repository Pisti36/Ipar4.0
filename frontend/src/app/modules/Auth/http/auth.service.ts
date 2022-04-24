import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  showNavbar: boolean = true;
  subject = new Subject<any>();

  constructor() { }

  toggleShow():void{
    console.log("function works!")
    this.showNavbar = !this.showNavbar
    this.subject.next(this.showNavbar)
  }

  onToggle(): Observable<any>{
    return this.subject.asObservable();
  }
}
