export const RATE_LIMITER_CONFIG = {
  REFILL_INTERVAL: (1000 * 60) as number, // 1 minute
  MAX_REQUEST: 3 as number,
  TOKEN_CACHE_EXPIRE_IN_SECOND: 864000 as number, // 1 day
};
