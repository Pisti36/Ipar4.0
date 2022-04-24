import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../http/auth.service'
import {AppComponent} from '../../../../app.component'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  subscription: Subscription;
  showNavbar: boolean;
  constructor(private authService:AuthService, private appComponent:AppComponent) {
    this.subscription = this.authService.onToggle().subscribe((value) =>(this.showNavbar = value))
  }

  ToggleShow(){
    this.authService.toggleShow();
  }

  ngOnInit(): void {
  }

}
