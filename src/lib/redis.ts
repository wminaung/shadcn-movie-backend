import { Redis } from "@upstash/redis";

// Initialize Redis
export const redis = Redis.fromEnv();

// export const cacheFetch = async <T>(
//   key: string,
//   fetchFunction: () => Promise<T>
// ): Promise<T> => {
//   // Try to get the value from Redis
//   const cachedValue = (await redis.get(key)) as string;

//   if (cachedValue) {
//     // If found in cache, return the cached value
//     return JSON.parse(cachedValue);
//   } else {
//     // If not found, call the fetch function to get the value
//     const freshValue = await fetchFunction();
//     // Store the fresh value in Redis with an expiration time (e.g., 1 hour)
//     await redis.set(key, JSON.stringify(freshValue), {
//       ex: 3600,
//     });

//     return freshValue;
//   }
// };

// Generic cache-fetch function
export const cacheFetch = async <T>(
  key: string,
  fetchFunction: () => Promise<T | null>
): Promise<T | null> => {
  // Try to get the value from Redis
  const cachedValue = await redis.get<T>(key);
  // Check if there is a cached value
  if (cachedValue) {
    return cachedValue;
  }

  // If not found, call the fetch function to get the value
  const freshValue = await fetchFunction();

  if (freshValue !== null) {
    await redis.set(key, JSON.stringify(freshValue), {
      ex: 3600, // Expire in 1 hour
    });
  }
  // Store the fresh value in Redis with an expiration time (e.g., 1 hour)

  return freshValue;
};
