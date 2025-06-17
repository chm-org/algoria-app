import { HttpClient, provideHttpClient } from "@angular/common/http";
import {
  ApplicationConfig,
  importProvidersFrom, inject, provideAppInitializer,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MonacoEditorModule, NgxMonacoEditorConfig } from "ngx-monaco-editor-v2";
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { STORAGE_STRATEGY } from './consts/storage.token';
import { IndexedDbStrategy } from './services/index-db.strategy';
import { LocalStorageStrategy } from './services/local-storage.strategy';
import { UserRepository } from './services/user.repository';

export const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: window.location.origin + "/assets/monaco/min/vs",
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const userRepo = inject(UserRepository)

      return userRepo.pull();
    }),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
      MonacoEditorModule.forRoot(monacoConfig),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
        useDefaultLang: true
      })
    ]),
    {
      provide : STORAGE_STRATEGY,
      useFactory() {
        /* Fallback when IndexedDB is not available (e.g. in private mode on older Safari) */
        try {
          if ('indexedDB' in window) {
            return new IndexedDbStrategy();
          }
        } catch (_) { /* ignore */ }

        return new LocalStorageStrategy();
      }
    },
  ],
};
