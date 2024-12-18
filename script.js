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
    // Darkest to Brightest
    "Shadowed", "Dark", "Deep", "Muted",
    "Dim", "Dusky", "Faded", "Subdued",
    "Darkened", "Shaded", "Twilight", "Tenebrous",
    "Obscured", "Somber", "Gloomy", "Murky",
    "Veiled", "Hazy", "Overcast", "Subtle",
    "Neutral", "Balanced", "Moderate", "Medium",
    "Clear", "Lucid", "Luminous", "Glowing",
    "Light", "Bright", "Vivid", "Lustrous",
    "Gleaming", "Brilliant", "Radiant", "Blazing",
    "Shining", "Illuminated", "Beaming", "Glaring",
    "Dazzling", "Intense", "Burning", "Flashing",
    "Sparkling", "Twinkling", "Glistening", "Shimmering",
    "Glittering", "Effervescent", "Phosphorescent", "Incandescent",
    "Resplendent", "Scintillating", "Coruscating", "Effulgent",
    "Refulgent", "Luminescent", "Iridescent", "Prismatic",
    "Ethereal", "Celestial", "Divine", "Transcendent",
    "Luminous", "Glowing", "Radiant", "Shining",
    "Beaming", "Glaring", "Dazzling", "Intense",
    "Burning", "Flashing", "Sparkling", "Twinkling",
    "Glistening", "Shimmering", "Glittering", "Effervescent",
    "Phosphorescent", "Incandescent", "Resplendent", "Scintillating",
    "Coruscating", "Effulgent", "Refulgent", "Luminescent",
    "Iridescent", "Prismatic", "Ethereal", "Celestial",
    "Divine", "Transcendent"
];

const purityWords = [
    // Most muted to most pure
    "Dusty", "Soft", "Mild", "Clean",
    "Muted", "Toned", "Dulled", "Subdued",
    "Grayed", "Ashen", "Clouded", "Misty",
    "Hazy", "Diffused", "Diluted", "Washed",
    "Faded", "Weathered", "Aged", "Vintage",
    "Natural", "Organic", "Earthy", "Raw",
    "Clear", "Fresh", "Crisp", "Sharp",
    "Pure", "Refined", "Clarified", "Filtered",
    "Rich", "Deep", "Concentrated", "Dense",
    "Saturated", "Bold", "Strong", "Powerful",
    "Vivid", "Vibrant", "Dynamic", "Energetic",
    "Intense", "Fierce", "Forceful", "Potent",
    "Pristine", "Immaculate", "Flawless", "Perfect",
    "Absolute", "Ultimate", "Supreme", "Paramount",
    "Quintessential", "Archetypal", "Ideal", "Exemplary",
    "Purest", "Untainted", "Unsullied", "Unadulterated",
    "Unblemished", "Unspoiled", "Unmarred", "Unimpaired",
    "Unflawed", "Unfaulted", "Unblemished", "Unspoiled",
    "Unmarred", "Unimpaired", "Unflawed", "Unfaulted",
    "Unblemished", "Unspoiled", "Unmarred", "Unimpaired",
    "Unflawed", "Unfaulted", "Unblemished", "Unspoiled",
    "Unmarred", "Unimpaired", "Unflawed", "Unfaulted"
];

const atmosphericWords = [
    // Most turbulent to most serene
    "Stormy", "Tempestuous", "Turbulent", "Chaotic",
    "Thunderous", "Tumultuous", "Violent", "Raging",
    "Windswept", "Gusty", "Blustery", "Squalling",
    "Misty", "Foggy", "Hazy", "Cloudy",
    "Nebulous", "Vaporous", "Ethereal", "Airy",
    "Breezy", "Flowing", "Drifting", "Floating",
    "Wispy", "Delicate", "Gentle", "Tender",
    "Tranquil", "Peaceful", "Serene", "Calm",
    "Crystal", "Clear", "Pure", "Pristine",
    "Silken", "Smooth", "Sleek", "Polished",
    "Velvet", "Plush", "Soft", "Luxuriant",
    "Gossamer", "Diaphanous", "Sheer", "Translucent",
    "Luminous", "Radiant", "Glowing", "Effervescent",
    "Harmonious", "Balanced", "Composed", "Refined",
    "Celestial", "Heavenly", "Divine", "Sublime",
    "Transcendent", "Ethereal", "Mystic", "Enchanted",
    "Dreamy", "Ethereal", "Imaginary", "Fantastical",
    "Fanciful", "Whimsical", "Quaint", "Picturesque",
    "Scenic", "Panoramic", "Spectacular", "Resplendent",
    "Glorious", "Triumphant", "Exultant", "Jubilant",
    "Euphoric", "Elated", "Elevated", "Exalted",
    "Sublime", "Transcendent", "Ethereal", "Mystic",
    "Enchanted", "Dreamy", "Imaginary", "Fantastical",
    "Fanciful", "Whimsical", "Quaint", "Picturesque",
    "Scenic", "Panoramic", "Spectacular", "Resplendent",
    "Glorious", "Triumphant", "Exultant", "Jubilant",
    "Euphoric", "Elated", "Elevated", "Exalted"
];

const COLOR_OPTIONS = {
    modifiers: {
        luminosity: ['Dark', 'Light', 'Bright', 'Shadowed', 'Deep'],
        purity: ['Pure', 'Rich', 'Intense', 'Vivid', 'Dusty'],
        atmospheric: ['Crystal', 'Cloudy', 'Stormy', 'Airy', 'Silken']
    },
    baseColors: ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray', 'Black', 'White', 'Cyan', 'Magenta']
};

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
    // Extract the lower 6 bits from each component
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

function getModifierIndices(rgb) {
    // Get the remaining 6 bits from each color component
    const bits = getRemainingBits(rgb);
    
    // Use 2 bits from each component for each modifier
    return {
        // Combine RG bits for luminosity (0-63)
        luminosity: (bits.r & 0x3F),
        // Combine GB bits for purity (0-63)
        purity: (bits.g & 0x3F),
        // Combine BR bits for atmospheric (0-63)
        atmospheric: (bits.b & 0x3F)
    };
}

function getColorName(hex) {
    const rgb = hexToRgb(hex);
    const baseColorIndex = getMsbIndex(rgb);
    const modifiers = getModifierIndices(rgb);
    
    return `${luminosityWords[modifiers.luminosity]} ${purityWords[modifiers.purity]} ${atmosphericWords[modifiers.atmospheric]} ${baseColors[baseColorIndex]}`;
}

function getColorFromName(name) {
    // Split the name into parts
    const parts = name.split(' ');
    if (parts.length !== 4) return null;

    // Find indices for each modifier
    const luminosityIndex = luminosityWords.indexOf(parts[0]);
    const purityIndex = purityWords.indexOf(parts[1]);
    const atmosphericIndex = atmosphericWords.indexOf(parts[2]);
    const baseColorIndex = baseColors.indexOf(parts[3]);

    if (luminosityIndex === -1 || purityIndex === -1 || 
        atmosphericIndex === -1 || baseColorIndex === -1) {
        return null;
    }

    // Get base color RGB
    const baseRgb = hexToRgb(baseColors[baseColorIndex]);
    
    // Create new RGB values using the modifier indices
    // We'll use the top 2 bits for the base color and the remaining 6 bits for modifiers
    const r = (baseRgb.r & 0xC0) | (luminosityIndex & 0x3F);
    const g = (baseRgb.g & 0xC0) | (purityIndex & 0x3F);
    const b = (baseRgb.b & 0xC0) | (atmosphericIndex & 0x3F);

    return rgbToHex(r, g, b);
}

// Browser-specific code
if (typeof window !== 'undefined') {
    function generateNewColor() {
        const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        displayColor(randomHex);
        updateUrlColor(randomHex);
    }

    function displayColor(hex) {
        document.getElementById('color-display').style.backgroundColor = hex;
        document.getElementById('hex-value').textContent = hex;
        document.getElementById('color-name').textContent = getColorName(hex);
        generateVariations(hex);
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

    // Initialize with a random color on load
    window.onload = function() {
        const urlColor = getUrlColor();
        if (urlColor) {
            displayColor(urlColor);
        } else {
            generateNewColor();
        }
    };

    function generateVariations(hex) {
        const variationsContainer = document.getElementById('variations');
        variationsContainer.innerHTML = '';

        const variations = generateColorVariations(hex);
        variations.forEach(variation => {
            const card = document.createElement('div');
            card.className = 'variation-card';

            const colorBox = document.createElement('div');
            colorBox.className = 'variation-color';
            colorBox.style.backgroundColor = variation;

            const hexElement = document.createElement('div');
            hexElement.className = 'variation-hex';
            hexElement.textContent = variation;

            const nameElement = document.createElement('div');
            nameElement.className = 'variation-name';
            nameElement.textContent = getColorName(variation);

            card.appendChild(colorBox);
            card.appendChild(hexElement);
            card.appendChild(nameElement);
            variationsContainer.appendChild(card);
        });
    }

    function generateColorVariations(hex) {
        const rgb = hexToRgb(hex);
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

        const variations = [];
        for (let i = 0; i < 20; i++) {
            const hueShift = (i % 4) * 30 - 45;  // Shifts between -45 and +45 degrees
            const saturationMod = 1 - (Math.floor(i / 4) * 0.2);  // Decreases saturation by row
            const valueMod = 0.5 + (Math.floor(i / 8) * 0.25);  // Adjusts value every two rows

            const newHue = (hsv.h + hueShift + 360) % 360;
            const newSaturation = Math.max(0, Math.min(100, hsv.s * saturationMod));
            const newValue = Math.max(0, Math.min(100, hsv.v * valueMod));

            const rgb = hsvToRgb(newHue, newSaturation, newValue);
            const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            variations.push(hex);
        }

        return variations;
    }
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
