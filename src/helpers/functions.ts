import { InlineKeyboard } from "../deps.ts";
import { IMGIX_URL, IMGIX_URL_1 } from "./constants.ts";
import joinGroupKeyboard from "../keyboards/join_group.ts";
import MyContext from "./context.ts";

export const getServer = (id: number) => {
  return id <= 900 ? IMGIX_URL : IMGIX_URL_1;
};

export const getPkmImge = (id: number) => {
  const baseUrl = getServer(id);
  return `${baseUrl}${id}.png`;
};

export const getPkmCard = (img: string) => {
  return generateUrl(`${IMGIX_URL}background.jpeg`, [
    { name: "mark", value: img },
    { name: "mark-align", value: "left,middle" },
    { name: "mark-w", value: "360" },
  ]);
};

export const generateUrl = (
  img: string,
  paramss: {
    name: string;
    value: string;
  }[]
) => {
  const baseUrl = img;
  const searchParams = new URLSearchParams();

  paramss.forEach((param) => {
    return searchParams.append(param.name, param.value);
  });

  const urlGenerada = new URL(baseUrl);
  urlGenerada.search = searchParams.toString();

  return urlGenerada.href;
};

export const getPkmblackImg = (id: number) => {
  const img = getPkmImge(id);

  return generateUrl(img, [{ name: "bri", value: "-100" }]);
};

const sendPhoto = async (
  ctx: MyContext,
  img: string,
  caption?: string,
  options?: {
    show_caption_above_media?: boolean;
    reply_message_id?: number;
    inlineKeyboard?: InlineKeyboard;
  }
) => {
  return await ctx.replyWithPhoto(img, {
    caption: caption,
    show_caption_above_media: options?.show_caption_above_media,
    parse_mode: "HTML",
    reply_parameters: {
      message_id: options?.reply_message_id as number,
    },
    reply_markup: options?.inlineKeyboard,
  });
};

export const sendPkmCard = async (
  ctx: MyContext,
  img: string,
  options = {
    inPv: false,
  }
) => {
  const keyboard = await joinGroupKeyboard(ctx);

  return sendPhoto(ctx, img, "<b>Who's that Pokemon?</b>", {
    show_caption_above_media: true,
    reply_message_id: ctx.message?.message_id,
    inlineKeyboard: options.inPv ? keyboard : undefined,
  });
};

export const setPkm = (
  ctx: MyContext,
  data: {
    id: number;
    name: string;
  }
) => {
  ctx.session = {
    pkmId: data.id,
    pkmName: data.name,
  };
};
