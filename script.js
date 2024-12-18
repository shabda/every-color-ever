   // Base color lists
const baseColors = [
    // B = 00
    "Black", "Deep Green", "Green", "Bright Green",
    "Brown", "Olive", "Yellow Green", "Lime",
    "Red", "Rust", "Orange", "Yellow",
    "Dark Red", "Red Brown", "Bright Orange", "Bright Yellow",
    
    // B = 01
    "Navy", "Teal", "Sea Green", "Spring Green",
    "Deep Purple", "Gray Green", "Sage", "Light Green",
    "Deep Rose", "Mauve", "Tan", "Khaki",
    "Wine", "Rose Brown", "Peach", "Light Yellow",
    
    // B = 10
    "Blue", "Blue Green", "Turquoise", "Aqua",
    "Purple", "Blue Gray", "Pale Green", "Light Cyan",
    "Magenta", "Purple Pink", "Pink Orange", "Pale Yellow",
    "Deep Pink", "Rose Pink", "Light Orange", "Near White",
    
    // B = 11
    "Royal Blue", "Sky Blue", "Light Blue", "Pale Blue",
    "Violet", "Lavender", "Pale Turquoise", "Ice Blue",
    "Bright Purple", "Light Purple", "Light Pink", "Pearl",
    "Hot Pink", "Baby Pink", "Pale Orange", "White"
];

const luminosityWords = [
    "Shadowed", "Dark", "Deep", "Muted", 
    "Clear", "Bright", "Brilliant", "Radiant"
];

const purityWords = [
    "Dusty", "Soft", "Mild", "Clean",
    "Pure", "Rich", "Vivid", "Intense"
];

const atmosphericWords = [
    "Stormy", "Misty", "Cloudy", "Airy",
    "Crystal", "Silken", "Velvet", "Gossamer"
];

// Utility functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function getMsbIndex(rgb) {
    const rBits = (rgb.r >> 6) & 0x03;
    const gBits = (rgb.g >> 6) & 0x03;
    const bBits = (rgb.b >> 6) & 0x03;
    return (bBits << 4) | (rBits << 2) | gBits;
}

function getRemainingBits(rgb) {
    return {
        r: rgb.r & 0x3F,
        g: rgb.g & 0x3F,
        b: rgb.b & 0x3F
    };
}

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    
    let h;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: h * 360,
        s: s * 100,
        v: v * 100
    };
}

function hsvToRgb(h, s, v) {
    h = h / 360;
    s = s / 100;
    v = v / 100;
    
    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function getModifierIndices(hsb) {
    return {
        luminosity: Math.floor(hsb.v / 100 * 7),
        purity: Math.floor(hsb.s / 100 * 7),
        atmospheric: Math.floor(hsb.h / 360 * 7)
    };
}

function getColorName(hex) {
    const rgb = hexToRgb(hex);
    const baseColorIndex = getMsbIndex(rgb);
    const remaining = getRemainingBits(rgb);
    const hsb = rgbToHsv(remaining.r, remaining.g, remaining.b);
    const modifiers = getModifierIndices(hsb);
    
    return `${luminosityWords[modifiers.luminosity]} ${purityWords[modifiers.purity]} ${atmosphericWords[modifiers.atmospheric]} ${baseColors[baseColorIndex]}`;
}

function makeNameEditable(element, isMainColor = false) {
    element.contentEditable = true;
    element.spellcheck = false;
    element.classList.add('editable');
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            element.blur();
        }
    });

    element.addEventListener('blur', function() {
        const newName = element.textContent.trim();
        const color = getColorFromName(newName);
        
        if (color) {
            if (isMainColor) {
                updateUrlColor(color);
                displayColor(color);
            } else {
                // Find the parent variation card and update it
                const card = element.closest('.variation-card');
                const colorBox = card.querySelector('.variation-color');
                const hexElement = card.querySelector('.variation-hex');
                colorBox.style.backgroundColor = color;
                hexElement.textContent = color;
            }
        } else {
            // Revert to original name if color not found
            element.textContent = element.dataset.originalName;
        }
    });
}

function getColorFromName(name) {
    // Split the name into parts
    const parts = name.split(' ');
    
    // Base colors and their hex values
    const baseColors = {
        'Red': '#FF0000',
        'Green': '#00FF00',
        'Blue': '#0000FF',
        'Yellow': '#FFFF00',
        'Purple': '#800080',
        'Orange': '#FFA500',
        'Pink': '#FFC0CB',
        'Brown': '#A52A2A',
        'Gray': '#808080',
        'Black': '#000000',
        'White': '#FFFFFF',
        'Cyan': '#00FFFF',
        'Magenta': '#FF00FF'
    };

    // Find the base color (last word)
    const baseColor = parts[parts.length - 1];
    if (!baseColors[baseColor]) return null;

    // Convert base color to HSV
    const rgb = hexToRgb(baseColors[baseColor]);
    let hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

    // Apply modifiers
    parts.slice(0, -1).forEach(modifier => {
        switch(modifier.toLowerCase()) {
            case 'dark':
                hsv.v = Math.max(hsv.v * 0.7, 0);
                break;
            case 'light':
                hsv.v = Math.min(hsv.v * 1.3, 100);
                break;
            case 'deep':
                hsv.s = Math.min(hsv.s * 1.2, 100);
                hsv.v = Math.max(hsv.v * 0.8, 0);
                break;
            case 'pale':
                hsv.s = Math.max(hsv.s * 0.7, 0);
                hsv.v = Math.min(hsv.v * 1.1, 100);
                break;
            case 'bright':
                hsv.v = Math.min(hsv.v * 1.2, 100);
                break;
            case 'pure':
                hsv.s = Math.min(hsv.s * 1.1, 100);
                break;
            case 'rich':
                hsv.s = Math.min(hsv.s * 1.15, 100);
                hsv.v = Math.min(hsv.v * 1.05, 100);
                break;
        }
    });

    // Convert back to hex
    const newRgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

// Browser-specific code
if (typeof window !== 'undefined') {
    function generateNewColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const hex = rgbToHex(r, g, b);
        
        // Update URL with the new color
        updateUrlColor(hex);
        displayColor(hex);
    }

    function displayColor(hex) {
        const name = getColorName(hex);
        const rgb = hexToRgb(hex);
        
        document.getElementById('mainColor').style.backgroundColor = hex;
        const colorNameElement = document.getElementById('colorName');
        colorNameElement.textContent = name;
        colorNameElement.dataset.originalName = name;
        makeNameEditable(colorNameElement, true);
        document.getElementById('hexCode').textContent = hex;
        
        generateVariations(rgb);
    }

    function updateUrlColor(hex) {
        // Remove the # from hex code for the URL
        const colorParam = hex.substring(1);
        const newUrl = `${window.location.pathname}?color=${colorParam}`;
        window.history.pushState({ color: hex }, '', newUrl);
    }

    function getUrlColor() {
        const params = new URLSearchParams(window.location.search);
        const colorParam = params.get('color');
        return colorParam ? `#${colorParam}` : null;
    }

    // Handle browser back/forward buttons
    window.onpopstate = function(event) {
        if (event.state && event.state.color) {
            displayColor(event.state.color);
        } else {
            generateNewColor();
        }
    };

    // Initialize with URL color or random color
    window.onload = function() {
        const urlColor = getUrlColor();
        if (urlColor && /^#[0-9A-F]{6}$/i.test(urlColor)) {
            displayColor(urlColor);
        } else {
            generateNewColor();
        }
    };

    function generateVariations(mainColor) {
        const variationsContainer = document.getElementById('variationsGrid');
        variationsContainer.innerHTML = '';

        // Generate 20 variations (5x4 grid)
        const variations = [];
        const hsv = rgbToHsv(mainColor.r, mainColor.g, mainColor.b);

        // Create variations with different hue, saturation, and value combinations
        for (let i = 0; i < 20; i++) {
            const hueShift = (i % 4) * 30 - 45;  // Shifts between -45 and +45 degrees
            const saturationMod = 1 - (Math.floor(i / 4) * 0.2);  // Decreases saturation by row
            const valueMod = 0.5 + (Math.floor(i / 8) * 0.25);  // Adjusts value every two rows

            const newHue = (hsv.h + hueShift + 360) % 360;
            const newSaturation = Math.max(0, Math.min(100, hsv.s * saturationMod));
            const newValue = Math.max(0, Math.min(100, hsv.v * valueMod));

            const rgb = hsvToRgb(newHue, newSaturation, newValue);
            const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            variations.push({
                hex: hex,
                name: getColorName(hex)
            });
        }

        // Display variations
        variations.forEach(variation => {
            const card = document.createElement('div');
            card.className = 'variation-card';
            
            const colorBox = document.createElement('div');
            colorBox.className = 'variation-color';
            colorBox.style.backgroundColor = variation.hex;
            
            const info = document.createElement('div');
            info.className = 'variation-info';
            
            const name = document.createElement('div');
            name.className = 'variation-name';
            name.textContent = variation.name;
            name.dataset.originalName = variation.name;
            makeNameEditable(name);
            
            const hex = document.createElement('div');
            hex.className = 'variation-hex';
            hex.textContent = variation.hex;
            
            info.appendChild(name);
            info.appendChild(hex);
            card.appendChild(colorBox);
            card.appendChild(info);
            variationsContainer.appendChild(card);
        });
    }

    function updateVariationsDisplay(variations) {
        const container = document.getElementById('variations');
        container.innerHTML = '';

        ['brightness', 'color', 'saturation'].forEach((type) => {
            const label = document.createElement('div');
            label.className = 'row-label';
            label.textContent = type.charAt(0).toUpperCase() + type.slice(1) + ' Variations';
            container.appendChild(label);

            variations[type].forEach(hex => {
                const card = document.createElement('div');
                card.className = 'variation-card';
                const name = getColorName(hex);
                
                card.innerHTML = `
                    <div class="variation-box" style="background-color: ${hex}"></div>
                    <div class="variation-name">${name}</div>
                    <div class="variation-hex">${hex}</div>
                `;
                container.appendChild(card);
            });
        });
    }

    // Initialize with a random color on load
    // generateNewColor();
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        hexToRgb,
        rgbToHex,
        getMsbIndex,
        getRemainingBits,
        rgbToHsv,
        hsvToRgb,
        getModifierIndices,
        getColorName,
        baseColors,
        luminosityWords,
        purityWords,
        atmosphericWords
    };
}
