import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChronometerComponent } from "./pomodoro/features/chronometer/chronometer.component";
import { NavbarComponent } from "./shared/ui/layout/navbar.component";
import { TaskComponent } from "./task/features/task/task.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChronometerComponent, NavbarComponent, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pomodoro';
}
