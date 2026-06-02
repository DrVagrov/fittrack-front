import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Mes seances</h1>

    @if (loading) {
      <p>Chargement...</p>
    } @else {
      <p>Total calories : {{ totalCalories }} kcal</p>

      @if (workouts.length === 0) {
        <p>Aucune seance enregistree.</p>
      } @else {
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Duree (min)</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            @for (workout of workouts; track workout.id) {
              <tr>
                <td>{{ workout.type }}</td>
                <td>{{ workout.durationMin }}</td>
                <td>{{ workout.calories }}</td>
                <td>{{ workout.date }}</td>
              </tr>
            }
          </tbody>
        </table>
      }
    }
  `
})
export class DashboardComponent implements OnInit {
  workouts: Workout[] = [];
  totalCalories = 0;
  loading = true;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe({
      next: (res) => {
        this.workouts = res.data;
        this.totalCalories = res.data.reduce((sum, w) => sum + w.calories, 0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
