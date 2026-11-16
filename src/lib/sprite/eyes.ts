import type { HairColor, SkinColor, SpriteOptions } from "./options.ts";
import { OUTLINE, type SpritePainter } from "./canvas.ts";

export function drawEyes(painter: SpritePainter, options: SpriteOptions, hair: HairColor, skin: SkinColor): void {
  const pixel = painter.pixel;
  const outline = OUTLINE;
  const eyePair = (color: string, x: number, y: number, width: number, height: number) => {
    pixel(color, x, y, width, height);
    pixel(color, 32 - x - width, y, width, height);
  };
  eyePair(hair.shade, 10, 13, 5, 1);
  if (options.eyeStyle === "happy") {
    eyePair(outline, 11, 16, 3, 1);
    eyePair(outline, 10, 17, 1, 1);
  } else if (options.eyeStyle === "sleepy") {
    eyePair("#fff4df", 10, 16, 4, 2);
    eyePair(outline, 10, 15, 4, 1);
    eyePair(options.eyeColor, 12, 16, 2, 2);
  } else if (options.eyeStyle === "almond") {
    eyePair(outline, 10, 16, 5, 1);
    eyePair("#fff4df", 11, 17, 3, 1);
    eyePair(options.eyeColor, 12, 16, 2, 2);
    eyePair(outline, 10, 17, 1, 1);
  } else if (options.eyeStyle === "lashes") {
    eyePair("#fff4df", 10, 15, 5, 3);
    eyePair(options.eyeColor, 12, 16, 2, 2);
    eyePair(outline, 10, 15, 5, 1);
    eyePair(outline, 9, 14, 1, 2);
    eyePair(outline, 15, 14, 1, 2);
  } else if (options.eyeStyle === "sparkle") {
    eyePair("#fff4df", 10, 15, 5, 4);
    eyePair(options.eyeColor, 11, 16, 3, 3);
    eyePair("#fff4df", 12, 16, 1, 1);
    eyePair(outline, 13, 18, 1, 1);
  } else if (options.eyeStyle === "wink") {
    pixel(outline, 10, 17, 5, 1);
    pixel("#fff4df", 17, 15, 5, 3);
    pixel(options.eyeColor, 18, 16, 2, 2);
    pixel(outline, 18, 16, 1, 1);
  } else if (options.eyeStyle === "normal") {
    eyePair("#fff4df", 10, 15, 5, 3);
    eyePair(options.eyeColor, 12, 16, 2, 2);
    eyePair(outline, 13, 16, 1, 1);
  } else {
    eyePair("#fff4df", 10, 15, 5, 4);
    eyePair(options.eyeColor, 12, 16, 2, 3);
    eyePair(outline, 13, 16, 1, 1);
  }
  pixel(skin.shade, 15, 18, 2, 3);
  pixel(skin.shade, 15, 21, 2, 1);

  if (options.freckles) {
    for (const [x, y] of [[10, 20], [12, 21]]) {
      eyePair(skin.shade, x, y, 1, 1);
    }
  }
}
