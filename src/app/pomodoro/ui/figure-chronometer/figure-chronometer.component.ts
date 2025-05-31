import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CountdownComponent, CountdownEvent, CountdownModule } from 'ngx-countdown'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { Action } from 'rxjs/internal/scheduler/Action';
import { BotonChronometerService } from '../../../shared/data-access/boton-chronometer.service';

@Component({
	selector: 'app-figure-chronometer',
	imports: [CountdownModule, CommonModule, FormsModule, ButtonComponent],
	template: `
		<!-- <div class="card" style="width: auto; height: 200px;">
			<div class="card-body">
			<h5 class="card-title">Chronometer</h5>
				<div class="mx-auto d-flex justify-content-center align-items-center">
					<countdown #cd [config]="{leftTime: timeChronometer, format: 'mm:ss', demand: true}" (event)="handleEvent($event)"/>
				</div>
			</div>
		</div> -->
		<div class="container">	
			<div class="row">
				<div class="col d-flex justify-content-center">
					<countdown #cd [config]="{leftTime: timeChronometer, format: 'mm:ss', demand: true}" (event)="handleEvent($event)" />	
				</div>
			</div>
			<div class="row">
				<div class="col d-flex justify-content-center align-items-center">
					<app-button [cdButton]="cd" [optionName]="optionName" (namePassBreak)="getNamePassBreak($event)"/>
					<!-- <div class="btn mingcute--play-fill" (click)="sendName()"></div> -->
				</div>
			</div>
        </div>
  `,
	styleUrl: './figure-chronometer.component.css',
})
export class FigureChronometerComponent {
	constructor(private buttonService: BotonChronometerService) { }
	@Input() timeChronometer!: number;
	@Input() optionName!: string;
	@Output() name = new EventEmitter<string>();
	// name: string = '';

	// @Output() namePassBreak = new EventEmitter<string>();
	// sendName(){
	// 	if(this.optionName && this.optionName.includes('pomodoro')) this.namePassBreak.emit('shortBreak');
	// 	if(this.optionName && this.optionName.includes('shortBreak')) this.namePassBreak.emit('pomodoro');		
	// }
	getNamePassBreak(name: string){
		this.name.emit(name)
	}

	handleEvent(e: CountdownEvent) {
		this.buttonService.getDataCd(e.action, e.left);
	}
}
