export const VERSION = [1, 0, 0];

export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") as string;
export const IMGIX_URL = Deno.env.get("IMGIX_URL") as string;
export const IMGIX_URL_1 = Deno.env.get("IMGIX_URL_1") as string;
export const COMMUNITY_CHANNEL_ID = Deno.env.get(
  "COMMUNITY_CHANNEL_ID"
) as string;
