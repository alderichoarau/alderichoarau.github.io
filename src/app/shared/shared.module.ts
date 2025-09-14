import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

const ANGULAR_MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatExpansionModule,
  MatChipsModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatTabsModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    ...ANGULAR_MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ...ANGULAR_MATERIAL_MODULES
  ]
})
export class SharedModule { }
