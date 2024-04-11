import { CanActivate, Router } from '@angular/router';
import { AuthService } from './login/auth-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class guardAdminGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean{
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin()) {
      this.router.navigate(['/no-autorizado']);
      return false;
    }
    return true;
  }
};

