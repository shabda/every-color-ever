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
    const toHex = x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getMsbIndex(rgb) {
    const r = (rgb.r >> 6) & 0x03;
    const g = (rgb.g >> 6) & 0x03;
    const b = (rgb.b >> 6) & 0x03;
    return (r << 4) | (g << 2) | b;
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

    return { h, s, v };
}

function hsvToRgb(h, s, v) {
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
        luminosity: Math.floor(hsb.v * 4),
        purity: Math.floor(hsb.s * 4),
        atmospheric: Math.floor(hsb.h * 12)
    };
}

function getColorName(hex) {
    const rgb = hexToRgb(hex);
    const msbIndex = getMsbIndex(rgb);
    const remaining = getRemainingBits(rgb);
    const hsv = rgbToHsv(remaining.r, remaining.g, remaining.b);
    const modifiers = getModifierIndices(hsv);
    
    return `${baseColors[msbIndex]}`;
}

function generateVariations(hex) {
    const rgb = hexToRgb(hex);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const variations = [];

    // Generate brightness variations
    for (let i = -2; i <= 1; i++) {
        const newV = Math.max(0, Math.min(1, hsv.v + (i * 0.2)));
        const newRgb = hsvToRgb(hsv.h, hsv.s, newV);
        variations.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            name: `Brightness ${i > 0 ? '+' : ''}${i}`
        });
    }

    // Generate hue variations
    for (let i = -2; i <= 1; i++) {
        const newH = (hsv.h + (i * 0.1) + 1) % 1;
        const newRgb = hsvToRgb(newH, hsv.s, hsv.v);
        variations.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            name: `Hue ${i > 0 ? '+' : ''}${i}`
        });
    }

    return variations;
}

function updateVariationsDisplay(variations) {
    const container = document.querySelector('.variations');
    container.innerHTML = '';

    variations.forEach(variation => {
        const card = document.createElement('div');
        card.className = 'variation-card';
        
        const box = document.createElement('div');
        box.className = 'variation-box';
        box.style.backgroundColor = variation.hex;
        
        const name = document.createElement('div');
        name.className = 'variation-name';
        name.textContent = variation.name;
        
        const hex = document.createElement('div');
        hex.className = 'variation-hex';
        hex.textContent = variation.hex;
        
        card.appendChild(box);
        card.appendChild(name);
        card.appendChild(hex);
        container.appendChild(card);
    });
}

function generateNewColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const hex = rgbToHex(r, g, b);
    
    document.querySelector('.color-box').style.backgroundColor = hex;
    document.querySelector('.hex-code').textContent = hex;
    document.querySelector('.color-name').textContent = getColorName(hex);
    updateVariationsDisplay(generateVariations(hex));
}

// Initialize with a random color on load
window.addEventListener('DOMContentLoaded', generateNewColor);
