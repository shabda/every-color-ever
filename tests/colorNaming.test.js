const { getColorName, nameToRgb } = require('../src');

function rgbToHex(r, g, b) {
    const hex = [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
    return '#' + hex;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

describe('Color Name Generation', () => {
    test('generates correct name for #000000', () => {
        expect(getColorName('#000000')).toBe('Abyssal Muddy Chaotic Black');
    });

    test('generates correct name for #FFFFFF', () => {
        expect(getColorName('#FFFFFF')).toBe('Transcendent Unadulterated Ethereal White');
    });

    test('generates correct name for #FF0000', () => {
        expect(getColorName('#FF0000')).toBe('Transcendent Muddy Chaotic Dark Red');
    });

    test('generates correct name for #00FF00', () => {
        expect(getColorName('#00FF00')).toBe('Abyssal Unadulterated Chaotic Bright Green');
    });

    test('generates correct name for #0000FF', () => {
        expect(getColorName('#0000FF')).toBe('Abyssal Muddy Ethereal Royal Blue');
    });
});

describe('Color Name Uniqueness', () => {
    test('generates sufficient unique names for different colors', () => {
        const colors = [];
        for (let i = 0; i < 1000; i++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const hex = '#' + [r, g, b].map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');
            colors.push(hex);
        }

        const colorNames = new Set(colors.map(getColorName));
        console.log('Generated', colors.length, 'colors');
        console.log('Got', colorNames.size, 'unique names');
        console.log('Duplicate rate:', ((1 - colorNames.size / colors.length) * 100).toFixed(2) + '%');
        
        // We expect a reasonable number of unique names
        expect(colorNames.size).toBeGreaterThan(200);
    });

    test('Color mapping is bijective', () => {
        // Test with a sample of 1000 random colors
        const colors = new Set();
        const names = new Set();
        const colorToName = new Map();
        const nameToColor = new Map();

        // Generate 1000 random colors
        for (let i = 0; i < 1000; i++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const hex = rgbToHex(r, g, b);
            const name = getColorName(hex);

            // Store mappings
            colors.add(hex);
            names.add(name);
            colorToName.set(hex, name);
            
            // If this name was seen before, check if it maps to the same color
            if (nameToColor.has(name)) {
                const previousColor = nameToColor.get(name);
                expect(previousColor).toBe(hex);
            }
            nameToColor.set(name, hex);

            // Verify that converting back to RGB gives us the same color
            const rgb = hexToRgb(hex);
            const backToHex = rgbToHex(rgb.r, rgb.g, rgb.b);
            expect(backToHex).toBe(hex);
        }

        // Verify injective property (one-to-one)
        expect(names.size).toBe(colors.size);

        // Log some statistics
        console.log(`Tested ${colors.size} unique colors`);
        console.log(`Got ${names.size} unique names`);
        console.log(`Collision rate: ${((1 - names.size / colors.size) * 100).toFixed(2)}%`);
    });

    test('nameToRgb correctly converts color names back to RGB', () => {
        const testCases = [
            { name: 'Twilight Ashen Effervescent Light Blue', hex: '#0f8df3' },
            { name: 'Obscured Potent Soft Near White', hex: '#cbf3aa' }
        ];

        testCases.forEach(({ name, hex }) => {
            const rgb = nameToRgb(name);
            const actualHex = rgbToHex(rgb.r, rgb.g, rgb.b);
            expect(actualHex.toLowerCase()).toBe(hex.toLowerCase());
            
            // Verify bijective property - converting back should give the same name
            expect(getColorName(rgb)).toBe(name);
        });
    });
});
