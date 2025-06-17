import { StorageStrategy } from '../interfaces/storage-strategy.interface';

export class LocalStorageStrategy implements StorageStrategy {
  async read<T>(key: string): Promise<T | undefined> {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  }

  async write<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
