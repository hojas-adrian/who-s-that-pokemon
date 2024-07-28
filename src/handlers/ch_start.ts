import { Context } from "../deps.ts";
import {
  getPkmCard,
  getPkmblackImg,
  sendPkmCard,
} from "../helpers/functions.ts";

export default async (ctx: Context) => {
  const inPv = ctx.chat?.type === "private" ? true : false;
  const id = Math.ceil(Math.random() * (900 - 1));

  const img = getPkmCard(getPkmblackImg(id));
  await sendPkmCard(ctx, img, { inPv });
};
