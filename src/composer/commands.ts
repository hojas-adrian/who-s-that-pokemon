import { Composer } from "../deps.ts";
import onSendCard from "../handlers/ch_send_card.ts";
import MyContext from "../helpers/context.ts";

const composer = new Composer<MyContext>();

composer.command("start", onSendCard);

export default composer;
