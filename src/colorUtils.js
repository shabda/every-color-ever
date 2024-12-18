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
    // We'll use the high bits to determine the base color region
    const rHigh = (rgb.r >> 6) & 0x03;
    const gHigh = (rgb.g >> 6) & 0x03;
    const bHigh = (rgb.b >> 6) & 0x03;
    return (bHigh << 4) | (rHigh << 2) | gHigh;
}

function getRemainingBits(rgb) {
    // Store the exact lower 6 bits for each component
    return {
        r: rgb.r & 0x3F,
        g: rgb.g & 0x3F,
        b: rgb.b & 0x3F
    };
}

function reconstructRgb(msbIndex, remainingBits) {
    // Extract the high bits from msbIndex
    const bHigh = (msbIndex >> 4) & 0x03;
    const rHigh = (msbIndex >> 2) & 0x03;
    const gHigh = msbIndex & 0x03;

    // Combine with the remaining bits
    return {
        r: (rHigh << 6) | remainingBits.r,
        g: (gHigh << 6) | remainingBits.g,
        b: (bHigh << 6) | remainingBits.b
    };
}

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    let h = 0;
    const s = max === 0 ? 0 : diff / max;
    const v = max;

    if (diff !== 0) {
        switch (max) {
            case r:
                h = (g - b) / diff + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / diff + 2;
                break;
            case b:
                h = (r - g) / diff + 4;
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
    // Normalize values
    h = ((h % 360) + 360) % 360; // Force h into [0, 360)
    s = Math.min(100, Math.max(0, s)); // Force s into [0, 100]
    v = Math.min(100, Math.max(0, v)); // Force v into [0, 100]
    
    // Convert to [0, 1] range
    h = h / 360;
    s = s / 100;
    v = v / 100;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r, g, b;
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

module.exports = {
    hexToRgb,
    rgbToHex,
    getMsbIndex,
    getRemainingBits,
    reconstructRgb,
    rgbToHsv,
    hsvToRgb
};
