import { Bot } from "./deps.ts";
import { BOT_TOKEN } from "./helpers/constants.ts";
import plugins from "./composer/plugins.ts";

export const bot = new Bot(BOT_TOKEN);

bot.use(plugins);
