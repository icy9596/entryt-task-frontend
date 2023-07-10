interface Storage {
  setItem(key: string, value: any): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

const createStorage = (storage: Storage): Storage => {
  return {
    getItem(key) {
      const value = storage.getItem(key);
      return value == null ? value : JSON.parse(value);
    },
    setItem(key, value) {
      value = value == null ? value : JSON.stringify(value);
      storage.setItem(key, value);
    },
    removeItem(key) {
      storage.removeItem(key);
    },
    clear() {
      storage.clear();
    },
  } as Storage;
};

const storage = createStorage(localStorage);

export default storage;
