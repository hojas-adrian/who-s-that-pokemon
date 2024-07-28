import { Context, SessionFlavor } from "../deps.ts";
import { SessionData } from "./session.ts";

type MyContext = Context & SessionFlavor<SessionData>;

export default MyContext;
