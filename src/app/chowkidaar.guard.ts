import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChowkidaarGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      if (route.routeConfig.path == 'login') {
        alert('Already Logged in.');
        this.router.navigate(['/homepage']);
        return false;
      } else if (route.routeConfig.path == 'signup') {
        alert('Logout to register');
        this.router.navigate(['/homepage']);
        return false;
      }
      return true;
    } else {
      if (route.routeConfig.path == 'signup' || route.routeConfig.path == "login") return true;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
