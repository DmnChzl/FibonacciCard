/**
 * Convert Hex Color To Its Rgba Value (According To Its Opacity)
 *
 * @param {string} hex Hex Color
 * @param {number} opacity Opacity
 * @returns {string} Rgba Value
 */
const hexToRgba = (hex, opacity = 1) => {
  let color;
  const regex = /^#([A-Fa-f0-9]{3}){1,2}$/;

  if (regex.test(hex)) {
    color = hex.substring(1).split('');

    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }

    color = '0x' + color.join('');
    // eslint-disable-next-line
    return 'rgba(' + [(color >> 16) & 255, (color >> 8) & 255, color & 255, opacity].join(', ') + ')';
  }

  // throw new Error('Bad Hex');
  return 'rgba(0, 0, 0, 1)';
};

/**
 * Check If Color Is Lighten
 *
 * @param {string} hexColor Hex Color
 * @param {number} scale Scale (Default: 186)
 * @returns {boolean} Light (Or Not)
 */
export const isLight = (hexColor, scale = 186) => {
  const regex = /\(([^)]+)\)/;

  // CLEARFIX: Handling 'black' & 'white'
  if (hexColor === 'white') {
    hexColor = '#fff';
  } else if (hexColor === 'black') {
    hexColor = '#000';
  }

  const rgbaColor = hexToRgba(hexColor);

  if (regex.test(rgbaColor)) {
    const matches = rgbaColor.match(regex);

    if (matches && matches[1].length > 0) {
      const rgba = matches[1].split(', ');
      const red = parseInt(rgba[0]);
      const green = parseInt(rgba[1]);
      const blue = parseInt(rgba[2]);

      return red * 0.299 + green * 0.587 + blue * 0.114 > scale;
    }
  }

  return undefined;
};

/**
 * Check If Color Is Darken
 *
 * @param {string} hexColor Hex Color
 * @param {number} scale Scale (Default: 186)
 * @returns {boolean} Dark (Or Not)
 */
export const isDark = (hexColor, scale = 186) => !isLight(hexColor, scale);
