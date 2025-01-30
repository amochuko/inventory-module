declare module "express-serve-static-core" {
  interface Request {
    requestTime?: number;
  }
}

export interface CustomError extends Error {
  status?: number;
}

export interface User {
  salt: string;
  hash: Buffer;
}

export enum Episode {
  NEWHOPE,
  EMPIRE,
  JEDI,
}