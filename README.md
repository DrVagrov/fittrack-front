# FitTrack-front

<!-- Badge CI a coller a l'exo 11 :
![CI](https://github.com/<votre-org>/fittrack-front/actions/workflows/ci-angular.yml/badge.svg)
-->

Front Angular 17 minimal de FitTrack, support de l'exo 11 (CI Angular + ChromeHeadless).

## Stack
- Angular 17 (standalone components)
- Karma + Jasmine pour les tests
- ChromeHeadless pour l'execution en CI

## Installation
```bash
npm install        # genere package-lock.json (a committer pour npm ci)
```

## Lancer en local
```bash
npm start          # http://localhost:4200 (dev-server)
```
> L'app consomme FitTrack-API sur `http://localhost:3000` (cf. `src/environments/environment.ts`).

## Tester
```bash
npm test                                          # Karma, navigateur Chrome (watch)
npm run test:ci                                   # ChromeHeadlessCI, sans watch (= CI)
npx ng test --watch=false --browsers=ChromeHeadless
```

## Build production
```bash
npx ng build --configuration=production           # sortie dans dist/fittrack-front
```

## Structure
```
src/
  app/
    app.component.ts            # shell + nav (specs : creation + titre)
    app.config.ts              # providers (router + httpClient)
    app.routes.ts              # routes (redirige vers /dashboard)
    models/workout.model.ts
    services/workout.service.ts        # appels API /workouts (+ spec)
    pages/dashboard/dashboard.component.ts  # liste des seances (+ spec)
  environments/                # apiUrl dev / prod
  index.html, main.ts, styles.css
karma.conf.js                  # launcher ChromeHeadlessCI (--no-sandbox)
```

## Tests fournis (3 specs)
- `AppComponent` : creation + titre `FitTrack`
- `WorkoutService` : GET `/workouts`
- `DashboardComponent` : creation + calcul du total de calories
