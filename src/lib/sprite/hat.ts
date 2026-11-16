import { HAT_COLORS, type SpriteOptions } from "./options.ts";
import { OUTLINE, type SpritePainter } from "./canvas.ts";

export function drawHat(painter: SpritePainter, options: SpriteOptions): void {
  painter.setLayer("hat");
  const pixel = painter.pixel;
  const outline = OUTLINE;
  const hat =
    HAT_COLORS.find(({ color }) => color === options.hatColor) ?? HAT_COLORS[0];
  if (options.hatStyle === "cap") {
    pixel(outline, 10, 1, 12, 1);
    pixel(outline, 7, 2, 17, 2);
    pixel(outline, 5, 4, 21, 5);
    pixel(outline, 4, 8, 23, 2);
    pixel(hat.shade, 6, 5, 19, 4);
    pixel(hat.color, 7, 3, 16, 5);
    pixel(hat.light, 9, 3, 10, 2);
    pixel(hat.shade, 6, 8, 20, 2);
    pixel(outline, 12, 10, 17, 2);
    pixel(hat.color, 13, 10, 15, 1);
    pixel(hat.shade, 15, 11, 11, 1);
  } else if (options.hatStyle === "beanie") {
    pixel(outline, 10, 1, 12, 1);
    pixel(outline, 7, 2, 18, 2);
    pixel(outline, 5, 4, 22, 7);
    pixel(hat.shade, 6, 5, 20, 5);
    pixel(hat.color, 7, 3, 18, 6);
    pixel(hat.light, 10, 3, 9, 2);
    pixel(outline, 5, 10, 22, 3);
    pixel(hat.color, 6, 10, 20, 2);
    pixel(hat.shade, 9, 11, 2, 1);
    pixel(hat.shade, 15, 11, 2, 1);
    pixel(hat.shade, 21, 11, 2, 1);
  } else if (options.hatStyle === "bucket") {
    pixel(outline, 9, 2, 14, 1);
    pixel(outline, 7, 3, 18, 7);
    pixel(hat.shade, 8, 5, 16, 4);
    pixel(hat.color, 8, 4, 16, 4);
    pixel(hat.light, 10, 4, 11, 2);
    pixel(outline, 4, 9, 24, 3);
    pixel(hat.color, 5, 9, 22, 2);
    pixel(hat.shade, 6, 11, 20, 1);
  } else if (options.hatStyle === "beret") {
    pixel(outline, 15, 0, 2, 3);
    pixel(outline, 8, 3, 17, 1);
    pixel(outline, 5, 4, 23, 5);
    pixel(hat.shade, 6, 5, 21, 3);
    pixel(hat.color, 7, 4, 19, 4);
    pixel(hat.light, 9, 4, 10, 2);
    pixel(outline, 8, 9, 19, 2);
    pixel(hat.shade, 9, 9, 17, 1);
  }
}
