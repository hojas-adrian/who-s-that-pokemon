import MyContext from "../helpers/context.ts";
import {
  getChartIndex,
  replyHint,
  replyMessageToUser,
} from "../helpers/functions.ts";

export default async (ctx: MyContext) => {
  if (!ctx.session) {
    return await replyMessageToUser(ctx, "no game active");
  }

  const answerChars = ctx.session.pkmName.split("");

  if (!ctx.session.hint) {
    const hint = answerChars.map((chart) => {
      if (chart === " ") {
        return " ";
      }
      return "₋";
    });

    ctx.session.hint = hint.join("");
    return replyHint(ctx);
  }

  const stars = ctx.session.hint.split("").filter((chart) => {
    return chart === "₋";
  });

  if (answerChars.length / 2 >= stars.length) {
    return await replyMessageToUser(ctx, "no more hints pal");
  }

  const index = getChartIndex(ctx.session.hint);

  const hint = ctx.session.hint.split("");
  hint[index] = ctx.session.pkmName[index];

  ctx.session.hint = hint.join("");

  return await replyHint(ctx);
};
