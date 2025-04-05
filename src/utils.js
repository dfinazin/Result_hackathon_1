export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function getRandomColorRGB() {
  return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
    Math.random() * 255
  )}, ${Math.round(Math.random() * 255)})`;
}

export function getRandomColorHex() {
  const chars = "0123456789abcdef";
  let colorHex = "#";
  for (let i = 0; i < 6; i += 1) {
    colorHex += chars[Math.round(Math.random() * 15)];
  }
  return colorHex;
}
