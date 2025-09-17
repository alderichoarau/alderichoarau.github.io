import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { DataService } from './services/data.service';
import { TranslationService } from './services/translation.service';
import { ScrollAnimationService } from './services/scroll-animation.service';
import { LazyLoadingService } from './services/lazy-loading.service';

// Components
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    // Core components are standalone, so we import them here
    HeaderComponent,
    NavigationComponent
  ],
  exports: [
    HeaderComponent,
    NavigationComponent
  ],
  providers: [
    // These services are already providedIn: 'root', but we can list them for documentation
    DataService,
    TranslationService,
    ScrollAnimationService,
    LazyLoadingService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only once in AppModule.');
    }
  }
}