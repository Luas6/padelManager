import { Component } from '@angular/core';
import { AuthService } from './login/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'padelManager-frontend';
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService,
    private router: Router) { }
    
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); // Verifica si la sesión está iniciada
  }
}
