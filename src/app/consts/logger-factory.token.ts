import { InjectionToken } from '@angular/core';
import { LoggerFactory } from '../../../../algoria-utils';

export const LOGGER_FACTORY = new InjectionToken<LoggerFactory>('LOGGER_FACTORY');
