import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobOfferSecretAccessTokenGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = route.paramMap.get('jobOfferSecretAccessToken');

    if (this.isValidToken(token)) {
      console.log(token);
      return true;
    } else {
      // redirect to an error page, or make other appropriate response
      this.router.navigate(['unauthorized']);
      console.log(token)
      return false;
    }
  }

  private isValidToken(token: string | null): boolean {
    if (!token) {
      return false;
    }

    // We want the special token to be at least 16 characters long, contain at least 6 numbers and one special character.
    const hasValidLength = token.length >= 16;
    const hasNumbers = (token.match(/\d/g) || []).length >= 6;
    const hasSpecialCharacter = /[!,=%$]/.test(token);

    return hasValidLength && hasNumbers && hasSpecialCharacter;
  }
}
