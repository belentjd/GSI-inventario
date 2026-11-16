import type { SkinColor, SpriteOptions } from "./options.ts";
import type { SpritePainter } from "./canvas.ts";

export interface FaceProfile {
  bands: Array<[number, number, number]>;
}

const faceProfiles: Record<SpriteOptions["faceShape"], FaceProfile> = {
  oval: {
    bands: [[5, 6, 10], [7, 9, 8], [10, 22, 7], [23, 25, 8], [26, 26, 10], [27, 27, 11]],
  },
  round: {
    bands: [[5, 6, 9], [7, 9, 7], [10, 22, 5], [23, 25, 6], [26, 26, 8], [27, 27, 10]],
  },
  square: {
    bands: [[5, 6, 8], [7, 26, 7], [27, 27, 8]],
  },
  heart: {
    bands: [[5, 6, 8], [7, 14, 6], [15, 21, 7], [22, 23, 9], [24, 25, 11], [26, 26, 12], [27, 27, 13]],
  },
  diamond: {
    bands: [[5, 6, 10], [7, 9, 8], [10, 18, 6], [19, 22, 7], [23, 25, 9], [26, 27, 11]],
  },
  long: {
    bands: [[5, 6, 9], [7, 10, 7], [11, 25, 7], [26, 27, 8], [28, 29, 10]],
  },
};

export function drawFace(painter: SpritePainter, faceShape: SpriteOptions["faceShape"], skin: SkinColor): FaceProfile {
  painter.setLayer("face");
  const pixel = painter.pixel;
  const face = faceProfiles[faceShape] ?? faceProfiles.oval;
  pixel(skin.shade, 4, 16, 3, 5);
  pixel(skin.shade, 25, 16, 3, 5);
  for (const [startY, endY, left] of face.bands) {
    pixel(skin.color, left, startY, 32 - left * 2, endY - startY + 1);
  }
  return face;
}
