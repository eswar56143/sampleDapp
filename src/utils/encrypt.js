import { nanoid } from "nanoid";
import { pbkdf2 } from "pbkdf2";
const config = {
  hashBytes: 32,
  iterations: 72000,
};

export const encryptPassword = async (password) => {
  try {
    const encryptor = new Promise((resolve, reject) => {
      const salt = nanoid(32);
      const callback = (pbkdf2Error, key) => {
        if (pbkdf2Error) {
          return reject(pbkdf2Error);
        }
        resolve({ salt, key: key.toString("hex") });
      };

      pbkdf2(
        password,
        salt,
        config.iterations,
        config.hashBytes,
        "sha512",
        callback
      );
    });

    return encryptor;
  } catch (error) {
    console.log(error);
  }
};

export const encryptLoginPassword = async (data, salt) => {
  try {
    const executor = new Promise((resolve, reject) => {
      const callback = async (error, key) => {
        if (error) {
          return reject(error);
        }
        resolve(key.toString('hex'));
      };

      pbkdf2(
        data,
        salt,
        config.iterations,
        config.hashBytes,
        "sha512",
        callback
      );
    });

    return executor;
  } catch (error) {
    console.log(error);
  }
};
