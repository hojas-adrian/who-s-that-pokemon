import { NextFunction } from "../deps.ts";
import MyContext from "../helpers/context.ts";
import {
  getPkmCard,
  getPkmImge,
  levenshteinSimilarity,
  sendPkmCard,
} from "../helpers/functions.ts";

export default async (ctx: MyContext, next: NextFunction) => {
  if (!ctx.message?.text) {
    return;
  }
  console.log(ctx.session?.pkmName);

  if (
    levenshteinSimilarity(
      ctx.message.text.toLowerCase(),
      ctx.session?.pkmName as string
    ) > 80
  ) {
    await ctx.react("🎉");
    const card = getPkmCard(getPkmImge(ctx.session?.pkmId as number));
    await sendPkmCard(ctx, card, {
      caption: "answer",
      isReply: true,
    });

    await next();
  }
};
