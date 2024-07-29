import MyContext from "../helpers/context.ts";
import {
  getPkmCard,
  getPkmblackImg,
  sendPkmCard,
  setPkm,
} from "../helpers/functions.ts";

export default async (ctx: MyContext) => {
  const id = ctx.session?.pkmId || Math.ceil(Math.random() * (900 - 1));

  if (ctx.session) {
    const img = getPkmCard(getPkmblackImg(id));
    return await sendPkmCard(ctx, img, {
      caption: "ask",
      show_caption_above_media: true,
    });
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

    if (!response.ok) {
      throw new Error(`Not found ${id}`);
    }

    const data = await response.json();

    const img = getPkmCard(getPkmblackImg(id));
    await sendPkmCard(ctx, img, {
      caption: "ask",
      show_caption_above_media: true,
    });

    setPkm(ctx, {
      id,
      name: data.name,
    });
  } catch (error) {
    console.log(error);
  }
};
