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
  isAdmin$: BehaviorSubject<boolean>;
  constructor(private authService: AuthService) {
      this.isLoggedIn$ = new BehaviorSubject<boolean>(this.authService.isLoggedIn());
      this.isAdmin$ = new BehaviorSubject<boolean>(this.authService.isAdmin());
     }
    
  ngOnInit(): void {
    this.isLoggedIn$.next(this.authService.isLoggedIn());
    this.isAdmin$.next(this.authService.isAdmin());

    this.authService.isLoggedInChange$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn$.next(isLoggedIn);
    });
    this.authService.isAdminChange$.subscribe((isAdmin: boolean) => {
      this.isAdmin$.next(isAdmin);

    });


  }
}
