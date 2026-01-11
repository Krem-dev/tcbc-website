if (typeof window === "undefined") {
  const store: Record<string, string> = {};

  (global as any).localStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach(key => delete store[key]);
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
    length: 0,
  };

  Object.defineProperty((global as any).localStorage, "length", {
    get() {
      return Object.keys(store).length;
    },
  });
}
