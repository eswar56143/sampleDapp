import { argon2id } from "hash-wasm";
import { nanoid } from "nanoid";

export const encryptPassword = async (password) => {
  try {
    const salt = nanoid(32);
    const key = await argon2id({
      password: password,
      salt, // salt is a buffer containing random bytes
      parallelism: 1,
      iterations: 256,
      memorySize: 512, // use 512KB memory
      hashLength: 32, // output size = 32 bytes
      outputType: "encoded", // return standard encoded string containing parameters needed to verify the key
    });
    console.log(salt);
    return { salt, key };
  } catch (error) {
    console.log(error);
  }
};

export const encryptLoginPassword = async (password, salt) => {
  try {
    const key = await argon2id({
      password: password,
      salt, // salt is a buffer containing random bytes
      parallelism: 1,
      iterations: 256,
      memorySize: 512, // use 512KB memory
      hashLength: 32, // output size = 32 bytes
      outputType: "encoded", // return standard encoded string containing parameters needed to verify the key
    });
    return key;
  } catch (error) {
    console.log(error);
  }
};
