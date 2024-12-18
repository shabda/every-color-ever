const { rgbToHex, hexToRgb, rgbToHsv, hsvToRgb } = require('./colorUtils');
const { getColorName } = require('./colorNaming');

// Function to generate variations of a color
function generateVariations(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) {
        console.error('Invalid hex color:', hex);
        return;
    }
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    
    // Generate variations
    const variations = [];
    
    // Generate 20 variations (4 rows x 5 columns)
    // Row 1: Lighter variations
    for (let i = 0; i < 5; i++) {
        const newV = Math.min(1, hsv.v + ((i + 1) * 0.15));
        const newRgb = hsvToRgb(hsv.h, hsv.s, newV);
        variations.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    
    // Row 2: Darker variations
    for (let i = 0; i < 5; i++) {
        const newV = Math.max(0, hsv.v - ((i + 1) * 0.15));
        const newRgb = hsvToRgb(hsv.h, hsv.s, newV);
        variations.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    
    // Row 3: More saturated with hue shift
    for (let i = 0; i < 5; i++) {
        const newH = (hsv.h + (i * 30)) % 360;
        const newS = Math.min(1, hsv.s + 0.2);
        const newRgb = hsvToRgb(newH, newS, hsv.v);
        variations.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    
    // Row 4: Less saturated with hue shift
    for (let i = 0; i < 5; i++) {
        const newH = (hsv.h - (i * 30) + 360) % 360;
        const newS = Math.max(0, hsv.s - 0.2);
        const newRgb = hsvToRgb(newH, newS, hsv.v);
        variations.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    
    // Display variations
    const container = document.getElementById('variations');
    container.innerHTML = ''; // Clear previous variations
    
    variations.forEach(variation => {
        const div = document.createElement('div');
        div.className = 'variation-card';
        
        const colorDiv = document.createElement('div');
        colorDiv.className = 'variation-color';
        colorDiv.style.backgroundColor = variation;
        
        const name = document.createElement('div');
        name.className = 'variation-name';
        name.textContent = getColorName(variation);
        
        const hexValue = document.createElement('div');
        hexValue.className = 'variation-hex';
        hexValue.textContent = variation;
        
        div.appendChild(colorDiv);
        div.appendChild(name);
        div.appendChild(hexValue);
        
        div.addEventListener('click', () => {
            const rgb = hexToRgb(variation);
            if (rgb) {
                updateColor(rgb.r, rgb.g, rgb.b);
            }
        });
        
        container.appendChild(div);
    });
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
    
    document.getElementById('color-display').style.backgroundColor = hex;
    document.getElementById('hex-value').textContent = hex;
    document.getElementById('color-name').textContent = name;
    
    // Update URL with the new color
    window.history.replaceState({}, '', `?color=${hex.substring(1)}`);
    
    // Update color picker
    document.getElementById('color-picker').value = hex;

    // Generate and display variations
    generateVariations(hex);
}

// Function to copy hex value to clipboard
function copyHexToClipboard() {
    const hexValue = document.getElementById('hex-value').textContent;
    navigator.clipboard.writeText(hexValue);
}

// Handle browser back/forward buttons
window.onpopstate = function(event) {
    if (event.state && event.state.color) {
        const rgb = hexToRgb(event.state.color);
        if (rgb) {
            updateColor(rgb.r, rgb.g, rgb.b);
        } else {
            console.error('Invalid hex color:', event.state.color);
        }
    } else {
        const urlColor = getUrlColor();
        if (urlColor) {
            const rgb = hexToRgb(urlColor);
            if (rgb) {
                updateColor(rgb.r, rgb.g, rgb.b);
            } else {
                console.error('Invalid hex color:', urlColor);
            }
        } else {
            generateNewColor();
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
        }
    } else {
        generateNewColor();
    }
};

function getUrlColor() {
    const params = new URLSearchParams(window.location.search);
    return params.get('color') ? '#' + params.get('color') : null;
}

// Initialize color picker
const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('input', (e) => {
    const newColor = e.target.value;
    const rgb = hexToRgb(newColor);
    if (rgb) {
        updateColor(rgb.r, rgb.g, rgb.b);
    } else {
        console.error('Invalid hex color:', newColor);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Button event listeners
    document.getElementById('new-color-btn').addEventListener('click', generateNewColor);
    document.getElementById('copy-hex-btn').addEventListener('click', copyHexToClipboard);
    
    // Check URL for color parameter
    const params = new URLSearchParams(window.location.search);
    const colorParam = params.get('color');
    
    if (colorParam) {
        const rgb = hexToRgb('#' + colorParam);
        if (rgb) {
            updateColor(rgb.r, rgb.g, rgb.b);
        } else {
            console.error('Invalid hex color:', '#' + colorParam);
            generateNewColor(); // Fallback to random color if URL color is invalid
        }
    } else {
        generateNewColor();
    }
});

// Expose functions to global scope
window.generateNewColor = generateNewColor;
window.copyHexToClipboard = copyHexToClipboard;
