const { generateVariations } = require('../src/browser.js');
const { hexToRgb } = require('../src/colorUtils.js');

// Mock DOM elements
document.body.innerHTML = `
  <div id="variations"></div>
`;

// Mock DOM methods
let mockElements = [];
const mockDiv = {
    className: '',
    style: {},
    textContent: '',
    addEventListener: jest.fn(),
    appendChild: jest.fn((el) => mockElements.push(el))
};

document.createElement = jest.fn().mockReturnValue({...mockDiv});
document.getElementById = jest.fn().mockReturnValue({
    innerHTML: '',
    appendChild: jest.fn()
});

describe('Color Variations', () => {
    beforeEach(() => {
        mockElements = [];
    });

    test('Generates 20 unique colors', () => {
        const testColors = [
            '#FF0000', // Red
            '#00FF00', // Green
            '#0000FF', // Blue
            '#FFFFFF', // White
            '#000000'  // Black
        ];

        testColors.forEach(color => {
            const variations = generateVariations(color);
            
            // Check we get exactly 20 variations
            expect(variations.length).toBe(20);
            
            // Check that all variations are unique
            const uniqueHexValues = new Set(variations.map(v => v.hex));
            expect(uniqueHexValues.size).toBe(20);
            
            // Check that all hex values are valid
            variations.forEach(variation => {
                expect(hexToRgb(variation.hex)).toBeTruthy();
            });
        });
    });

    test('generates correct variations', () => {
        const testColors = [
            '#FF0000', // Red
            '#00FF00', // Green
            '#0000FF', // Blue
            '#FFFFFF', // White
            '#000000'  // Black
        ];

        testColors.forEach(baseColor => {
            const variations = generateVariations(baseColor);
            
            // Debug: Find duplicates
            const colorCounts = {};
            variations.forEach((v, i) => {
                const hex = v.hex.toLowerCase();
                if (!colorCounts[hex]) {
                    colorCounts[hex] = [];
                }
                colorCounts[hex].push({ index: i, type: v.type });
            });
            
            Object.entries(colorCounts)
                .filter(([_, occurrences]) => occurrences.length > 1)
                .forEach(([hex, occurrences]) => {
                    console.log('Duplicate color:', hex, occurrences);
                });
            
            // Test 1: We should get exactly 20 variations
            expect(variations.length).toBe(20);
            
            // Test 2: All variations should be unique
            const uniqueColors = new Set(variations.map(v => v.hex.toLowerCase()));
            expect(uniqueColors.size).toBe(20);
            
            // Test 3: No variation should be #030303
            variations.forEach(variation => {
                expect(variation.hex.toLowerCase()).not.toBe('#030303');
            });
            
            // Test 4: All variations should be valid hex colors
            variations.forEach(variation => {
                expect(variation.hex).toMatch(/^#[0-9A-F]{6}$/i);
                const rgb = hexToRgb(variation.hex);
                expect(rgb).toBeTruthy();
            });

            // Test 5: We should have 5 variations of each type
            const typeCounts = variations.reduce((acc, v) => {
                acc[v.type] = (acc[v.type] || 0) + 1;
                return acc;
            }, {});
            
            expect(typeCounts['Saturation']).toBe(5);
            expect(typeCounts['Hue']).toBe(5);
            expect(typeCounts['Mixed']).toBe(5);
            expect(typeCounts['Random']).toBe(5);
        });
    });
});
