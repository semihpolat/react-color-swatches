import { create } from 'zustand';
import { generateHSLColors, getColorName } from '../utils/colorUtils';

const useColorStore = create((set, get) => ({
  saturation: 50,
  lightness: 50,
  colors: [],
  loading: false,
  colorCache: {},
  
  setSaturation: (saturation) => set({ saturation }),
  setLightness: (lightness) => set({ lightness }),
  setColors: (colors) => set({ colors }),
  setLoading: (loading) => set({ loading }),

  fetchColorNames: async () => {
    set({ loading: true });
    const { saturation, lightness, colorCache } = get();
    const colors = generateHSLColors(saturation, lightness);
    const colorsWithTempNames = colors.map(color => ({ ...color, name: 'Loading...' }));
    set({ colors: colorsWithTempNames });

    let i = 0;
    const interval = 2;

    while (i < colors.length) {
      const startColor = colors[i];
      const endIndex = Math.min(i + interval, colors.length - 1);
      const endColor = colors[endIndex];

      const startName = await getColorNameFromCacheOrAPI(startColor, colorCache);
      const endName = await getColorNameFromCacheOrAPI(endColor, colorCache);

      if (startName === endName) {
        updateColorsInRange(i, endIndex, startName, colors, colorCache);
        i = endIndex + 1;
      } else {
        updateStartAndEndColors(i, endIndex, startName, endName, colors, colorCache);
        await updateIntermediateColors(i, endIndex, colors, colorCache);
        i = endIndex + 1;
      }
    }

    set({ loading: false });
  },
}));

const getColorNameFromCacheOrAPI = async (color, colorCache) => {
  const colorKey = `${color.h}-${color.s}-${color.l}`;
  if (colorCache[colorKey]) {
    return colorCache[colorKey];
  }
  const colorName = await getColorName(color.h, color.s, color.l);
  colorCache[colorKey] = colorName;
  return colorName;
};

const updateColorsInRange = (startIndex, endIndex, name, colors, colorCache) => {
  useColorStore.setState(state => {
    const updatedColors = state.colors.map((color, index) => (
      index >= startIndex && index <= endIndex ? { ...color, name } : color
    ));
    return { colors: updatedColors };
  });

  for (let j = startIndex; j <= endIndex; j++) {
    const color = colors[j];
    colorCache[`${color.h}-${color.s}-${color.l}`] = name;
  }
};

const updateStartAndEndColors = (startIndex, endIndex, startName, endName, colors, colorCache) => {
  useColorStore.setState(state => {
    const updatedColors = state.colors.map((color, index) => {
      if (index === startIndex) return { ...color, name: startName };
      if (index === endIndex) return { ...color, name: endName };
      return color;
    });
    return { colors: updatedColors };
  });

  colorCache[`${colors[startIndex].h}-${colors[startIndex].s}-${colors[startIndex].l}`] = startName;
  colorCache[`${colors[endIndex].h}-${colors[endIndex].s}-${colors[endIndex].l}`] = endName;
};

const updateIntermediateColors = async (startIndex, endIndex, colors, colorCache) => {
  for (let j = startIndex + 1; j < endIndex; j++) {
    const midColor = colors[j];
    const colorKey = `${midColor.h}-${midColor.s}-${midColor.l}`;
    if (colorCache[colorKey]) {
      const midName = colorCache[colorKey];
      useColorStore.setState(state => {
        const updatedColors = state.colors.map((color, index) => (
          index === j ? { ...color, name: midName } : color
        ));
        return { colors: updatedColors };
      });
    } else {
      const midName = await getColorName(midColor.h, midColor.s, midColor.l);
      colorCache[colorKey] = midName;
      useColorStore.setState(state => {
        const updatedColors = state.colors.map((color, index) => (
          index === j ? { ...color, name: midName } : color
        ));
        return { colors: updatedColors };
      });
    }
  }
};

export default useColorStore;
