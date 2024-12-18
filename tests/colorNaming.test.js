const { getColorName } = require('../src');

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
});
