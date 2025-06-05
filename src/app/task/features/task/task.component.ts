import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { take } from 'rxjs';

@Component({
	selector: 'app-task',
	imports: [CommonModule],
	templateUrl: './task.component.html',
	styleUrl: './task.component.css'
})
export class TaskComponent {
	@ViewChild('inputTask') inputTask!: ElementRef;
	showButton: boolean = true;
	task: string[] = [];
	contTask: number = 0;
	completeTask: boolean = false;
	onButtonIndex: number | null = null;
	inputVisible: boolean = false;

	showInput(){
		this.showButton = false;
	}
	saveTask(){
		if (this.inputTask.nativeElement.value && this.inputTask.nativeElement.value != '') {
			this.task.push(this.inputTask.nativeElement.value);
			this.contTask+=1;
			this.showButton = true;
		}
		console.log(this.task);
	}
	cancelTask(){
		this.showButton = true;
	}

	buttonCheckTask() {
		console.log("HOLA");
		this.completeTask = ! this.completeTask
	}

	onMouseEnter(index: number){ this.onButtonIndex = index; }
	onMouseLeave(){ this.onButtonIndex = null; }

	editTask(index: number){
		if (index >= 0) {
			this.inputVisible = true;
			const newInput = this.inputTask?.nativeElement.focus();
			setTimeout(() => {
				this.task.splice(index, 1,newInput);
			});
		}		
	}

	removeTask(id: number){
		if (id) {
			this.task.splice(id,1);
		}
	}
}
