export interface StorageStrategy {
  read<T = unknown>(key: string): Promise<T | undefined>;
  write<T = unknown>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}
