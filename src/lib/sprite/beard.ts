import type { HairColor, SpriteOptions } from "./options.ts";
import type { SpritePainter } from "./canvas.ts";
import type { FaceProfile } from "./face.ts";

export function drawBeard(painter: SpritePainter, beardStyle: SpriteOptions["beardStyle"], hair: HairColor, face: FaceProfile): void {
  painter.setLayer("beard");
  const pixel = painter.pixel;
  const beardPair = (color: string, x: number, y: number, width: number, height: number) => {
    pixel(color, x, y, width, height);
    pixel(color, 32 - x - width, y, width, height);
  };
  const jawShape = (color: string, startY: number, narrow = false) => {
    for (const [first, last, left] of face.bands) {
      for (let y = Math.max(first, startY); y <= last; y++) {
        if (y < 27) {
          // Deja piel alrededor de la boca y une los laterales bajo ella.
          const target = (y < 23 ? 10 : y === 23 ? 11 : y < 26 ? 12 : 14) - Number(narrow);
          if (left <= target) beardPair(color, left, y, target - left + 1, 1);
        } else {
          pixel(color, left, y, 32 - left * 2, 1);
        }
      }
    }
  };

  if (beardStyle === "stubble") {
    jawShape(hair.color, 23);
    pixel(hair.color, 10, 22, 12, 1);
  } else if (beardStyle === "short") {
    jawShape(hair.shade, 22, true);
    pixel(hair.shade, 10, 22, 12, 1);
  } else if (beardStyle === "full") {
    jawShape(hair.shade, 20);
    pixel(hair.shade, 10, 22, 12, 1);
  } else if (beardStyle === "goatee") {
    beardPair(hair.color, 11, 22, 4, 1);
    for (const [first, last] of face.bands) {
      for (let y = Math.max(first, 26); y <= last; y++) pixel(hair.color, 14, y, 4, 1);
    }
  } else if (beardStyle === "mustache") {
    beardPair(hair.color, 11, 22, 4, 1);
  } else if (beardStyle === "goatee_classic") {
    beardPair(hair.shade, 11, 22, 4, 1);
    pixel(hair.shade, 13, 25, 6, 4);
    pixel(hair.color, 14, 26, 4, 2);
  } else if (beardStyle === "mustache_classic") {
    beardPair(hair.shade, 11, 22, 4, 2);
    beardPair(hair.color, 12, 22, 3, 1);
  }
}
