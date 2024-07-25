// src/utils/colorUtils.js

export const generateHSLColors = (saturation, lightness) => {
    const colors = [];
  
    for (let i = 0; i < 360; i += 8) { // 360 / 45 = 8
      const hslColor = `hsl(${i}, ${saturation}%, ${lightness}%)`;
      const rgbColor = hslToRgb(i, saturation, lightness);
  
      colors.push({
        hsl: hslColor,
        rgb: rgbColor,
        name: `HSL(${i}, ${saturation}%, ${lightness}%)`, // temporary name
        h: i,
        s: saturation,
        l: lightness
      });
    }
  
    return colors;
  };
  
  // Helper function to convert HSL to RGB
  export const hslToRgb = (h, s, l) => {
    let r, g, b;
  
    h /= 360;
    s /= 100;
    l /= 100;
  
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
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  };
  
  // Helper function to get color name from API
  export const getColorName = async (h, s, l) => {
    const response = await fetch(`https://www.thecolorapi.com/id?&hsl=${h},${s}%,${l}%&format=json`);
    const data = await response.json();
    console.log(data.name)
    return data.name.value;
  };