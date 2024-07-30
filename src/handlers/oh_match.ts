import { NextFunction, User } from "../deps.ts";
import MyContext from "../helpers/context.ts";
import {
  getPkmCard,
  getPkmImge,
  levenshteinSimilarity,
  name,
} from "../helpers/functions.ts";

export default async (ctx: MyContext, next: NextFunction) => {
  if (!ctx.message?.text) {
    return;
  }

  if (
    levenshteinSimilarity(
      ctx.message.text.toLowerCase(),
      ctx.session?.pkmName as string
    ) > 80
  ) {
    await ctx.react("🎉");

    const card = getPkmCard(getPkmImge(ctx.session?.pkmId as number));
    await ctx.api.editMessageMedia(
      ctx.chat?.id as number,
      ctx.session?.messageId as number,
      {
        media: card,
        caption: `${name(ctx.from as User)} got <b>${ctx.session?.pkmName}</b>`,
        type: "photo",
        parse_mode: "HTML",
      }
    );

    await next();
  }
};
