import { HttpClient, provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { DefaultLoggerFactory } from 'algoria-utils';

import { routes } from './app.routes';
import { LOGGER_FACTORY } from './consts/logger-factory.token';


export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
      MonacoEditorModule.forRoot(),
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
      provide: LOGGER_FACTORY,
      useFactory: () => {
        return new DefaultLoggerFactory();
      }
    }
  ],
};
