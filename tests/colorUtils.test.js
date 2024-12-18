const {
    hexToRgb,
    rgbToHex,
    rgbToHsv,
    hsvToRgb
} = require('../src');

describe('Color Conversion Functions', () => {
    test('hexToRgb converts hex colors correctly', () => {
        expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
        expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
        expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
        expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
        expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    test('rgbToHex converts RGB values correctly', () => {
        expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
        expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
        expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
        expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
        expect(rgbToHex(0, 0, 0)).toBe('#000000');
    });
});

describe('Color Processing Functions', () => {
    test('rgbToHsv converts correctly', () => {
        const red = rgbToHsv(255, 0, 0);
        expect(red.h).toBeCloseTo(0);
        expect(red.s).toBeCloseTo(100);
        expect(red.v).toBeCloseTo(100);

        const green = rgbToHsv(0, 255, 0);
        expect(green.h).toBeCloseTo(120);
        expect(green.s).toBeCloseTo(100);
        expect(green.v).toBeCloseTo(100);

        const blue = rgbToHsv(0, 0, 255);
        expect(blue.h).toBeCloseTo(240);
        expect(blue.s).toBeCloseTo(100);
        expect(blue.v).toBeCloseTo(100);
    });

    test('hsvToRgb converts correctly', () => {
        expect(hsvToRgb(0, 100, 100)).toEqual({ r: 255, g: 0, b: 0 });
        expect(hsvToRgb(120, 100, 100)).toEqual({ r: 0, g: 255, b: 0 });
        expect(hsvToRgb(240, 100, 100)).toEqual({ r: 0, g: 0, b: 255 });
    });
});
