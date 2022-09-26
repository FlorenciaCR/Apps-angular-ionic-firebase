import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public ruteo: Router, public authService: AuthService) {}

  logout(){
    this.authService.logout();
    this.ruteo.navigateByUrl('login');
  }

}
