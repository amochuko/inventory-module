export interface CustomError extends Error {
  status?: number;
}

export interface User {
  salt: string;
  hash: Buffer;
}