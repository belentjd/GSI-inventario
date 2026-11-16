import type { SpriteOptions } from "./options.ts";
import { OUTLINE, type SpritePainter } from "./canvas.ts";

export function drawMouth(painter: SpritePainter, mouth: SpriteOptions["mouth"]): void {
  const pixel = painter.pixel;
  const outline = OUTLINE;
  if (mouth === "smile") {
    pixel(outline, 12, 23, 1, 1);
    pixel(outline, 13, 24, 6, 1);
    pixel(outline, 19, 23, 1, 1);
  } else if (mouth === "neutral") {
    pixel(outline, 13, 24, 6, 1);
  } else {
    pixel(outline, 14, 23, 4, 3);
    pixel("#b76674", 15, 25, 2, 1);
  }
}
