import { InjectionToken } from '@angular/core';
import { StorageStrategy } from '../interfaces/storage-strategy.interface';

export const STORAGE_STRATEGY = new InjectionToken<StorageStrategy>('STORAGE_STRATEGY');
