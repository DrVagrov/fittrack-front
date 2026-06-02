import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/dashboard">Tableau de bord</a>
    </nav>
    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent {
  title = 'FitTrack';
}
