import { Component } from '@angular/core';

@Component({
	selector: 'app-task',
	imports: [],
	templateUrl: './task.component.html',
	styleUrl: './task.component.css'
})
export class TaskComponent {
	showButton: boolean = true;
	showInput(){
		this.showButton = !this.showButton;
	}
	addTask() { }
}
