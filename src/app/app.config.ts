import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { ReportService, SignalService } from './core/services';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    ReportService,
    SignalService,
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
