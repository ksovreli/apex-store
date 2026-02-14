import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) { }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollTo(sectionId: string) {
  if (this.router.url === '/home' || this.router.url === '/') {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  else {
    this.router.navigate(['/home'], { fragment: sectionId });
  }
}

  navigateToHome() {
    this.router.navigateByUrl('/home')
  }

  menuOpen = false
}
