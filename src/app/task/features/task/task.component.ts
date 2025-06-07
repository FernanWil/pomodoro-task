import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-task',
	imports: [CommonModule, FormsModule],
	templateUrl: './task.component.html',
	styleUrl: './task.component.css'
})
export class TaskComponent {
	@ViewChild('inputTask') inputTask!: ElementRef;
	showButton: boolean = true;
	task:{id: number, task: string} [] = [];
	contTask: number = 0;
	completeTask: boolean = false;
	onButtonIndex: number | null = null;
	inputVisible: boolean = false;
	valueInputTask: string = '';
	inputFocus: boolean = false;

	onMouseEnter(index: number){ this.onButtonIndex = index; }

	onMouseLeave(){ this.onButtonIndex = null; }

	cancelTask(){ this.showButton = true; }

	showInput(){ this.showButton = false; }
	
	buttonCheckTask() { this.completeTask = !this.completeTask }

	saveTask(){
		const inputValue = this.inputTask.nativeElement.value.trim();
		if (inputValue) {
			this.task.push({id: this.contTask, task: inputValue});
			this.showButton = true;
			this.inputTask.nativeElement.value = '';
			this.contTask+=1;
		}		
	}

	editTask(index: number){
		this.inputTask?.nativeElement.focus();
		try {
			this.inputFocus = true;
			this.inputVisible = true;
			this.onButtonIndex = index;
			this.valueInputTask = this.task[index].task;
			console.log(this.task[index].task);
		} catch (error) {console.log("Error: ", error); }
	}

	showNewValueInput(event: Event){
		const value = event.target as HTMLInputElement;
		this.valueInputTask = value.value;		
	}
	
	saveTaskEdit(index: number){
		const newValueInputTask = this.valueInputTask.trim();
		console.log(this.valueInputTask);
		if (newValueInputTask) {
			this.task[index].task = newValueInputTask;
			this.inputVisible = false;
			this.inputFocus = false;
			this.inputTask.nativeElement.value = '';
		}
	}

	removeTask(id: number){
		try {
			this.task.splice(id,1);
			this.contTask -=1
			this.inputFocus = false;
			this.inputVisible = false;
		} catch (error) {
			console.log(`Error al obtener el id: ${error}`);
		}
	}
}
