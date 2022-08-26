import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface CustomRequest extends Request {
  apiKey: string;
  headers: IncomingHttpHeaders & {
    'api-key': string;
  };
}
