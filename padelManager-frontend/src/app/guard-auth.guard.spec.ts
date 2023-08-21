import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { guardAuthGuard } from './guard-auth.guard';
import { AuthService } from './login/auth-service.service';

describe('guardAuthGuard', () => {
  let guard: guardAuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [guardAuthGuard, AuthService]
    });
    guard = TestBed.inject(guardAuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(true);
  });

  it('should redirect to unauthorized page when user is not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/unauthorized']);
  });
});
