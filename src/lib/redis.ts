import { Redis } from "@upstash/redis";

// Initialize Redis
export const redis = Redis.fromEnv();

interface CacheFetchOption {
  role: `admin` | `user`;
  expire: number;
}

// Generic cache-fetch function
export const cacheFetch = async <T>(
  key: string,
  fetchFunction: () => Promise<T | null>,
  { role, expire }: CacheFetchOption = { role: `user`, expire: 3600 }
): Promise<T | null> => {
  // Try to get the value from Redis
  const cachedValue = await redis.get<T>(key);
  // Check if there is a cached value

  if (role === `admin`) {
    return await fetchFunction();
  }

  if (cachedValue) {
    return cachedValue;
  }

  // If not found, call the fetch function to get the value
  const freshValue = await fetchFunction();

  if (freshValue !== null) {
    await redis.set(key, JSON.stringify(freshValue), {
      ex: expire, // Expire in 1 hour
    });
  }
  // Store the fresh value in Redis with an expiration time (e.g., 1 hour)

  return freshValue;
};
