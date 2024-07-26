import { Composer, limit } from "../deps.ts";

const composer = new Composer();

composer.use(limit());

export default composer;
