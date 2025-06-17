import { openDB, IDBPDatabase } from 'idb';
import { StorageStrategy } from '../interfaces/storage-strategy.interface';

const DB_NAME  = 'algoria';
const STORE    = 'game-data';
const VERSION  = 1;

export class IndexedDbStrategy implements StorageStrategy {

  private readonly dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = openDB(DB_NAME, VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      }
    });
  }

  async read<T>(key: string): Promise<T | undefined> {
    const db = await this.dbPromise;
    return db.get(STORE, key) as Promise<T | undefined>;
  }

  async write<T>(key: string, value: T): Promise<void> {
    const db = await this.dbPromise;
    await db.put(STORE, value, key);
  }

  async remove(key: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(STORE, key);
  }
}
