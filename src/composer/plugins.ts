import { Composer, limit, session } from "../deps.ts";
import MyContext from "../helpers/context.ts";
import { initial } from "../helpers/session.ts";

const composer = new Composer<MyContext>();

composer.use(limit());
composer.use(session({ initial }));

export default composer;
