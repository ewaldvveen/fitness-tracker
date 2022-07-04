import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseService } from '../exercise.service';

import { StopTrainingComponent } from '../stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private readonly dialog: MatDialog,
    private readonly exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(
      StopTrainingComponent,
      {
        data: { progress: this.progress }
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.exerciseService.cancel(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  private startOrResumeTimer(): void {
    const step = (this.exerciseService.getRunning().duration / 100) * 1000;
    this.timer = window.setInterval(() => {
      this.progress++;

      if(this.progress >= 100) {
        this.exerciseService.complete();
        clearInterval(this.timer);
      }
    }, step);
  }
}
