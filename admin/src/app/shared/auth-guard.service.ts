import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServerService } from './auth.server.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Settings } from './settings';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private authServerService: AuthServerService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (localStorage.getItem('LineToken')) {
         return  this.authServerService.checkGuardToken(localStorage.getItem('LineToken')).pipe(
          map((data: Response) => { if (data) {return true; } else { return false; } } )
         , catchError(e => {
          if (e) {
            window.location.replace(environment.serverURL + '/auth/lineLoginPageAdmin');
              return throwError(e);
          }
      })
      );
        } else {
          this.router.navigate(['/']);
        }
}
}
