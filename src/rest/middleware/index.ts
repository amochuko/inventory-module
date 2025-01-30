 
import { Request, Response, NextFunction } from 'express';


const requestTime = function (req: Request, res: Response, next: NextFunction) {
  req.requestTime = Date.now();

  next();
};

export { requestTime };
