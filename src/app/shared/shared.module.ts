import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Modules (shared across the app)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Translation Module
import { TranslateModule } from '@ngx-translate/core';

// Shared components (when we have them)
// import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
// import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule,
    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    // Translation
    TranslateModule
  ],
  exports: [
    // Commons
    CommonModule,
    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    // Translation
    TranslateModule
    // Shared components
    // LoadingSpinnerComponent,
    // ErrorMessageComponent
  ]
})
export class SharedModule {}