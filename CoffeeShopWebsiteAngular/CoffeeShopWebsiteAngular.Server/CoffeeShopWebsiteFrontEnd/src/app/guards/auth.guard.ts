import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean{
    //guard to check if the user is logged in
    if (this.authService.isLoggedIn()) {
     // console.log("auth.guard.ts is true, will re-route now")
     // this.router.navigate(['/customer-info']);
      return true;
    }
    //can also check if there is a token for user
    else if (this.authService.getToken() != null) {
      return true;
    }

    else {
    //  console.log("auth.guard.ts is false, will stay on login")
     // this.router.navigate(['/login']);
      return false;
    }
  }
}
