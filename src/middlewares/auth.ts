import { Response, Request, NextFunction } from "express";
import { getUserBySessionToken } from "../models/user";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionToken = req.cookies['AUTH-ID'];
  
      if (!sessionToken) {
        return res.sendStatus(403);
      }
  
      const existingUser = await getUserBySessionToken(sessionToken);
  
      if (!existingUser) {
        return res.sendStatus(403);
      }
  
      return next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }