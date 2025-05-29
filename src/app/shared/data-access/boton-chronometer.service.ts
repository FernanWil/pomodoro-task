import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotonChronometerService {
  private getData= new Subject;
  getDataButton$ = this.getData.asObservable();

  private passBreak = new Subject;
  getPassBreak$ = this.passBreak.asObservable();

  getDataCd(action: string, left: number){
    this.getData.next({action, left});
  }

  getDataPassBreak(name: string){
    this.passBreak.next(name);
    console.log(name);
  }
}
