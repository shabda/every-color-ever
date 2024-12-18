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
            expectedName: 'Abyssal Muddy Chaotic Black'
        },
        {
            hex: '#FFFFFF',
            expectedName: 'Transcendent Unadulterated Ethereal White'
        },
        {
            hex: '#FF0000',
            expectedName: 'Transcendent Muddy Chaotic Dark Red'
        },
        {
            hex: '#00FF00',
            expectedName: 'Abyssal Unadulterated Chaotic Bright Green'
        },
        {
            hex: '#0000FF',
            expectedName: 'Abyssal Muddy Ethereal Royal Blue'
        }
    ];

    testCases.forEach(({ hex, expectedName }) => {
        test(`generates correct name for ${hex}`, () => {
            expect(getColorName(hex)).toBe(expectedName);
        });
    });
});

describe('Color Processing Functions', () => {
    test('rgbToHsv converts correctly', () => {
        const red = rgbToHsv(255, 0, 0);
        expect(red.h).toBe(0);
        expect(red.s).toBe(100);
        expect(red.v).toBe(100);

        const green = rgbToHsv(0, 255, 0);
        expect(green.h).toBe(120);
        expect(green.s).toBe(100);
        expect(green.v).toBe(100);

        const blue = rgbToHsv(0, 0, 255);
        expect(blue.h).toBe(240);
        expect(blue.s).toBe(100);
        expect(blue.v).toBe(100);
    });

    test('hsvToRgb converts correctly', () => {
        const red = hsvToRgb(0, 100, 100);
        expect(red).toEqual({ r: 255, g: 0, b: 0 });

        const green = hsvToRgb(120, 100, 100);
        expect(green).toEqual({ r: 0, g: 255, b: 0 });

        const blue = hsvToRgb(240, 100, 100);
        expect(blue).toEqual({ r: 0, g: 0, b: 255 });
    });
});

describe('Color Name Uniqueness', () => {
    test('generates sufficient unique names for different colors', () => {
        const colorNames = new Set();
        const colors = [];
        
        // Generate 1000 colors by incrementing RGB values
        for (let i = 0; i < 1000; i++) {
            const r = (i * 7) % 256;  // Use prime numbers to get good distribution
            const g = (i * 11) % 256;
            const b = (i * 13) % 256;
            const hex = rgbToHex(r, g, b);
            const name = getColorName(hex);
            
            colorNames.add(name);
            colors.push({ hex, name });
        }

        // Check for duplicates
        const duplicates = colors.filter((color, index) => 
            colors.findIndex(c => c.name === color.name) !== index
        );

        // Log some stats
        console.log(`Generated ${colors.length} colors`);
        console.log(`Got ${colorNames.size} unique names`);
        console.log(`Duplicate rate: ${((duplicates.length / colors.length) * 100).toFixed(2)}%`);

        // We should get at least 200 unique names from 1000 colors
        // This is a reasonable expectation given our color quantization
        expect(colorNames.size).toBeGreaterThan(200);
    });
});
