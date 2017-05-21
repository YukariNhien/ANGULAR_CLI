import { Cookie } from 'ng2-cookies';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ClientService} from './app.service';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private server:ClientService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (Cookie.check(this.server.key)){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}