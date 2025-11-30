import {Request, Response, NextFunction} from 'express'

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler = (func: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(
            func(req, res, next)
        ).catch((err)=>{
            next(err)
        });
    }
}

export {asyncHandler};