import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../core/services/data.service';
import { fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation, cardHoverAnimation } from '../../shared/animations/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFabButton,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation, cardHoverAnimation]
})
export class ProjectsComponent {
  
  // Get projects from data service using Angular Signals
  public readonly projects = this.dataService.projects;
  
  constructor(public dataService: DataService) {}

  // Get featured projects only
  getFeaturedProjects() {
    return this.dataService.getFeaturedProjects();
  }

  // TrackBy function for performance optimization
  trackByProject(index: number, project: any): string {
    return project.id;
  }

  // Handle image load error
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = '/assets/images/projects/placeholder.svg';
    }
  }

  // Open external link
  openLink(url?: string) {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  }
}