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
    // Extract 2 high bits from each component
    const rHigh = (rgb.r >> 6) & 0x03;
    const gHigh = (rgb.g >> 6) & 0x03;
    const bHigh = (rgb.b >> 6) & 0x03;
    
    // Pack them into a 6-bit value: BBRRGG
    const msbIndex = (bHigh << 4) | (rHigh << 2) | gHigh;
    
    console.log('MSB Analysis:', {
        original: { r: rgb.r.toString(2), g: rgb.g.toString(2), b: rgb.b.toString(2) },
        highBits: { r: rHigh, g: gHigh, b: bHigh },
        msbIndex: msbIndex.toString(2).padStart(6, '0')
    });
    
    return msbIndex;
}

function getRemainingBits(rgb) {
    // Get lower 6 bits from each component
    const r = rgb.r & 0x3F;
    const g = rgb.g & 0x3F;
    const b = rgb.b & 0x3F;

    console.log('Bit Extraction:', {
        input: {
            r: rgb.r.toString(2).padStart(8, '0'),
            g: rgb.g.toString(2).padStart(8, '0'),
            b: rgb.b.toString(2).padStart(8, '0')
        },
        mask: '00111111',
        extracted: {
            r: r.toString(2).padStart(6, '0'),
            g: g.toString(2).padStart(6, '0'),
            b: b.toString(2).padStart(6, '0')
        },
        decimal: { r, g, b }
    });

    const bits = { r, g, b };

    // Verify the bits are correctly masked
    console.log('Verification:', {
        allBitsInRange: 
            bits.r <= 0x3F && bits.g <= 0x3F && bits.b <= 0x3F,
        actualValues: {
            r: bits.r,
            g: bits.g,
            b: bits.b
        }
    });

    return bits;
}

function reconstructRgb(msbIndex, remainingBits) {
    // Extract high bits from msbIndex (BBRRGG format)
    const bHigh = (msbIndex >> 4) & 0x03;
    const rHigh = (msbIndex >> 2) & 0x03;
    const gHigh = msbIndex & 0x03;

    // Correctly combine high bits with remaining bits
    const result = {
        r: (rHigh << 6) | (remainingBits.r & 0x3F),
        g: (gHigh << 6) | (remainingBits.g & 0x3F),
        b: (bHigh << 6) | (remainingBits.b & 0x3F) // Ensure correct combination
    };
    
    console.log('Reconstruction:', {
        msbIndex: msbIndex.toString(2).padStart(6, '0'),
        highBits: { 
            r: rHigh.toString(2).padStart(2, '0'),
            g: gHigh.toString(2).padStart(2, '0'),
            b: bHigh.toString(2).padStart(2, '0')
        },
        remainingBits: {
            r: remainingBits.r.toString(2).padStart(6, '0'),
            g: remainingBits.g.toString(2).padStart(6, '0'),
            b: remainingBits.b.toString(2).padStart(6, '0')
        },
        result: {
            r: result.r.toString(2).padStart(8, '0'),
            g: result.g.toString(2).padStart(8, '0'),
            b: result.b.toString(2).padStart(8, '0')
        }
    });

    return result;
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
