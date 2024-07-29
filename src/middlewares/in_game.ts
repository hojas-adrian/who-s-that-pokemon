import { NextFunction } from "../deps.ts";
import MyContext from "../helpers/context.ts";

export default async (ctx: MyContext, next: NextFunction) => {
  if (ctx.session === undefined) {
    return;
  }
  await next();
};
