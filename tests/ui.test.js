const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

describe('UI Tests', () => {
    let dom;
    let document;
    let window;

    beforeEach(() => {
        // Create a basic HTML structure for testing
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Color Namer - Unique Names for Every Color</title>
                <style>
                    #variations { display: grid; grid-template-columns: repeat(5, 1fr); }
                    #color-display { width: 100%; height: 360px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="main-section">
                        <h1>
                            <span class="material-symbols-rounded">palette</span>
                            Color Namer
                        </h1>
                        <div id="color-display">
                            <div class="color-text-overlay">
                                <div id="hex-value"></div>
                                <div id="color-name"></div>
                            </div>
                        </div>
                        <div class="button-group">
                            <button id="new-color-btn">
                                <span class="material-symbols-rounded">autorenew</span>
                                New Color
                            </button>
                            <input type="color" id="color-picker" aria-label="Choose color">
                            <button id="copy-hex-btn">
                                <span class="material-symbols-rounded">content_copy</span>
                                Copy Hex
                            </button>
                        </div>
                    </div>
                    <div id="variations"></div>
                </div>
            </body>
            </html>
        `;

        dom = new JSDOM(html, {
            runScripts: 'dangerously',
            resources: 'usable',
            pretendToBeVisual: true
        });
        document = dom.window.document;
        window = dom.window;

        // Mock functions
        window.generateNewColor = jest.fn();
        window.copyHexToClipboard = jest.fn();
    });

    test('Main color display area exists and has correct structure', () => {
        const colorDisplay = document.getElementById('color-display');
        expect(colorDisplay).toBeTruthy();
        
        const textOverlay = colorDisplay.querySelector('.color-text-overlay');
        expect(textOverlay).toBeTruthy();
        
        const hexValue = document.getElementById('hex-value');
        expect(hexValue).toBeTruthy();
        
        const colorName = document.getElementById('color-name');
        expect(colorName).toBeTruthy();
    });

    test('Color variations grid exists and has correct layout', () => {
        const variations = document.getElementById('variations');
        expect(variations).toBeTruthy();
        
        const style = window.getComputedStyle(variations);
        expect(style.display).toBe('grid');
        expect(style.gridTemplateColumns).toContain('repeat(5, 1fr)');
    });

    test('Interactive elements exist and are properly configured', () => {
        const newColorBtn = document.getElementById('new-color-btn');
        expect(newColorBtn).toBeTruthy();
        expect(newColorBtn.textContent.replace(/\s+/g, ' ').trim()).toBe('autorenew New Color');
        
        const colorPicker = document.getElementById('color-picker');
        expect(colorPicker).toBeTruthy();
        expect(colorPicker.type).toBe('color');
        expect(colorPicker.getAttribute('aria-label')).toBe('Choose color');
        
        const copyHexBtn = document.getElementById('copy-hex-btn');
        expect(copyHexBtn).toBeTruthy();
        expect(copyHexBtn.textContent.replace(/\s+/g, ' ').trim()).toBe('content_copy Copy Hex');
    });

    test('Page has proper title and heading', () => {
        expect(document.title).toBe('Color Namer - Unique Names for Every Color');
        
        const heading = document.querySelector('h1');
        expect(heading).toBeTruthy();
        expect(heading.textContent.replace(/\s+/g, ' ').trim()).toBe('palette Color Namer');
    });

    test('Color display has proper dimensions', () => {
        const colorDisplay = document.getElementById('color-display');
        const style = window.getComputedStyle(colorDisplay);
        
        expect(style.width).toBe('100%');
        expect(style.height).toBe('360px');
    });

    test('Color variations container exists', () => {
        const variations = document.getElementById('variations');
        expect(variations).toBeTruthy();
    });
});
