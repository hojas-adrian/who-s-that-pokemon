import { NextFunction } from "../deps.ts";
import MyContext from "../helpers/context.ts";

export default async (ctx: MyContext, next: NextFunction) => {
  ctx.session = undefined;
  await next();
};
