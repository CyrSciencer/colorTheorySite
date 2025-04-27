//rgb est en format tableau [255,255,255]
//hsl est en format objet {h:0,s:0,l:0}
//hex est en format string #ffffff
//hsv est en format objet {h:0,s:0,v:0}

//Convertisseurs §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const rgbToHsl = (rgb) => {
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0, // Default hue
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6; // h is now [0, 1]
  }

  // Return h=[0, 360], s=[0, 1], l=[0, 1]
  return {
    h: h * 360,
    s: s,
    l: l,
  };
};

const hslToRgb = (hsl) => {
  // Expects h=[0, 360], s=[0, 1], l=[0, 1]
  let h = hsl.h / 360, // Convert h to [0, 1] for calculation
    s = Math.max(0, Math.min(1, hsl.s)), // Clamp s
    l = Math.max(0, Math.min(1, hsl.l)); // Clamp l
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    // Use standard formulas
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const rgbVersHex = (rgb) => {
  //"Convertit un tableau de 3 valeurs RGB en code hexadécimal."
  // console.log({ rgb });
  const [rouge, vert, bleu] = rgb;

  // Assure que les valeurs sont dans la plage [0, 255]
  const r = Math.max(0, Math.min(255, rouge));
  const v = Math.max(0, Math.min(255, vert));
  const b = Math.max(0, Math.min(255, bleu));

  // Convertit chaque composante en hexadécimal et s'assure qu'elle a deux chiffres
  const hexRouge = r.toString(16).padStart(2, "0");
  const hexVert = v.toString(16).padStart(2, "0");
  const hexBleu = b.toString(16).padStart(2, "0");

  // Concatène les composantes hexadécimales
  const codeHex = "#" + hexRouge + hexVert + hexBleu;
  return codeHex;
};

const HexVersRGB = (hex) => {
  const rouge = parseInt(hex.slice(1, 3), 16);
  const vert = parseInt(hex.slice(3, 5), 16);
  const bleu = parseInt(hex.slice(5, 7), 16);
  return [rouge, vert, bleu];
};

const hslToHsv = (hsl) => {
  // Expects h=[0, 360], s=[0, 1], l=[0, 1]
  const h = hsl.h;
  let s = Math.max(0, Math.min(1, hsl.s)); // Clamp s
  let l = Math.max(0, Math.min(1, hsl.l)); // Clamp l

  // Calculate V and S_hsv in [0, 1]
  const v = l + s * Math.min(l, 1 - l);
  let s_hsv;
  if (v === 0) {
    s_hsv = 0;
  } else {
    s_hsv = 2 * (1 - l / v); // Corrected formula
  }

  // Return h=[0, 360], s_hsv=[0, 1], v=[0, 1]
  return {
    h: h,
    s: Math.max(0, Math.min(1, s_hsv)), // Clamp result
    v: Math.max(0, Math.min(1, v)), // Clamp result
  };
};

const hsvToHsl = (hsv) => {
  // Expects h=[0, 360], s=[0, 1], v=[0, 1]
  const h = hsv.h;
  let s = Math.max(0, Math.min(1, hsv.s)); // Clamp s
  let v = Math.max(0, Math.min(1, hsv.v)); // Clamp v

  // Calculate L and S_hsl in [0, 1]
  const l = v * (1 - s / 2);
  let s_hsl;
  if (l === 0 || l === 1) {
    s_hsl = 0;
  } else {
    // Use standard formula: (v - l) / min(l, 1 - l)
    s_hsl = (v - l) / Math.min(l, 1 - l);
  }

  // Return h=[0, 360], s_hsl=[0, 1], l=[0, 1]
  return {
    h: h,
    s: Math.max(0, Math.min(1, s_hsl)), // Clamp result
    l: Math.max(0, Math.min(1, l)), // Clamp result
  };
};

//contrastes §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const contrast = (hsl) => {
  const colorHues = {
    yellow: { hue: 60, darkRatioHarmony: 3, lightRatioHarmony: 9 },
    red: { hue: 0, darkRatioHarmony: 6, lightRatioHarmony: 6 },
    red2: { hue: 360, darkRatioHarmony: 6, lightRatioHarmony: 6 },
    blue: { hue: 240, darkRatioHarmony: 8, lightRatioHarmony: 4 },
    green: { hue: 120, darkRatioHarmony: 6, lightRatioHarmony: 6 },
    purple: { hue: 270, darkRatioHarmony: 9, lightRatioHarmony: 3 },
    orange: { hue: 30, darkRatioHarmony: 4, lightRatioHarmony: 8 },
    cyan: { hue: 180, darkRatioHarmony: 3, lightRatioHarmony: 9 },
    magenta: { hue: 300, darkRatioHarmony: 7, lightRatioHarmony: 5 },
  };

  // console.log(hsv.h);
  const distances = {
    yellow: Math.min(
      Math.abs(hsl.h - colorHues.yellow.hue),
      Math.abs(hsl.h - colorHues.yellow.hue + 360),
      Math.abs(hsl.h - colorHues.yellow.hue - 360)
    ),
    red: Math.min(
      Math.abs(hsl.h - colorHues.red.hue),
      Math.abs(hsl.h - colorHues.red2.hue)
    ),
    blue: Math.min(
      Math.abs(hsl.h - colorHues.blue.hue),
      Math.abs(hsl.h - colorHues.blue.hue + 360),
      Math.abs(hsl.h - colorHues.blue.hue - 360)
    ),
    green: Math.min(
      Math.abs(hsl.h - colorHues.green.hue),
      Math.abs(hsl.h - colorHues.green.hue + 360),
      Math.abs(hsl.h - colorHues.green.hue - 360)
    ),
    purple: Math.min(
      Math.abs(hsl.h - colorHues.purple.hue),
      Math.abs(hsl.h - colorHues.purple.hue + 360),
      Math.abs(hsl.h - colorHues.purple.hue - 360)
    ),
    orange: Math.min(
      Math.abs(hsl.h - colorHues.orange.hue),
      Math.abs(hsl.h - colorHues.orange.hue + 360),
      Math.abs(hsl.h - colorHues.orange.hue - 360)
    ),
    cyan: Math.min(
      Math.abs(hsl.h - colorHues.cyan.hue),
      Math.abs(hsl.h - colorHues.cyan.hue + 360),
      Math.abs(hsl.h - colorHues.cyan.hue - 360)
    ),
    magenta: Math.min(
      Math.abs(hsl.h - colorHues.magenta.hue),
      Math.abs(hsl.h - colorHues.magenta.hue + 360),
      Math.abs(hsl.h - colorHues.magenta.hue - 360)
    ),
  };
  // console.log(distances);
  const minDistance = Math.min(...Object.values(distances));
  const closestColor = Object.keys(distances).find(
    (key) => distances[key] === minDistance
  );
  // console.log({ closestColor });
  // console.log(colorHues[closestColor]);
  const { darkRatioHarmony, lightRatioHarmony } = colorHues[closestColor];
  return { darkRatioHarmony, lightRatioHarmony, closestColor };
};
// determinatif chaud-froid §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const ofOppositeTemperature = (rgb) => {
  const hsl = rgbToHsl(rgb);
  const warms = [
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 290, 300, 310, 320, 330, 340,
    350,
  ];
  const cools = [
    110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250,
    260, 270, 280,
  ];
  return hsl.h < 100 || hsl.h > 280 ? cools : warms;
};

const InformationTranslationFuncs = {
  rgbToHsl,
  hslToRgb,
  rgbVersHex,
  HexVersRGB,
  hslToHsv,
  hsvToHsl,
  contrast,
  ofOppositeTemperature,
};

export default InformationTranslationFuncs;
