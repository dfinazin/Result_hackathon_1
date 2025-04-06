import { Module } from "../core/module";
import { random } from "../utils";
import { getRandomColorHex } from "../utils";

export class RandomFigure extends Module {
  #$figure;

  constructor() {
    super("randomFigure", "Произвольная фигура");
  }

  async trigger() {
    document.body.style.position = "relative";
    document.body.style.margin = "0";
    const bodyHeight = document.body.offsetHeight;
    const bodyWidth = document.body.offsetWidth;

    const minSizeFigure = 40;
    const minTopFigure = 10;
    const minLeftFigure = 200;
    const figureHeight = random(minSizeFigure, bodyHeight - minTopFigure - minSizeFigure);
    const figureWidth = random(minSizeFigure, bodyWidth - minLeftFigure - minSizeFigure);
    const figureRadius = random(0, 1) * 50;

    

    const figureTop = random(minTopFigure, bodyHeight - figureHeight);
    const figureLeft = random(minLeftFigure, bodyWidth - figureWidth);
    const maxAngleDeg = this.#maxRotateElement(figureTop,figureLeft,figureHeight,figureWidth,bodyHeight,bodyWidth);
    const figureRotate = random(0, maxAngleDeg);

    const figure = document.createElement("div");
    figure.style.height = `${figureHeight}px`;
    figure.style.width = `${figureWidth}px`;
    figure.style.position = "absolute";
    figure.style.top = `${figureTop}px`;
    figure.style.left = `${figureLeft}px`;
    figure.style.transformOrigin = "top left";
    figure.style.transform = `rotate(${figureRotate}deg)`;
    figure.style.transition = "all 0.5s ease";
    figure.style.opacity = "0";

    if (figureRadius === 0 && figureHeight >= figureWidth) {
      figure.style.borderLeft = `${Math.round(figureWidth / 2)}px solid transparent`;
      figure.style.borderRight = `${Math.round(figureWidth / 2)}px solid transparent`;
      figure.style.borderBottom = `${Math.round(figureHeight / 2)}px solid  ${getRandomColorHex()}`;
      figure.style.backgroundColor = "transparent";
    } else {
      figure.style.borderRadius = `${figureRadius}%`;
      figure.style.border = "2px solid black";
      figure.style.boxSizing = "border-box";
      const imageUrl = `https://www.shutterstock.com/create/assets/asset-gateway/template/previews/${random(22000,24000)}-0.png`;
      try {
        const img = await this.#loadImage(imageUrl);
        figure.style.backgroundSize = "cover";
        figure.style.backgroundImage = `url(${img.src})`;
      } catch {
        figure.style.backgroundColor = getRandomColorHex();
      }
    }

    setTimeout(() => {figure.style.opacity = "1";}, 200);
    setTimeout(() => {figure.style.opacity = "0";}, 2500);
    setTimeout(() => {figure.remove();}, 3000);

    this.#$figure = figure;
    document.body.prepend(this.#$figure);
  }

  #maxRotateElement(figureTop, figureLeft, figureH, figureW, parentH, parentW) {
    const diagonal = Math.sqrt(figureW ** 2 + figureH ** 2);
    const minContainerSize = Math.min(parentW - figureW - figureLeft,parentH - figureH - figureTop);
    const clampedRatio = Math.min(Math.max(minContainerSize / diagonal, -1), 1);
    const maxAngleRad = Math.asin(clampedRatio).toFixed(2) - 0.01;
    const maxAngleDeg = (maxAngleRad * 180) / Math.PI;
    return maxAngleDeg;
  }

  async #loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  remove() {
    this.#$figure.remove()
  }
}
