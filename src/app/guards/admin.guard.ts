import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.authService.token;
    const decodedToken = token ? this.authService.jwtHelper.decodeToken(token) : null;
    if (decodedToken && decodedToken.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
