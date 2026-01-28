interface KV {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: any): Promise<void>;
  del(key: string): Promise<void>;
  ping(): Promise<boolean>;
}

const memory = new Map<string, any>();

const kv: KV = {
  async get<T>(key: string) {
    return memory.get(key) ?? null;
  },
  async set(key: string, value: any) {
    memory.set(key, value);
  },
  async del(key: string) {
    memory.delete(key);
  },
  async ping() {
    return true;
  },
};

export default kv;
