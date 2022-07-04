import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  allExercises: Exercise[] = [];

  constructor(private readonly exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.allExercises = this.exerciseService.getAll();
  }

  onStartTraining(form: NgForm): void {
    this.exerciseService.start(form.value.exercise);
  }
}
