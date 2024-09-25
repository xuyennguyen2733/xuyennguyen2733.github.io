import { Component, HostListener, inject} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent {
  isSmallScreen: boolean = false;
  
  private themeService: ThemeService = inject(ThemeService);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSmallScreen = window.innerWidth <= 500;
  }
  
  toggleTheme() {
    this.themeService.updateTheme()
  }
}

