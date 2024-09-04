const cpus = require("os").cpus;
const { timingSafeEqual, randomBytes, scrypt } = require("crypto");

/** Buffer encoding - `base64` */
const DEFAULT_ENCODING = "base64";
/** `keylen` */
const DEFAULT_LENGTH = 32;

/** CPU/memory cost parameter - `N` */
const DEFAULT_COST = 14;
/** Block size parameter - `r` */
const DEFAULT_BLOCK_SIZE = 8;
/** Parallelization parameter - `p` */
const DEFAULT_PARALLELIZATION = cpus().length;

function scryptToString({
  algorithm,
  version,
  cost,
  blockSize,
  parallelization,
  salt,
  hash,
}) {
  return `$${algorithm}$v=${version}$N=${cost}$r=${blockSize}$p=${parallelization}$${salt}$${hash}`;
}

/**
 * Hashes a password with a random salt (using `scrypt`)
 */
async function scryptHash({
  cost = DEFAULT_COST,
  blockSize = DEFAULT_BLOCK_SIZE,
  parallelization = DEFAULT_PARALLELIZATION,
  keylen = DEFAULT_LENGTH,
  password,
}) {
  if (keylen < 16) {
    throw new Error('"keylen" is less than 16');
  }

  const salt = await new Promise((resolve, reject) => {
    randomBytes(16, (error, buf) => {
      if (error) {
        reject(error);
      } else {
        resolve(buf);
      }
    });
  });

  const hash = await new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      keylen,
      { cost: 2 ** cost, blockSize, parallelization },
      (error, derivedKey) => {
        if (error) {
          reject(error);
        } else {
          resolve(derivedKey);
        }
      }
    );
  });

  const version = 1;
  const algorithm = "scrypt";

  return scryptToString({
    algorithm,
    version,
    cost,
    blockSize,
    parallelization,
    salt: salt.toString(DEFAULT_ENCODING),
    hash: hash.toString(DEFAULT_ENCODING),
  });
}

function scryptFromString(input) {
  if (!input.startsWith("$scrypt")) {
    throw new Error("Hash string has unsupported format");
  }

  // '$scrypt'.length + 2 = 8
  const parts = input.substring(8).split("$");

  const hash = parts.pop();
  const salt = parts.pop();

  if (!salt) {
    throw new Error("Salt could not be extracted");
  } else if (!hash) {
    throw new Error("Raw hash could not be extracted");
  }

  const options = {
    algorithm: "scrypt",
    version: 1,
    cost: DEFAULT_COST,
    blockSize: DEFAULT_BLOCK_SIZE,
    parallelization: DEFAULT_PARALLELIZATION,
    salt,
    hash,
  };

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key === "v" && value !== "1") {
      throw new Error(`The version ${value} is not supported`);
    } else if (key === "p" && !Number.isInteger(Number(value))) {
      throw new Error(`The "parallelization" option ${value} is not supported`);
    } else if (key === "p") {
      options.parallelization = Number(value);
    } else if (key === "N" && !Number.isInteger(Number(value))) {
      throw new Error(`The "cost" option ${value} is not supported`);
    } else if (key === "N") {
      options.cost = Number(value);
    } else if (key === "r" && !Number.isInteger(Number(value))) {
      throw new Error(`The "blockSize" option ${value} is not supported`);
    } else if (key === "r") {
      options.blockSize = Number(value);
    }
  }

  return options;
}

/**
 * Verifies that the password matches the saved hash (produced by the `hashPassword` funciton)
 */
async function scryptVerify(password, hashedData) {
  const { cost, blockSize, parallelization, ...options } =
    scryptFromString(hashedData);

  const salt = Buffer.from(options.salt, DEFAULT_ENCODING);
  const buffer = Buffer.from(options.hash, DEFAULT_ENCODING);
  const hash = await new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      buffer.byteLength,
      { cost: 2 ** cost, blockSize, parallelization },
      (error, derivedKey) => {
        if (error) {
          reject(error);
        } else {
          resolve(derivedKey);
        }
      }
    );
  });
  if (buffer.byteLength !== hash.byteLength) {
    return false;
  }
  return timingSafeEqual(hash, buffer);
}

module.exports = { scryptHash, scryptVerify };
