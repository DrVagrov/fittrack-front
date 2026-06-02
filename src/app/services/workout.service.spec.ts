import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { WorkoutService } from './workout.service';
import { environment } from '../../environments/environment';
import { Workout } from '../models/workout.model';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkoutService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WorkoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET workouts from the API', () => {
    const mock: { data: Workout[] } = {
      data: [
        {
          id: 'wk-0001',
          type: 'course',
          durationMin: 45,
          calories: 420,
          date: '2026-05-12'
        }
      ]
    };

    let result: { data: Workout[] } | undefined;
    service.getWorkouts().subscribe((res) => (result = res));

    const req = httpMock.expectOne(`${environment.apiUrl}/workouts`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);

    expect(result).toEqual(mock);
    expect(result?.data.length).toBe(1);
  });
});
