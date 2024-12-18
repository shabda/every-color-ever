const { rgbToHex, hexToRgb, rgbToHsv, hsvToRgb } = require('./colorUtils');
const { getColorName } = require('./colorNaming');

// Function to generate variations of a color
function generateVariations(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) {
        console.error('Invalid hex color:', hex);
        return [];
    }
    
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const variations = [];

    // Row 1: Saturation variations
    for (let i = 0; i < 5; i++) {
        const newS = i / 4; // 0, 0.25, 0.5, 0.75, 1
        const newRgb = hsvToRgb(hsv.h, newS, hsv.v);
        variations.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            type: 'Saturation'
        });
    }

    // Row 2: Hue variations
    for (let i = 0; i < 5; i++) {
        const newH = (hsv.h + (i * 72)) % 360; // 0°, 72°, 144°, 216°, 288°
        const newRgb = hsvToRgb(newH, hsv.s, hsv.v);
        variations.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            type: 'Hue'
        });
    }

    // Row 3: Mixed variations (vary all slightly)
    for (let i = 0; i < 5; i++) {
        const hueShift = -30 + (i * 15); // -30°, -15°, 0°, 15°, 30°
        const newH = (hsv.h + hueShift + 360) % 360;
        const newS = Math.max(0, Math.min(1, hsv.s + (Math.random() * 0.4 - 0.2))); // ±20%
        const newV = Math.max(0, Math.min(1, hsv.v + (Math.random() * 0.4 - 0.2))); // ±20%
        const newRgb = hsvToRgb(newH, newS, newV);
        variations.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            type: 'Mixed'
        });
    }

    // Row 4: Random colors
    for (let i = 0; i < 5; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        variations.push({
            hex: rgbToHex(r, g, b),
            type: 'Random'
        });
    }

    // Update DOM
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const container = document.getElementById('variations');
        if (container) {
            container.innerHTML = '';
            variations.forEach(variation => {
                const div = document.createElement('div');
                div.className = 'variation-card';
                
                const colorDiv = document.createElement('div');
                colorDiv.className = 'variation-color';
                colorDiv.style.backgroundColor = variation.hex;
                
                const name = document.createElement('div');
                name.className = 'variation-name';
                name.textContent = getColorName(variation.hex);
                
                const hexValue = document.createElement('div');
                hexValue.className = 'variation-hex';
                hexValue.textContent = variation.hex;
                
                div.appendChild(colorDiv);
                div.appendChild(name);
                div.appendChild(hexValue);
                
                div.addEventListener('click', () => {
                    const rgb = hexToRgb(variation.hex);
                    if (rgb) {
                        updateColor(rgb.r, rgb.g, rgb.b);
                    }
                });
                
                container.appendChild(div);
            });
        }
    }

    return variations;
}

// Function to generate a random color
function generateNewColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    updateColor(r, g, b);
}

// Function to update color display
function updateColor(r, g, b) {
    // Validate RGB values
    if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' ||
        r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        console.error('Invalid RGB values:', r, g, b);
        return;
    }

    const hex = rgbToHex(r, g, b);
    const name = getColorName({r, g, b}); // Pass RGB as an object
    
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        document.getElementById('color-display').style.backgroundColor = hex;
        document.getElementById('hex-value').textContent = hex;
        document.getElementById('color-name').textContent = name;
        
        // Update URL with the new color
        window.history.replaceState({}, '', `?color=${hex.substring(1)}`);
        
        // Update color picker
        document.getElementById('color-picker').value = hex;
    }
    
    // Generate and display variations
    generateVariations(hex);
}

// Function to copy hex value to clipboard
function copyHexToClipboard() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const hexValue = document.getElementById('hex-value').textContent;
        navigator.clipboard.writeText(hexValue);
    }
}

// Only initialize browser-specific code if we're in a browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Initialize color picker
    const colorPicker = document.getElementById('color-picker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const newColor = e.target.value;
            const rgb = hexToRgb(newColor);
            if (rgb) {
                updateColor(rgb.r, rgb.g, rgb.b);
            }
        });
    }

    // Handle browser back/forward buttons
    window.onpopstate = function(event) {
        if (event.state && event.state.color) {
            const rgb = hexToRgb(event.state.color);
            if (rgb) {
                updateColor(rgb.r, rgb.g, rgb.b);
            }
        }
    };

    // Initialize with URL color or random color
    window.onload = function() {
        const urlColor = getUrlColor();
        if (urlColor) {
            const rgb = hexToRgb(urlColor);
            if (rgb) {
                updateColor(rgb.r, rgb.g, rgb.b);
            } else {
                console.error('Invalid hex color:', urlColor);
                generateNewColor();
            }
        } else {
            generateNewColor();
        }
    };

    // Add event listeners when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const newColorBtn = document.getElementById('new-color-btn');
        const copyHexBtn = document.getElementById('copy-hex-btn');
        
        if (newColorBtn) {
            newColorBtn.addEventListener('click', generateNewColor);
        }
        if (copyHexBtn) {
            copyHexBtn.addEventListener('click', copyHexToClipboard);
        }
        
        // Check URL for color parameter
        const params = new URLSearchParams(window.location.search);
        const colorParam = params.get('color');
        
        if (colorParam) {
            const rgb = hexToRgb('#' + colorParam);
            if (rgb) {
                updateColor(rgb.r, rgb.g, rgb.b);
            } else {
                console.error('Invalid hex color:', '#' + colorParam);
                generateNewColor();
            }
        } else {
            generateNewColor();
        }
    });
}

function getUrlColor() {
    const params = new URLSearchParams(window.location.search);
    return params.get('color') ? '#' + params.get('color') : null;
}

// Expose functions to global scope
if (typeof window !== 'undefined') {
    window.generateNewColor = generateNewColor;
    window.copyHexToClipboard = copyHexToClipboard;
}

// Export for testing
module.exports = {
    generateVariations
};
