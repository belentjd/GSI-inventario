import {
  HAIR_COLORS,
  SKIN_COLORS,
  type SpriteOptions,
} from "./sprite/options.ts";
import { createSpritePainter } from "./sprite/canvas.ts";
import { drawRearHair, drawFrontHair } from "./sprite/hair.ts";
import { drawFace } from "./sprite/face.ts";
import { drawHat } from "./sprite/hat.ts";
import { drawBeard } from "./sprite/beard.ts";
import { drawFeatures } from "./sprite/features.ts";

export * from "./sprite/options.ts";

export function drawSprite(
  canvas: HTMLCanvasElement,
  options: SpriteOptions,
): void {
  const painter = createSpritePainter(canvas);
  const skin =
    SKIN_COLORS.find(({ color }) => color === options.skinColor) ??
    SKIN_COLORS[1];
  const hair =
    HAIR_COLORS.find(({ color }) => color === options.hairColor) ??
    HAIR_COLORS[1];

  drawRearHair(painter, options.hairStyle, hair);
  const face = drawFace(painter, options.faceShape, skin);
  drawFrontHair(painter, options.hairStyle, hair);
  drawHat(painter, options);
  drawBeard(painter, options.beardStyle, hair, face);
  drawFeatures(painter, options, hair, skin);
  painter.finishContour();
}
