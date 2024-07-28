import { Composer } from "../deps.ts";
import onStarGp from "../handlers/ch_start.ts";
import MyContext from "../helpers/context.ts";

const composer = new Composer<MyContext>();

composer.command("start", onStarGp);

export default composer;
