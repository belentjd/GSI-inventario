import type { SpriteOptions } from "./options.ts";
import { OUTLINE, type SpritePainter } from "./canvas.ts";

export function drawGlasses(
  painter: SpritePainter,
  glasses: SpriteOptions["glasses"],
): void {
  const pixel = painter.pixel;
  const outline = OUTLINE;
  const eyePair = (
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    pixel(color, x, y, width, height);
    pixel(color, 32 - x - width, y, width, height);
  };
  if (glasses === "round") {
    eyePair(outline, 9, 14, 6, 1);
    eyePair(outline, 9, 18, 6, 1);
    eyePair(outline, 9, 15, 1, 3);
    eyePair(outline, 14, 15, 1, 3);
    pixel(outline, 15, 15, 2, 1);
  } else if (glasses === "square") {
    // Solo la montura: los ojos dibujados debajo permanecen intactos.
    eyePair(outline, 8, 14, 8, 1);
    eyePair(outline, 8, 19, 8, 1);
    eyePair(outline, 8, 15, 1, 4);
    eyePair(outline, 15, 15, 1, 4);
    pixel(outline, 15, 15, 2, 1);
  } else if (glasses === "sun") {
    eyePair("#344255", 9, 15, 6, 4);
    pixel(outline, 15, 15, 2, 1);
  } else if (glasses === "thin") {
    const frame = "#231C24";
    eyePair(frame, 9, 15, 6, 1);
    eyePair(frame, 9, 18, 6, 1);
    eyePair(frame, 9, 16, 1, 2);
    eyePair(frame, 14, 16, 1, 2);
    pixel(frame, 15, 16, 2, 1);
  } else if (glasses === "cat") {
    eyePair(outline, 8, 13, 2, 3);
    eyePair(outline, 9, 15, 6, 1);
    eyePair(outline, 10, 18, 5, 1);
    eyePair(outline, 9, 16, 1, 2);
    eyePair(outline, 14, 16, 1, 2);
    pixel(outline, 15, 16, 2, 1);
  } else if (glasses === "aviator") {
    eyePair(outline, 9, 14, 6, 1);
    eyePair(outline, 9, 15, 1, 3);
    eyePair(outline, 10, 18, 5, 1);
    eyePair(outline, 11, 19, 3, 1);
    eyePair(outline, 14, 15, 1, 3);
    pixel(outline, 15, 15, 2, 1);
  } else if (glasses === "mono") {
    pixel("#d2a467", 17, 14, 7, 1);
    pixel("#d2a467", 17, 18, 7, 1);
    pixel("#d2a467", 17, 15, 1, 3);
    pixel("#d2a467", 23, 15, 1, 3);
    pixel("#d2a467", 24, 18, 1, 6);
  }
}
