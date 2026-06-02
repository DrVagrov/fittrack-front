import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';
import { environment } from '../../../environments/environment';

describe('DashboardComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and compute total calories', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiUrl}/workouts`);
    req.flush({
      data: [
        { id: 'wk-0001', type: 'course', durationMin: 45, calories: 420, date: '2026-05-12' },
        { id: 'wk-0002', type: 'yoga', durationMin: 30, calories: 110, date: '2026-05-15' }
      ]
    });

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.workouts.length).toBe(2);
    expect(component.totalCalories).toBe(530);
  });
});
