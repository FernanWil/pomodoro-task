import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { BotonChronometerService } from '../../../shared/data-access/boton-chronometer.service';
import { FigureChronometerComponent } from "../../ui/figure-chronometer/figure-chronometer.component";
import { ShortBreakChronometerComponent } from '../short-break-chronometer/short-break-chronometer.component';
import { LongBreakChronometerComponent } from '../long-break-chronometer/long-break-chronometer.component';

// CountdownComponent, ButtonComponent, 
@Component({
    selector: 'app-chronometer',
    imports: [FigureChronometerComponent],
    templateUrl: './chronometer.component.html',
    styleUrl: './chronometer.component.css'
})
export class ChronometerComponent {
    time: number = 5; 
    optionName: string = 'pomodoro';
    tabActive: string = 'pomodoro';
    // @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
    // currentComponent: ComponentRef<any> | null = null;
    pomodoroCount: number =1;
    shortCount: number =0;

    constructor(private buttonService: BotonChronometerService){}

    changedTab(name: string){
        if (this.tabActive === name) return;
        this.tabActive = name;
        this.loadComponent(name);
    }

    loadComponent(name: string){
        // this.container.clear();
        if (name === 'pomodoro') {
            this.optionName = name;
            this.time = 5; //1500
            this.pomodoroCount += 1
            console.log("Pomodoro: ",this.pomodoroCount);
        }
        if (name === 'shortBreak') {
            this.optionName = name;
            this.time = 5; // 300
            this.shortCount += 1
            console.log("Short: ",this.shortCount);
        } 
        if(name === 'longBreak') {
            this.optionName = name;
            this.time = 900;
        }
    }
}
