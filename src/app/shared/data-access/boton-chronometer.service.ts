import { Injectable } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotonChronometerService {

  private getData= new Subject;
  getDataButton$ = this.getData.asObservable();

  private passBreak = new Subject;
  getPassBreak$ = this.passBreak.asObservable();

  private countChronometer = new Subject;
  getCountChronometer$ = this.countChronometer.asObservable();

  getDataCd(action: string, left: number){
    this.getData.next({action, left});
  }

  getDataPassBreak(name: string){
    this.passBreak.next(name);
    console.log(name);
  }

  sendCount(active: boolean) {
    this.countChronometer.next(active);
    // this.countChronometer.next({countPomodoro, countShort, countLong});
  }
}
