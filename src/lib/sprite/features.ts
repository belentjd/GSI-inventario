import type { HairColor, SkinColor, SpriteOptions } from "./options.ts";
import type { SpritePainter } from "./canvas.ts";
import { drawEyes } from "./eyes.ts";
import { drawMouth } from "./mouth.ts";
import { drawGlasses } from "./glasses.ts";

export function drawFeatures(painter: SpritePainter, options: SpriteOptions, hair: HairColor, skin: SkinColor): void {
  painter.setLayer("details");
  drawEyes(painter, options, hair, skin);
  drawMouth(painter, options.mouth);
  drawGlasses(painter, options.glasses);
}
