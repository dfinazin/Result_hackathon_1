import { Module } from "../core/module";
import { random } from "../utils";
import { getRandomColorHex } from "../utils";

export class RandomFigure extends Module {
  #$figure;

  constructor() {
    super("randomFigure", "Произвольная фигура");
  }

  trigger() {
    document.body.style.position = "relative";
    document.body.style.margin = "0";
    // параметры холста
    const bodyHeight = document.body.offsetHeight;
    const bodyWidth = document.body.offsetWidth;
    // параметры фигуры
    const minSizeFigure = 20;
    const figureHeight = random(minSizeFigure, bodyHeight - 10 - minSizeFigure);
    const figureWidth = random(minSizeFigure, bodyWidth - 200 - minSizeFigure);
    const figureRadius = random(0, 1) * 50;
    const figureTop = random(10, bodyHeight - figureHeight);
    const figureLeft = random(200, bodyWidth - figureWidth);
    // максимальный угол поворота фигуры
    const diagonal = Math.sqrt(figureWidth ** 2 + figureHeight ** 2);
    const minContainerSize = Math.min(bodyWidth, bodyHeight);
    const maxAngleRad =
      Math.asin(minContainerSize / diagonal).toFixed(2) - 0.05;
    const figureRotate = random(0, maxAngleRad);
    // создание фигуры
    document.querySelector("div.figure")?.remove();
    const figure = document.createElement("div");
    figure.className = "figure";
    figure.style.height = `${figureHeight}px`;
    figure.style.width = `${figureWidth}px`;

    figure.style.position = "absolute";
    figure.style.top = `${figureTop}px`;
    figure.style.left = `${figureLeft}px`;

    figure.style.transformOrigin = "top left";
    figure.style.transform = `rotate(${figureRotate}deg)`;

    figure.style.borderRadius = `${figureRadius}%`;
    figure.style.border = "2px solid black";
    figure.style.boxSizing = "border-box";
    figure.style.backgroundColor = getRandomColorHex();

    this.#$figure = figure;
    document.body.append(this.#$figure);
  }
}
