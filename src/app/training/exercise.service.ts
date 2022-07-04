import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";

export class ExerciseService {
  private readonly allExercises: Exercise[] = [
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 6 },
    { id: 'lunges', name: 'Lunges', duration: 60, calories: 6 },
    { id: 'push-ups', name: 'Push Ups', duration: 30, calories: 8 },
    { id: 'squats', name: 'Squats', duration: 90, calories: 10 },
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  exerciseChanged = new Subject<Exercise>();

  getAll(): Exercise[] {
    return this.allExercises.slice();
  }

  getAllEnded(): Exercise[] {
    return this.exercises.slice();
  }

  getRunning(): Exercise {
    return { ...this.runningExercise };
  }

  start(selectedId: string): void {
    this.runningExercise =
      this.allExercises.find(item => item.id === selectedId);

    this.exerciseChanged.next({ ...this.runningExercise });
  }

  complete(): void {
    this.exercises.push({
      ...this.runningExercise,
      endedOn: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancel(progress: number): void {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      endedOn: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
}
