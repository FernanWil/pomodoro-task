import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { map, Subscription } from 'rxjs';
import { BotonChronometerService } from '../../data-access/boton-chronometer.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.css'
})
export class ButtonComponent {
    @Input() cdButton!: any;
    @Input() optionName!: string;
    @Output() namePassBreak = new EventEmitter<string>();
    // namePassBreak: string = '';

    getInfoCd = { action: '', left: 0};
    message: string = 'Start';
    action: boolean = false;
    buttonInterval: any;
    private dataSubcription!: Subscription;
    private reset: any;
    
    constructor(private buttonService: BotonChronometerService){}

    ngOnInit(){
        this.dataSubcription = this.buttonService.getDataButton$.subscribe((e: any) => this.getInfoCd = e);
    }

    chronometer(cd: CountdownComponent){        
        this.action = !this.action  
        if(this.action) this.startChronometer(cd);
        else this.pauseChronometer(cd);
    }

    startChronometer(cd: CountdownComponent) {
        if (cd) this.buttonService.sendCount(true);
        // console.log(cd);
        this.message = 'Pause'
        cd.begin()
        this.buttonInterval = setInterval(() => {
            if (this.getInfoCd.left > 0) this.getInfoCd.left--;
            else {
                this.resestChronometer(cd);
                this.sendName();
            }
        }, 1000);
    }
    
    resestChronometer(cd: CountdownComponent){
        clearInterval(this.getInfoCd.left);
        this.message = 'Start';
        this.reset = cd.restart();
    }

    pauseChronometer(cd: CountdownComponent) {
        cd.pause();
        this.message = 'Start'
        if (this.action) cd.resume();
    }

	sendName(){
        this.action = !this.action;
		if(this.optionName && this.optionName.includes('pomodoro')) {
            this.namePassBreak.emit('shortBreak');
            console.log(this.reset);
        }
		if(this.optionName && this.optionName.includes('shortBreak')) {
            this.namePassBreak.emit('pomodoro');
            console.log(this.reset);
        }
		// if(this.optionName && this.optionName.includes('pomodoro')) this.namePassBreak.emit('longBreak');		
	}

    ngOnDestroy(){
        if(this.dataSubcription) this.dataSubcription.unsubscribe();
    }
}
