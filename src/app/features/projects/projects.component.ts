import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { DataService, Project } from '../../core/services/data.service';
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
  animations: [fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation, cardHoverAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  
  // Modern Angular inject pattern
  public readonly dataService = inject(DataService);
  
  // Get projects from data service using Angular Signals
  public readonly projects = this.dataService.projects;

  // Angular 19 computed signal for featured projects
  public readonly featuredProjects = computed(() => {
    return this.dataService.getFeaturedProjects();
  });

  // TrackBy function for performance optimization
  trackByProject(index: number, project: Project): string {
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