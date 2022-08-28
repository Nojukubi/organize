let database: IDBDatabase;

export async function connect(): Promise<IDBDatabase> {
  return new Promise((resolve) => {
    if (database) resolve(database);
    else {
      const DBOpenRequest: IDBOpenDBRequest = window.indexedDB.open('organize');
      DBOpenRequest.onsuccess = function (): void {
        database = DBOpenRequest.result;
        resolve(database);
      };

      DBOpenRequest.onupgradeneeded = function () {
        database = DBOpenRequest.result;
        if (!database.objectStoreNames.contains('habits')) {
          database.createObjectStore('habits', { keyPath: 'id' });
        }
      };
    }
  });
}
