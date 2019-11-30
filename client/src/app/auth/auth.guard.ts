import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.tokenExpired()) {
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
