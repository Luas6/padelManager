import { Component } from '@angular/core';
import { AuthService } from './login/auth-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'padelManager-frontend';
  isLoggedIn$: BehaviorSubject<boolean>;
  constructor(private authService: AuthService,
    private router: Router) {
      this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
     }
    
  ngOnInit(): void {
    this.isLoggedIn$.next(this.authService.isLoggedIn()); // Verifica si la sesión está iniciada

    this.authService.isLoggedInChange$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn$.next(isLoggedIn);
      // Aquí puedes ejecutar cualquier código que desees cuando isLoggedIn cambie.
    });


  }
}
