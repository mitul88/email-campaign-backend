import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.error("Redis is not connected!", err));

client.connect().then(() => console.log("Redis connected!"));

export const setValue = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}): Promise<void> => {
  await client.set(key, value);
};

export const getValue = async ({
  key,
}: {
  key: string;
}): Promise<string | null> => {
  return client.get(key);
};

export const getObjValue = async (
  key: string
): Promise<Record<string, string>> => {
  return client.hGetAll(key);
};

export const setObjValue = async (
  key: string,
  value: Record<string, string>
): Promise<void> => {
  await client.hSet(key, value);
};

export const setObjPropValue = async (
  key: string,
  prop: string,
  val: string
): Promise<void> => {
  await client.hSet(key, prop, val);
};

export const expireValue = async (
  key: string,
  timestamp: number
): Promise<void> => {
  await client.expire(key, timestamp);
};
