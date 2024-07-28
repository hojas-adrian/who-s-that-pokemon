import { Context, InlineKeyboard } from "../deps.ts";
import { COMMUNITY_CHANNEL_ID } from "../helpers/constants.ts";

const inlineKeyboard = async (ctx: Context) => {
  const channel = await ctx.api.getChat(COMMUNITY_CHANNEL_ID);

  return new InlineKeyboard()
    .url("👥 Our Community", channel.invite_link as string)
    .url(
      "➕ Add to a Group",
      `tg://resolve?domain=${ctx.me.username}&startgroup=true`
    );
};

export default inlineKeyboard;
