import {
  getObjValue,
  setObjValue,
  setObjPropValue,
  expireValue,
} from "../cache/redis";

interface TokenBucketOptions {
  key: string;
  maxAmount: number;
  refillTime: number;
  expiryInSeconds: number;
}

export const rateLimiter = async ({
  key,
  maxAmount,
  refillTime,
  expiryInSeconds,
}: TokenBucketOptions): Promise<boolean> => {
  try {
    let bucket = await getObjValue(key);
    if (!bucket || Object.keys(bucket).length === 0) {
      const value = {
        tokens: maxAmount.toString(),
        ts: "0",
      };
      // Create bucket
      await setObjValue(key, value);
      await expireValue(key, expiryInSeconds);
    }

    // Check if refill time has elapsed
    if (Date.now() - parseInt(bucket?.ts || "0", 10) >= refillTime) {
      await setObjPropValue(key, "tokens", maxAmount.toString());
      await setObjPropValue(key, "ts", "0");
    } else {
      bucket = await getObjValue(key);
      const requestLeft = parseInt(bucket.tokens || "0", 10);
      if (requestLeft <= 0) {
        // Drop request
        return false;
      }
    }

    // Decrement token count
    const modifiedBucket = await getObjValue(key);
    const tokensLeft = parseInt(modifiedBucket.tokens || "0", 10);

    if (maxAmount - tokensLeft === 0) {
      const currentTimestamp = Date.now();
      await setObjPropValue(key, "ts", currentTimestamp.toString());
    }

    const decrementedTokens = tokensLeft - 1;
    await setObjPropValue(key, "tokens", decrementedTokens.toString());

    // Allow request
    return true;
  } catch (err) {
    console.error("Error in tokenBucket:", err);
    throw err;
  }
};
