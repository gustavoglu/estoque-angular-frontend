import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToolbarModule, AvatarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent {
  title = 'estoque-angular-frontend';

  constructor(private router: Router) {}

  goToProducts() {
    this.router.navigate(['/produtos']);
  }

  goToProductTypes() {
    this.router.navigate(['/produto-tipos']);
  }

  toggleDarkMode() {
    const element = document.documentElement;
    element.classList.toggle('app-dark');
  }

  getDarkModeIcon(): string {
    return this.isDarkMode() ? 'pi pi-sun' : 'pi pi-moon';
  }
  isDarkMode(): boolean {
    const element = document.documentElement;
    return element.classList.contains('app-dark');
  }
}
