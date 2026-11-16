export const OUTLINE = "#231c23";

type SpriteLayer = "rearHair" | "face" | "frontHair" | "hat" | "beard" | "details";

export interface SpritePainter {
  pixel: (color: string, x: number, y: number, width: number, height: number) => void;
  setLayer: (layer: SpriteLayer) => void;
  finishContour: () => void;
}

export function createSpritePainter(canvas: HTMLCanvasElement): SpritePainter {
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("El navegador no admite Canvas 2D.");
  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, 32, 32);

  // El cabello trasero queda bajo la cara; el delantero y el gorro, por encima.
  const layerIds: Record<SpriteLayer, number> = {
    details: 0,
    rearHair: 1,
    face: 2,
    frontHair: 3,
    beard: 5,
    hat: 4,
  };
  const layers = new Uint8Array(32 * 32);
  let layer = 1;
  let clipHairToFace = false;

  const pixel: SpritePainter["pixel"] = (color, x, y, width, height) => {
    context.fillStyle = color;
    if (layer === 3 && clipHairToFace) {
      for (let row = Math.max(0, y); row < Math.min(32, y + height); row++) {
        for (let col = Math.max(0, x); col < Math.min(32, x + width); col++) {
          const index = row * 32 + col;
          if (row >= 13 && layers[index] === 2) continue;
          context.fillRect(col, row, 1, 1);
          layers[index] = 3;
        }
      }
      return;
    }
    context.fillRect(x, y, width, height);
    if (layer) {
      for (let row = Math.max(0, y); row < Math.min(32, y + height); row++) {
        for (let col = Math.max(0, x); col < Math.min(32, x + width); col++) {
          layers[row * 32 + col] = layer;
        }
      }
    }
  };

  const setLayer: SpritePainter["setLayer"] = (nextLayer) => {
    layer = layerIds[nextLayer];
    clipHairToFace = nextLayer === "frontHair";
  };

  const finishContour = () => {
    // El contorno sigue la capa visible y no cambia los píxeles interiores.
    const contour: Array<[number, number]> = [];
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const current = layers[y * 32 + x];
        if (!current) continue;
        const neighbors = [
          y > 0 ? layers[(y - 1) * 32 + x] : 0,
          x < 31 ? layers[y * 32 + x + 1] : 0,
          y < 31 ? layers[(y + 1) * 32 + x] : 0,
          x > 0 ? layers[y * 32 + x - 1] : 0,
        ];
        const isBorder = current === 2
          ? neighbors.some((neighbor) => neighbor !== 2 && neighbor !== 5)
          : current === 4
            ? neighbors.some((neighbor) => neighbor !== 4)
            : neighbors.includes(0);
        if (isBorder) contour.push([x, y]);
      }
    }
    context.fillStyle = OUTLINE;
    for (const [x, y] of contour) context.fillRect(x, y, 1, 1);
  };

  return { pixel, setLayer, finishContour };
}
