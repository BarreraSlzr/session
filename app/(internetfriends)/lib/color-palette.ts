type ColorPalette = {
    [colorName: string]: number[];
};

const r = {
    10: 0.8,
    9: 0.8,
    8: 0.8,
    7: 0.7,
    6: 0.6,
    5: 0.5,
    4: 0.4,
    3: 0.3,
    2: 0.2,
    '01': 0.2,
    '00': 0.2
};

const colors: ColorPalette = {
    "Vibrant Pink": [r[10], r['00'], r[5]],       // RGB(255, 0, 127)
    "Energetic Yellow": [r[10], r[10], r['00']],   // RGB(255, 255, 0)
    "Dynamic Orange": [r[10], r[6], r['00']],     // RGB(255, 153, 0)
    "Lively Green": [r['00'], r[10], r[4]],       // RGB(0, 255, 102)
    "Bright Cyan": [r['00'], r[10], r[10]],        // RGB(0, 255, 255)
    "Electric Blue": [r['00'], r[5], r[10]],      // RGB(0, 127, 255)
    "Bright Yellow": [r[9], r[9], r[3]],   // Softer yellow
    "Electric Pink": [r[9], r['01'], r[7]],   // Slightly muted pink
    "Fiery Orange": [r[9], r[5], r['01']],    // Muted orange
    "Lime Green": [r[6], r[9], r[3]],      // Softer lime green
    "Hot Magenta": [r[9], r['01'], r[5]],     // Muted magenta
    "Vibrant Cyan": [r['01'], r[9], r[8]],    // Softer cyan
    "Bold Blue": [r['01'], r[4], r[9]],       // Muted blue
    "Sunset Red": [r[9], r[3], r[4]],      // Softer red
    "Neon Purple": [r[6], r['01'], r[9]],     // Muted purple
    "Radiant Gold": [r[9], r[8], r[3]]     // Softer gold
};

export function getRandomColors(palette: ColorPalette = colors, count: number = 3): number[][] {
    const colorValues = Object.values(palette); // Get only the RGB values
    const selectedColors = new Set<number[]>(); // Use a Set to ensure uniqueness
  
    while (selectedColors.size < count) {
      const randomIndex = Math.floor(Math.random() * colorValues.length);
      selectedColors.add(colorValues[randomIndex]);
    }
  
    return Array.from(selectedColors); // Convert the Set back to an array
  }