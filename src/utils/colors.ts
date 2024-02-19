// Code from https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o

export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function luminance(color: { r: number; g: number; b: number }): number {
  const a = [color.r, color.g, color.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrast(color1: string, color2: string) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const luminance1 = luminance(rgb1);
  const luminance2 = luminance(rgb2);

  if (luminance1 > luminance2) return (luminance1 + 0.05) / (luminance2 + 0.05);
  else return (luminance2 + 0.05) / (luminance1 + 0.05);
}
