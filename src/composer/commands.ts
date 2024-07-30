import { Composer } from "../deps.ts";
import onSendCard from "../handlers/ch_send_card.ts";
import MyContext from "../helpers/context.ts";
import clearSession from "../middlewares/clear_session.ts";
import onHint from "../handlers/ch_hint.ts";

const composer = new Composer<MyContext>();

composer.command("start", onSendCard);
composer.command("skip", clearSession, onSendCard);
composer.command("hint", onHint);

export default composer;
