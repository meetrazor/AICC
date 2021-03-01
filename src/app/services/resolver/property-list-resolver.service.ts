import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyListResolverService implements Resolve<any> {

  constructor(private service: GeneralService) { 
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.service.getStateWisePropertyCount(this.service.getcurrentUser().UserID);
  }

}
