import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { BotonChronometerService } from '../../../shared/data-access/boton-chronometer.service';
import { FigureChronometerComponent } from "../../ui/figure-chronometer/figure-chronometer.component";
import { ShortBreakChronometerComponent } from '../short-break-chronometer/short-break-chronometer.component';
import { LongBreakChronometerComponent } from '../long-break-chronometer/long-break-chronometer.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// CountdownComponent, ButtonComponent, 
@Component({
    selector: 'app-chronometer',
    imports: [FigureChronometerComponent, CommonModule],
    templateUrl: './chronometer.component.html',
    styleUrl: './chronometer.component.css'
})
export class ChronometerComponent {
    time: number = 5; 
    optionName: string = 'pomodoro';
    tabActive: string = 'pomodoro';
    // @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
    // currentComponent: ComponentRef<any> | null = null;
    pomodoroCount: number = 1;
    shortCount: number = 0;
    longCount: number = 0;
    private dataSubcription!: Subscription;

    constructor(private buttonService: BotonChronometerService){}

    changedTab(name: string){
        if (this.tabActive === name) return;
        this.tabActive = name;
        this.loadComponent(name);
    }

    loadComponent(name: string){
        if (this.dataSubcription) this.dataSubcription.unsubscribe();
        if(name === 'pomodoro') this.loadComponentPomodoro(name);
        if(name === 'shortBreak') this.loadComponentShortBreak(name);        
        if(name === 'longBreak') this.loadComponentLongBreak(name);        
    }

    loadComponentPomodoro(name:string){
        this.optionName = name;
        this.dataSubcription = this.buttonService.getCountChronometer$.subscribe(() => this.pomodoroCount += 1);
        this.time = 5; //1500
    }

    loadComponentShortBreak(name: string){
        this.optionName = name;
        this.time = 5; // 300
        this.dataSubcription = this.buttonService.getCountChronometer$.subscribe(() => this.shortCount += 1);
    }

    loadComponentLongBreak(name:string){
        this.optionName = name;
        this.time = 900;
        this.dataSubcription = this.buttonService.getCountChronometer$.subscribe(() => this.longCount += 1)
    }

    ngOnDestroy(){
        if (this.dataSubcription) this.dataSubcription.unsubscribe();
    }
}
