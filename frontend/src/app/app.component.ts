import { Component } from '@angular/core';
import {AuthService} from '../app/modules/Auth/http/auth.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'FaultAssist';
  subscription: Subscription;
  showNavbar: boolean = true;
  constructor(private authService:AuthService){
    this.subscription = this.authService.onToggle().subscribe((value) =>(this.showNavbar = value))
  }
  
  toggleHide(){
    this.authService.toggleShow();
  }

}
