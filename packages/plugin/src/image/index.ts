import type { DeltaOptions } from "sketching-delta";
import { Delta } from "sketching-delta";

import { DEFAULT_BORDER_COLOR } from "../utils/constant";
import { EMPTY, IMAGE_ATTRS, IMAGE_MODE } from "./constant";

export class Image extends Delta {
  public static KEY = "image";
  public key = Image.KEY;
  private loaded = false;
  private ready?: Promise<Delta>;
  private image!: HTMLImageElement;

  public constructor(options: DeltaOptions) {
    super(options);
    this.updateImage(this.getAttr(IMAGE_ATTRS.SRC));
  }

  setRect(x: number, y: number, width: number, height: number, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.image.width = width;
    this.image.height = height;
    return this;
  }

  public drawing = (ctx: CanvasRenderingContext2D) => {
    if (!this.loaded) return this.ready;
    if (!this.image.naturalWidth) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.clip();
    const borderWidth = Number(this.getAttr(IMAGE_ATTRS.BORDER_WIDTH)) || 0;
    const borderColor = this.getAttr(IMAGE_ATTRS.BORDER_COLOR) || DEFAULT_BORDER_COLOR;
    const halfWidth = borderWidth / 2;
    if (borderColor && borderWidth) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(
        this.x + halfWidth,
        this.y + halfWidth,
        this.width - borderWidth,
        this.height - borderWidth
      );
    }
    const doubleWidth = borderWidth * 2;
    if (this.width > doubleWidth && this.height > doubleWidth) {
      let x = this.x + borderWidth;
      let y = this.y + borderWidth;
      let width = this.width - doubleWidth;
      let height = this.height - doubleWidth;
      const rectWidth = width;
      const rectHeight = height;
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.clip();
      const radio = this.image.naturalHeight / this.image.naturalWidth;
      const mode = this.getAttr(IMAGE_ATTRS.MODE);
      if (mode === IMAGE_MODE.CONTAIN) {
        if (width * radio > height) {
          width = height / radio;
          x = x + (rectWidth - width) / 2;
        } else {
          height = width * radio;
          y = y + (rectHeight - height) / 2;
        }
      } else if (mode === IMAGE_MODE.COVER) {
        if (width * radio > height) {
          height = width * radio;
          y = y + (rectHeight - height) / 2;
        } else {
          width = height / radio;
          x = x + (rectWidth - width) / 2;
        }
      }
      ctx.drawImage(this.image, x, y, width, height);
      ctx.closePath();
    }
    ctx.closePath();
    ctx.restore();
  };

  private updateImage(value: string | null) {
    const image = new globalThis.Image(this.width, this.height);
    this.image = image;
    this.loaded = false;
    this.ready = new Promise(resolve => {
      const finish = () => {
        if (this.image === image) this.loaded = true;
        resolve(this);
      };
      image.onload = finish;
      image.onerror = finish;
      image.src = value || EMPTY;
      if (image.complete) finish();
    });
  }

  public setAttr(key: string, value: string | null): this {
    super.setAttr(key, value);
    if (key === IMAGE_ATTRS.SRC) this.updateImage(value);
    return this;
  }

  public static create = (options: DeltaOptions) => new Image(options);
}
