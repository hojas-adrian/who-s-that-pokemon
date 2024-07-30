import { InlineKeyboard, User } from "../deps.ts";
import { IMGIX_URL, IMGIX_URL_1 } from "./constants.ts";
import joinGroupKeyboard from "../keyboards/join_group.ts";
import MyContext from "./context.ts";

export const getServer = (id: number) => {
  return id <= 900 ? IMGIX_URL : IMGIX_URL_1;
};

export const getRandomNumber = (number: number) => {
  return Math.ceil(Math.random() * (number - 1) + 1);
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
  options?: {
    show_caption_above_media?: boolean;
    isReply?: boolean;
  }
) => {
  const keyboard = await joinGroupKeyboard(ctx);

  return sendPhoto(ctx, img, "<b>Who's that Pokemon?</b>", {
    show_caption_above_media: options?.show_caption_above_media,
    reply_message_id: options?.isReply ? ctx.message?.message_id : 0,
    inlineKeyboard: ctx.chat?.type === "private" ? keyboard : undefined,
  });
};

export const setPkm = (
  ctx: MyContext,
  data: {
    id: number;
    name: string;
    messageId: number;
  }
) => {
  ctx.session = {
    pkmId: data.id,
    pkmName: data.name.replaceAll("-", " "),
    messageId: data.messageId,
  };
};

export const levenshteinSimilarity = (str1: string, str2: string) => {
  // Get the lengths of the two strings
  const m = str1.length;
  const n = str2.length;

  // Initialize an empty array of size (m + 1) x (n + 1)
  const matrix = [];

  // Fill the first row and column with values from 0 to m and 0 to n
  for (let i = 0; i <= m; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  // Loop through the remaining cells of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // Calculate the cost of substitution
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;

      // Find the minimum of three values: insertion, deletion, and substitution
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  // Return the normalized Levenshtein distance score in %
  return (1 - matrix[m][n] / Math.max(m, n)) * 100;
};

// const getCaption = (ctx: MyContext, string?: string) => {
//   switch (string) {
//     case "ask":
//       return "<b>Who's that Pokemon?</b>";
//     case "answer":
//       return `${name(ctx.from as User)} got <b>${ctx.session?.pkmName}</b>`;
//     case "valor3":
//       return "Cadena para valor3";
//     default:
//       return "";
//   }
// };

export const name = (user: User) =>
  user.username ? `@${user.username}` : user.first_name || "";

export const replyMessage = async (
  ctx: MyContext,
  text: string,
  options?: {
    replyTo: number;
  }
) => {
  return await ctx.reply(text, {
    parse_mode: "HTML",
    reply_parameters: { message_id: options?.replyTo || 0 },
  });
};

export const replyMessageToUser = async (ctx: MyContext, text: string) => {
  await replyMessage(ctx, text, { replyTo: ctx.message?.message_id as number });
};

export const replyHint = async (ctx: MyContext) => {
  await replyMessage(ctx, `<b>Who's that Pokemon:</b>\n${ctx.session?.hint}`, {
    replyTo: ctx.session?.messageId as number,
  });
};

export const getChartIndex = (hint: string): number => {
  const index = getRandomNumber(hint.length) - 1;

  if (hint[index] === " " || hint[index] !== "₋") {
    return getChartIndex(hint);
  }

  return index;
};
