import { Bot } from "./deps.ts";
import { BOT_TOKEN } from "./helpers/constants.ts";
import plugins from "./composer/plugins.ts";
import commands from "./composer/commands.ts";
import inGame from "./middlewares/in_game.ts";
import ohMatch from "./handlers/oh_match.ts";
import clearSession from "./middlewares/clear_session.ts";
import onSendCard from "./handlers/ch_send_card.ts";
import onError from "./handlers/ch_error.ts";
import MyContext from "./helpers/context.ts";

export const bot = new Bot<MyContext>(BOT_TOKEN);

bot.use(plugins);
bot.use(commands);

bot.on("message:text", inGame, ohMatch, clearSession, onSendCard);

bot.catch(onError);
