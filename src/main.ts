import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { MasterService } from './app/services/master.service';
import { provideHttpClient } from '@angular/common/http';
import { AlarmService } from './app/services/alarm.service';
import { DatabaseService } from './app/services/database.service';
import { AuthService } from './app/services/auth.service';
import { Storage } from '@ionic/storage';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    MasterService,
    AlarmService,
    DatabaseService,
    Storage,
    AuthService
  ],
});
