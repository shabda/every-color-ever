const {
    hexToRgb,
    rgbToHex,
    getMsbIndex,
    getRemainingBits,
    rgbToHsv,
    hsvToRgb,
    getModifierIndices,
    getColorName
} = require('./script.js');

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

describe('Color Name Generation', () => {
    const testCases = [
        {
            hex: '#000000',
            expectedName: 'Shadowed Dusty Stormy Black'
        },
        {
            hex: '#FFFFFF',
            expectedName: 'Dark Dusty Stormy White'
        },
        {
            hex: '#FF0000',
            expectedName: 'Dark Intense Stormy Dark Red'
        },
        {
            hex: '#00FF00',
            expectedName: 'Dark Intense Cloudy Bright Green'
        },
        {
            hex: '#0000FF',
            expectedName: 'Dark Intense Crystal Royal Blue'
        },
        {
            hex: '#FFD700',
            expectedName: 'Dark Intense Stormy Bright Yellow'
        },
        {
            hex: '#800080',
            expectedName: 'Shadowed Dusty Stormy Magenta'
        },
        {
            hex: '#FFA500',
            expectedName: 'Dark Intense Stormy Bright Orange'
        },
        {
            hex: '#008080',
            expectedName: 'Shadowed Dusty Stormy Turquoise'
        },
        {
            hex: '#FF1493',
            expectedName: 'Dark Pure Stormy Deep Pink'
        }
    ];

    testCases.forEach(({ hex, expectedName }) => {
        test(`generates correct name for ${hex}`, () => {
            expect(getColorName(hex)).toBe(expectedName);
        });
    });
});

describe('Color Processing Functions', () => {
    test('getMsbIndex returns correct base color index', () => {
        expect(getMsbIndex({ r: 255, g: 0, b: 0 })).toBeDefined();
        expect(getMsbIndex({ r: 0, g: 255, b: 0 })).toBeDefined();
        expect(getMsbIndex({ r: 0, g: 0, b: 255 })).toBeDefined();
    });

    test('getRemainingBits returns correct lower 6 bits', () => {
        const result = getRemainingBits({ r: 255, g: 128, b: 64 });
        expect(result.r).toBeLessThanOrEqual(63);
        expect(result.g).toBeLessThanOrEqual(63);
        expect(result.b).toBeLessThanOrEqual(63);
    });

    test('rgbToHsv converts correctly', () => {
        const red = rgbToHsv(255, 0, 0);
        expect(red.h).toBe(0);
        expect(red.s).toBe(100);
        expect(red.v).toBe(100);
    });

    test('hsvToRgb converts correctly', () => {
        const rgb = hsvToRgb(0, 100, 100);
        expect(rgb.r).toBe(255);
        expect(rgb.g).toBe(0);
        expect(rgb.b).toBe(0);
    });
});
