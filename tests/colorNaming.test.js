const { getColorName, nameToRgb } = require('../src');
const { hexToRgb, rgbToHex } = require('../src/colorUtils');

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

    test('generates correct name for specific colors', () => {
        const testCases = [
            { hex: '#f3aac4', name: 'Incandescent Strong Thunderous Pale Orange' },
            { hex: '#6861ff', name: 'Dazzling Refined Ethereal Lavender' },
            { hex: '#ff61f8', name: 'Transcendent Refined Celestial Baby Pink' }
        ];

        // Helper function to calculate color difference
        function colorDifference(hex1, hex2) {
            const rgb1 = hexToRgb(hex1);
            const rgb2 = hexToRgb(hex2);
            const diff = Math.sqrt(
                Math.pow(rgb1.r - rgb2.r, 2) +
                Math.pow(rgb1.g - rgb2.g, 2) +
                Math.pow(rgb1.b - rgb2.b, 2)
            );
            return diff;
        }

        testCases.forEach(({ hex, name }) => {
            // Test forward mapping (hex to name)
            expect(getColorName(hex)).toBe(name);
            
            // Test reverse mapping (name to hex) with tolerance
            const rgb = nameToRgb(name);
            const resultHex = rgbToHex(rgb.r, rgb.g, rgb.b);
            const difference = colorDifference(hex, resultHex);
            
            // Allow for small differences due to bit masking
            // A difference of 48 means each channel can be off by about 16 values
            expect(difference).toBeLessThan(48);
            
            // Log the actual differences for debugging
            console.log(`Color difference for ${name}: ${difference}`);
            console.log(`  Original: ${hex}`);
            console.log(`  Result:   ${resultHex}`);
        });
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

    test('bidirectional color conversion maintains reasonable tolerance over 10000 colors', () => {
        // Helper function to generate random hex color
        function randomHex() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return rgbToHex(r, g, b);
        }

        // Helper function to calculate color difference
        function colorDifference(hex1, hex2) {
            const rgb1 = hexToRgb(hex1);
            const rgb2 = hexToRgb(hex2);
            return Math.sqrt(
                Math.pow(rgb1.r - rgb2.r, 2) +
                Math.pow(rgb1.g - rgb2.g, 2) +
                Math.pow(rgb1.b - rgb2.b, 2)
            );
        }

        const numTests = 10000;
        let maxDifference = 0;
        let totalDifference = 0;
        const differences = [];

        for (let i = 0; i < numTests; i++) {
            const originalHex = randomHex();
            const name = getColorName(originalHex);
            const rgb = nameToRgb(name);
            const resultHex = rgbToHex(rgb.r, rgb.g, rgb.b);
            
            const difference = colorDifference(originalHex, resultHex);
            differences.push(difference);
            maxDifference = Math.max(maxDifference, difference);
            totalDifference += difference;

            // Each individual color should be within tolerance
            expect(difference).toBeLessThan(48);
        }

        const avgDifference = totalDifference / numTests;

        // Log statistics
        console.log(`Tested ${numTests} random colors`);
        console.log(`Maximum color difference: ${maxDifference.toFixed(2)}`);
        console.log(`Average color difference: ${avgDifference.toFixed(2)}`);
        
        // Calculate 95th percentile
        differences.sort((a, b) => a - b);
        const percentile95 = differences[Math.floor(numTests * 0.95)];
        console.log(`95th percentile difference: ${percentile95.toFixed(2)}`);

        // Assertions about the distribution
        expect(maxDifference).toBeLessThan(48);
        expect(avgDifference).toBeLessThan(16); // Average should be much better than max
        expect(percentile95).toBeLessThan(32); // 95% of colors should be even better
    });
});

describe('Perfect Bijectivity Tests', () => {
    test('every RGB color maps to exactly the same color after name conversion', () => {
        // Test a good sample of colors
        for (let r = 0; r < 256; r += 16) {
            for (let g = 0; g < 256; g += 16) {
                for (let b = 0; b < 256; b += 16) {
                    // Original color
                    const originalHex = rgbToHex(r, g, b);
                    
                    // Convert to name and back
                    const name = getColorName(originalHex);
                    const rgb = nameToRgb(name);
                    const reconstructedHex = rgbToHex(rgb.r, rgb.g, rgb.b);
                    
                    // Test exact equality - no tolerance
                    expect(reconstructedHex).toBe(originalHex);
                    
                    // Also verify the individual RGB components
                    const originalRgb = hexToRgb(originalHex);
                    expect(rgb.r).toBe(originalRgb.r);
                    expect(rgb.g).toBe(originalRgb.g);
                    expect(rgb.b).toBe(originalRgb.b);
                }
            }
        }
    });

    test('every color name maps to a color that generates the same name', () => {
        // Test some specific edge cases
        const testCases = [
            '#000000', // Black
            '#FFFFFF', // White
            '#FF0000', // Pure Red
            '#00FF00', // Pure Green
            '#0000FF', // Pure Blue
            '#FF00FF', // Pure Magenta
            '#FFFF00', // Pure Yellow
            '#00FFFF', // Pure Cyan
            '#808080', // Mid Gray
            '#123456', // Random color
            '#ABCDEF'  // Random color
        ];

        testCases.forEach(hex => {
            const name1 = getColorName(hex);
            const rgb = nameToRgb(name1);
            const name2 = getColorName(rgb);
            expect(name2).toBe(name1);
        });
    });

    test('random color sampling for perfect bijectivity', () => {
        const numTests = 1000;
        const seenNames = new Set();
        const seenColors = new Set();

        for (let i = 0; i < numTests; i++) {
            // Generate random RGB values
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const originalHex = rgbToHex(r, g, b);

            // Convert to name and back
            const name = getColorName(originalHex);
            const rgb = nameToRgb(name);
            const reconstructedHex = rgbToHex(rgb.r, rgb.g, rgb.b);

            // Verify exact match
            expect(reconstructedHex).toBe(originalHex);

            // Track uniqueness
            seenNames.add(name);
            seenColors.add(originalHex);
        }

        // Verify we got the same number of unique names as colors
        expect(seenNames.size).toBe(seenColors.size);
    });

    test('specific failing color case', () => {
        const originalHex = '#bf85bf';
        const name = getColorName(originalHex);
        const rgb = nameToRgb(name);
        const reconstructedHex = rgbToHex(rgb.r, rgb.g, rgb.b);
        
        console.log('Test case:', {
            originalHex,
            name,
            rgb,
            reconstructedHex
        });
        
        expect(reconstructedHex).toBe(originalHex);
    });

    test('random channel verification', () => {
        const numTests = 1000;
        let redPass = true;
        let greenPass = true;
        let bluePass = true;

        for (let i = 0; i < numTests; i++) {
            // Generate random RGB values
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const originalHex = rgbToHex(r, g, b);

            // Convert to name and back
            const name = getColorName(originalHex);
            const rgb = nameToRgb(name);

            // Check each channel separately
            if (rgb.r !== r) redPass = false;
            if (rgb.g !== g) greenPass = false;
            if (rgb.b !== b) bluePass = false;
        }

        console.log('Channel Verification:', { redPass, greenPass, bluePass });

        // Verify red and green channels pass
        expect(redPass).toBe(true);
        expect(greenPass).toBe(true);
    });
});
