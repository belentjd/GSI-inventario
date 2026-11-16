import type { HairColor, SpriteOptions } from "./options.ts";
import { OUTLINE, type SpritePainter } from "./canvas.ts";

export function drawRearHair(painter: SpritePainter, hairStyle: SpriteOptions["hairStyle"], hair: HairColor): void {
  painter.setLayer("rearHair");
  const pixel = painter.pixel;
  if (
    ["long", "bob", "extra_long", "wavy", "braids"].includes(hairStyle)
  ) {
    pixel(hair.shade, 5, 7, 22, 19);
    pixel(hair.color, 6, 8, 20, 17);
  }
  if (hairStyle === "extra_long") {
    pixel(hair.shade, 4, 10, 5, 21);
    pixel(hair.shade, 23, 10, 5, 21);
    pixel(hair.color, 5, 11, 4, 20);
    pixel(hair.color, 23, 11, 4, 20);
  } else if (hairStyle === "wavy") {
    [
      [4, 12],
      [3, 18],
      [5, 24],
      [24, 12],
      [26, 18],
      [23, 24],
    ].forEach(([x, y]) => {
      pixel(hair.shade, x, y, 5, 7);
      pixel(hair.color, x + 1, y, 3, 6);
    });
  } else if (hairStyle === "braids") {
    for (let y = 11; y < 29; y += 5) {
      pixel(hair.shade, y % 2 ? 3 : 4, y, 5, 5);
      pixel(hair.color, y % 2 ? 4 : 5, y, 3, 4);
      pixel(hair.shade, y % 2 ? 24 : 25, y, 5, 5);
      pixel(hair.color, y % 2 ? 25 : 26, y, 3, 4);
    }
  } else if (hairStyle === "ponytail") {
    pixel(hair.shade, 24, 6, 5, 8);
    pixel(hair.color, 25, 7, 3, 7);
    pixel(hair.shade, 26, 14, 5, 12);
    pixel(hair.color, 27, 15, 3, 11);
    pixel(hair.shade, 25, 25, 5, 6);
    pixel(hair.color, 26, 25, 3, 5);
  } else if (hairStyle === "curly_long") {
    for (const y of [9, 14, 19, 24]) {
      pixel(hair.shade, 4, y, 6, 6);
      pixel(hair.color, 5, y + 1, 4, 4);
      pixel(hair.shade, 23, y, 6, 6);
      pixel(hair.color, 24, y + 1, 4, 4);
    }
  }
}

export function drawFrontHair(painter: SpritePainter, hairStyle: SpriteOptions["hairStyle"], hair: HairColor): void {
  painter.setLayer("frontHair");
  const pixel = painter.pixel;
  const outline = OUTLINE;
  if (hairStyle === "short") {
    pixel(hair.shade, 7, 5, 18, 6);
    pixel(hair.color, 8, 4, 16, 5);
    pixel(hair.color, 7, 9, 7, 2);
    pixel(hair.color, 22, 8, 3, 4);
  } else if (hairStyle === "side") {
    pixel(hair.shade, 7, 5, 18, 5);
    pixel(hair.color, 8, 4, 16, 4);
    pixel(hair.color, 7, 8, 13, 3);
    pixel(hair.color, 7, 11, 5, 2);
    pixel(hair.shade, 22, 8, 3, 4);
  } else if (hairStyle === "curly") {
    [
      [8, 4],
      [13, 3],
      [18, 4],
      [22, 6],
      [6, 7],
      [11, 7],
      [17, 7],
    ].forEach(([x, y]) => {
      pixel(hair.shade, x, y + 1, 6, 5);
      pixel(hair.color, x + 1, y, 4, 4);
    });
  } else if (hairStyle === "afro") {
    pixel(hair.shade, 7, 2, 18, 10);
    pixel(hair.color, 8, 3, 16, 7);
    for (const [x, y] of [[7, 4], [12, 2], [18, 2], [23, 4], [5, 8], [10, 8], [16, 7], [22, 8]]) {
      pixel(outline, x - 1, y, 6, 6);
      pixel(hair.shade, x, y, 5, 5);
      pixel(hair.color, x + 1, y, 3, 3);
    }
    pixel(hair.color, 8, 12, 5, 1);
    pixel(hair.color, 20, 12, 5, 1);
  } else if (hairStyle === "curly_long") {
    for (const [x, y] of [[8, 5], [13, 3], [19, 4], [6, 9], [12, 8], [19, 9]]) {
      pixel(hair.shade, x, y + 1, 6, 5);
      pixel(hair.color, x + 1, y, 4, 4);
    }
    pixel(hair.color, 5, 12, 4, 5);
    pixel(hair.color, 24, 12, 4, 5);
  } else if (hairStyle === "book") {
    pixel(hair.shade, 7, 4, 18, 6);
    pixel(hair.color, 8, 3, 16, 5);
    pixel(hair.shade, 15, 4, 2, 5);
    pixel(hair.color, 7, 8, 8, 3);
    pixel(hair.color, 17, 8, 8, 3);
    pixel(hair.shade, 7, 11, 5, 2);
    pixel(hair.shade, 20, 11, 5, 2);
    pixel(hair.color, 8, 11, 3, 1);
    pixel(hair.color, 21, 11, 3, 1);
  } else if (hairStyle === "undercut") {
    pixel(hair.shade, 7, 6, 18, 5);
    pixel(hair.color, 9, 3, 14, 6);
    pixel(hair.color, 12, 2, 9, 2);
    pixel(hair.shade, 7, 10, 3, 4);
    pixel(hair.shade, 22, 10, 3, 4);
    pixel(hair.color, 10, 8, 10, 2);
  } else if (hairStyle === "long") {
    pixel(hair.shade, 7, 4, 18, 7);
    pixel(hair.color, 8, 3, 16, 7);
    pixel(hair.color, 6, 8, 5, 17);
    pixel(hair.color, 23, 8, 4, 17);
    pixel(hair.shade, 7, 24, 3, 3);
    pixel(hair.shade, 23, 24, 3, 3);
  } else if (hairStyle === "bob") {
    pixel(hair.shade, 7, 4, 18, 7);
    pixel(hair.color, 8, 3, 16, 6);
    pixel(hair.color, 6, 9, 4, 14);
    pixel(hair.color, 23, 9, 4, 14);
    pixel(hair.shade, 5, 22, 6, 2);
    pixel(hair.shade, 22, 22, 6, 2);
    pixel(hair.color, 9, 9, 7, 2);
  } else if (hairStyle === "extra_long") {
    pixel(hair.shade, 7, 3, 18, 8);
    pixel(hair.color, 8, 2, 16, 8);
    pixel(hair.color, 6, 9, 4, 22);
    pixel(hair.color, 23, 9, 4, 22);
    pixel(hair.shade, 5, 30, 5, 2);
    pixel(hair.shade, 23, 30, 5, 2);
    pixel(hair.shade, 9, 10, 4, 2);
    pixel(hair.color, 17, 9, 7, 2);
  } else if (hairStyle === "wavy") {
    pixel(hair.shade, 7, 4, 18, 7);
    pixel(hair.color, 8, 3, 16, 6);
    pixel(hair.color, 7, 8, 8, 3);
    pixel(hair.color, 22, 8, 4, 4);
    [
      [5, 11],
      [4, 17],
      [6, 23],
      [23, 11],
      [25, 17],
      [23, 23],
    ].forEach(([x, y]) => {
      pixel(hair.color, x, y, 4, 6);
      pixel(hair.shade, x + 1, y + 5, 3, 2);
    });
  } else if (hairStyle === "braids") {
    pixel(hair.shade, 7, 4, 18, 7);
    pixel(hair.color, 8, 3, 16, 6);
    pixel(hair.shade, 15, 3, 2, 6);
    pixel(hair.color, 6, 9, 4, 6);
    pixel(hair.color, 23, 9, 4, 6);
    pixel("#d2a467", 4, 29, 4, 1);
    pixel("#d2a467", 25, 29, 4, 1);
  } else if (hairStyle === "ponytail") {
    pixel(hair.shade, 7, 4, 18, 7);
    pixel(hair.color, 8, 3, 16, 6);
    pixel(hair.color, 7, 8, 12, 3);
    pixel(hair.shade, 20, 7, 5, 4);
    pixel(hair.color, 24, 10, 4, 3);
    pixel("#d2a467", 27, 13, 3, 2);
  } else if (hairStyle === "mohawk") {
    pixel(hair.shade, 12, 2, 8, 7);
    pixel(hair.color, 13, 1, 6, 7);
    pixel(hair.color, 10, 7, 12, 2);
  }
}
