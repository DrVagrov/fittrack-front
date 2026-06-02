import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly baseUrl = `${environment.apiUrl}/workouts`;

  constructor(private http: HttpClient) {}

  getWorkouts(): Observable<{ data: Workout[] }> {
    return this.http.get<{ data: Workout[] }>(this.baseUrl);
  }

  getWorkout(id: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.baseUrl}/${id}`);
  }
}
