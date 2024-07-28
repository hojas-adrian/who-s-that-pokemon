import { Composer } from "../deps.ts";
import onStarGp from "../handlers/ch_start.ts";

const composer = new Composer();

composer.command("start", onStarGp);

export default composer;
