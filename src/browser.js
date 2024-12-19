const { rgbToHex, hexToRgb, rgbToHsv, hsvToRgb } = require('./colorUtils');
const { getColorName, nameToRgb } = require('./colorNaming');

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
        // Use exponential steps for more visual difference
        // This gives us roughly: 0%, 6%, 25%, 60%, 100%
        const t = i / 4;  // 0 to 1
        const newS = Math.round(t * t * 100);
        // Ensure some minimum value for saturation variations
        const newV = Math.max(hsv.v, 30);
        const newRgb = hsvToRgb(hsv.h, newS, newV);
        variations.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            type: 'Saturation'
        });
    }

    // Row 2: Hue variations
    for (let i = 0; i < 5; i++) {
        // Start at 30° and go around the wheel
        // This gives us: 30°, 102°, 174°, 246°, 318°
        const newH = (hsv.h + 30 + (i * 72)) % 360;
        // Ensure some minimum saturation and value for hue variations
        const newS = Math.max(hsv.s, 30);
        const newV = Math.max(hsv.v, 30);
        const newRgb = hsvToRgb(newH, newS, newV);
        variations.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            type: 'Hue'
        });
    }

    // Row 3: Mixed variations (vary all slightly)
    for (let i = 0; i < 5; i++) {
        // Vary hue by -20%, -10%, 0, +10%, +20% of 360 degrees
        const hueShift = ((i - 2) * 0.2) * 360;
        const newH = (hsv.h + hueShift + 360) % 360;
        
        // Vary saturation by -20%, -10%, 0, +10%, +20% of current saturation
        const satShift = (i - 2) * 0.2 * hsv.s;
        const newS = Math.max(0, Math.min(100, hsv.s + satShift));
        
        // Vary value by -20%, -10%, 0, +10%, +20% of current value
        const valShift = (i - 2) * 0.2 * hsv.v;
        const newV = Math.max(0, Math.min(100, hsv.v + valShift));
        
        // Make bigger changes for more variety
        const finalH = (newH + (i * 30)) % 360;
        const finalS = Math.max(20, Math.min(100, newS + (i - 2) * 10));
        const finalV = Math.max(20, Math.min(100, newV + (i - 2) * 10));
        
        const newRgb = hsvToRgb(finalH, finalS, finalV);
        const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        
        const variation = {
            hex: newHex,
            type: 'Mixed'
        };
        
        variations.push(variation);
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
        
        // Update URL with the color name using dashes instead of spaces
        const urlName = name.replace(/\s+/g, '-');
        window.history.replaceState({}, '', `?color=${urlName}`);
        
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

    // Function to get color from URL
    function getUrlColor() {
        const params = new URLSearchParams(window.location.search);
        const colorName = params.get('color');
        if (!colorName) return null;
        
        try {
            // Convert dashes back to spaces for color name lookup
            const decodedName = colorName.replace(/-+/g, ' ');
            const rgb = nameToRgb(decodedName);
            if (rgb) {
                return rgbToHex(rgb.r, rgb.g, rgb.b);
            }
        } catch (error) {
            console.error('Error converting color name to RGB:', error);
        }
        return null;
    }

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
        const nameToHexBtn = document.getElementById('name-to-hex-btn');
        const nameInput = document.getElementById('color-name-input');
        const nameInputContainer = document.getElementById('name-input-container');
        const nameResult = document.getElementById('name-result');
        const nameResultColor = document.getElementById('name-result-color');
        const nameResultHex = document.getElementById('name-result-hex');
        
        if (newColorBtn) {
            newColorBtn.addEventListener('click', generateNewColor);
        }

        if (nameToHexBtn) {
            nameToHexBtn.addEventListener('click', () => {
                nameInputContainer.classList.toggle('hidden');
                if (!nameInputContainer.classList.contains('hidden')) {
                    nameInput.focus();
                }
            });
        }

        if (nameInput) {
            nameInput.addEventListener('input', () => {
                const colorName = nameInput.value.trim();
                try {
                    const rgb = nameToRgb(colorName);
                    if (rgb) {
                        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                        nameResultColor.style.backgroundColor = hex;
                        nameResultHex.textContent = hex;
                        nameResult.classList.remove('hidden');
                    } else {
                        nameResult.classList.add('hidden');
                    }
                } catch (error) {
                    nameResult.classList.add('hidden');
                }
            });
        }
        
        // Check URL for color parameter
        const params = new URLSearchParams(window.location.search);
        const colorName = params.get('color');
        
        if (colorName) {
            try {
                // Convert dashes back to spaces for color name lookup
                const decodedName = colorName.replace(/-+/g, ' ');
                const rgb = nameToRgb(decodedName);
                if (rgb) {
                    updateColor(rgb.r, rgb.g, rgb.b);
                } else {
                    console.error('Invalid color name:', decodedName);
                    generateNewColor();
                }
            } catch (error) {
                console.error('Error processing color name:', error);
                generateNewColor();
            }
        } else {
            generateNewColor();
        }
    });
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
