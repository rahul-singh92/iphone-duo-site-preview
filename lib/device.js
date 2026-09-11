// Central iPhone Duo display configuration.
// Pixel values are Apple-published display resolutions; CSS viewport values are
// our simulator's logical viewport assumption for the embedded website.
export const DUO_DISPLAY = {
  closed: {
    pixelWidth: 1398,
    pixelHeight: 2034,
    viewportWidth: 466,
    viewportHeight: 678,
    label: 'Closed display',
  },
  open: {
    pixelWidth: 1878,
    pixelHeight: 2670,
    viewportWidth: 626,
    viewportHeight: 890,
    label: 'Open display',
  },
};

export function getDeviceDimensions(mode, orientation) {
  const display = mode === 'single' ? DUO_DISPLAY.closed : DUO_DISPLAY.open;
  const horizontal = orientation === 'horizontal';
  
  // Base dimensions of the screen itself
  const vWidth = horizontal ? display.viewportHeight : display.viewportWidth;
  const vHeight = horizontal ? display.viewportWidth : display.viewportHeight;

  // The .device-shell has 18px padding on all sides (36px total)
  const shellPadding = 36;

  return {
    totalWidth: vWidth + shellPadding,
    totalHeight: vHeight + shellPadding,
    viewportWidth: vWidth,
    viewportHeight: vHeight,
    label: display.label,
  };
}