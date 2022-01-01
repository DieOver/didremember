import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const { headers, method, originalUrl, params, query, body } = req;
  next();
}
