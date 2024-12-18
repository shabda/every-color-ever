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

// Browser-specific code
if (typeof window !== 'undefined') {
    function generateNewColor() {
        const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        document.getElementById('mainColor').style.backgroundColor = hex;
        document.getElementById('colorName').textContent = getColorName(hex);
        document.getElementById('hexCode').textContent = hex;
        
        const variations = generateVariations(hex);
        updateVariationsDisplay(variations);
    }

    function generateVariations(hex) {
        const rgb = hexToRgb(hex);
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        const variations = {
            brightness: [],
            color: [],
            saturation: []
        };

        // Brightness variations
        for(let i = 0; i < 4; i++) {
            const newV = Math.min(100, (hsv.v * (0.4 + (i * 0.2))));
            const newRgb = hsvToRgb(hsv.h, hsv.s, newV);
            variations.brightness.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }

        // Color variations
        for(let i = 0; i < 4; i++) {
            const newH = (hsv.h + (i * 30)) % 360;
            const newRgb = hsvToRgb(newH, hsv.s, hsv.v);
            variations.color.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }

        // Saturation variations
        for(let i = 0; i < 4; i++) {
            const newS = Math.min(100, hsv.s * (0.25 + (i * 0.25)));
            const newRgb = hsvToRgb(hsv.h, newS, hsv.v);
            variations.saturation.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }

        return variations;
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
    generateNewColor();
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
