import { Bot } from "./deps.ts";
import { BOT_TOKEN } from "./helpers/constants.ts";
import plugins from "./composer/plugins.ts";
import commands from "./composer/commands.ts";
import onError from "./handlers/ch_error.ts";
import MyContext from "./helpers/context.ts";

export const bot = new Bot<MyContext>(BOT_TOKEN);

bot.use(plugins);
bot.use(commands);
bot.catch(onError);
