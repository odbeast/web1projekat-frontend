import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';


@Injectable()//This must be here, if we want to inject authService!
export class IsNotAdminGuard implements CanActivate{
    
    constructor(private nabar: NavbarComponent){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return !this.nabar.IsAdmin();
    }
}