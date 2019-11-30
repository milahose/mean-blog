import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class NotAuthGuard implements CanActivate {

  redirectUrl;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.tokenExpired()) {
      this.router.navigate(['/blog']);
      return false;
    }

    return true;
  }
}
