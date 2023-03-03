const defaultColors = {
  MP: { color: '#ff5630', textColor: '#000' },
  FEAT: { color: '#6555c0', textColor: '#fff' },
  INCID: { color: '#00c7e6', textColor: '#000' },
  QA: { color: '#2684ff', textColor: '#000' },
  IMP: { color: '#ffc400', textColor: '#000' },
};

export class RGB {
  public r: number;
  public g: number;
  public b: number;

  constructor(color: string) {
    const isHex = color.startsWith('#');
    const rgb = isHex ? hexStringToRgb(color) : rgbStringToRGB(color);
    if (!rgb) throw new Error('Invalid color');
    const { r, g, b } = rgb;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public toString() {
    return toRGBString(this);
  }

  public textColor() {
    return textColor(this);
  }

  public toHex() {
    return rgbToHex(this);
  }
}

const white = new RGB('rgb(255,255,255)');
const black = new RGB('rgb(0,0,0)');

function hexStringToRgb(hexString: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(rgb: RGB) {
  const { r, g, b } = rgb;
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function luminance(color: RGB) {
  const { r, g, b } = color;
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast_ratio(color1: RGB, color2: RGB) {
  const color1Luminance = luminance(color1);
  const color2Luminance = luminance(color2);
  const brightest = Math.max(color1Luminance, color2Luminance);
  const darkest = Math.min(color1Luminance, color2Luminance);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return ratio;
}

function textColor(color: RGB) {
  const whiteContrast = contrast_ratio(color, white);
  const blackContrast = contrast_ratio(color, black);
  return whiteContrast > blackContrast ? white : black;
}

function toRGBString(color: RGB) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function rgbStringToRGB(color: string): { r: number; g: number; b: number } {
  const [r, g, b] = color
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map((v) => parseInt(v));
 
  if (isNaN(r) || isNaN(g) || isNaN(b)) throw new Error('Invalid color');
  return { r, g, b };
}

export {
  defaultColors,
  luminance,
  contrast_ratio,
  textColor,
  toRGBString,
  rgbStringToRGB as fromRBGstring,
  white,
  black,
};
