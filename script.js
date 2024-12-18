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
        createNameEditor(colorNameElement, true);
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
            
            const nameContainer = document.createElement('div');
            nameContainer.className = 'name-container';
            
            const name = document.createElement('div');
            name.className = 'variation-name';
            name.textContent = variation.name;
            nameContainer.appendChild(name);
            
            const hex = document.createElement('div');
            hex.className = 'variation-hex';
            hex.textContent = variation.hex;
            
            info.appendChild(nameContainer);
            info.appendChild(hex);
            card.appendChild(colorBox);
            card.appendChild(info);
            
            createNameEditor(name, false);
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

function createNameEditor(nameElement, isMainColor = false) {
    const nameContainer = nameElement.parentElement;
    if (!nameContainer) return;

    // Create edit button
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = '&#9998;';
    nameContainer.appendChild(editButton);

    // Create editor container
    const editorContainer = document.createElement('div');
    editorContainer.className = 'name-editor';
    editorContainer.style.display = 'none';

    // Create dropdowns for each part
    const luminositySelect = createSelect('Luminosity', luminosityWords);
    const puritySelect = createSelect('Purity', purityWords);
    const atmosphericSelect = createSelect('Atmospheric', atmosphericWords);
    const baseColorSelect = createSelect('Base Color', baseColors);

    // Create apply button
    const applyButton = document.createElement('button');
    applyButton.className = 'apply-button';
    applyButton.textContent = 'Apply';

    // Create cancel button
    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancel-button';
    cancelButton.textContent = 'Cancel';

    // Add all elements to container
    editorContainer.appendChild(luminositySelect);
    editorContainer.appendChild(puritySelect);
    editorContainer.appendChild(atmosphericSelect);
    editorContainer.appendChild(baseColorSelect);
    editorContainer.appendChild(applyButton);
    editorContainer.appendChild(cancelButton);
    nameContainer.appendChild(editorContainer);

    // Set initial values based on current name
    function setInitialValues() {
        const parts = nameElement.textContent.split(' ');
        if (parts.length === 4) {
            luminositySelect.querySelector('select').value = parts[0];
            puritySelect.querySelector('select').value = parts[1];
            atmosphericSelect.querySelector('select').value = parts[2];
            baseColorSelect.querySelector('select').value = parts[3];
        }
    }

    // Event Handlers
    editButton.addEventListener('click', () => {
        nameElement.style.display = 'none';
        editButton.style.display = 'none';
        editorContainer.style.display = 'flex';
        setInitialValues();
    });

    applyButton.addEventListener('click', () => {
        const newName = `${luminositySelect.querySelector('select').value} ${puritySelect.querySelector('select').value} ${atmosphericSelect.querySelector('select').value} ${baseColorSelect.querySelector('select').value}`;
        const color = getColorFromName(newName);
        
        if (color) {
            if (isMainColor) {
                updateUrlColor(color);
                displayColor(color);
            } else {
                const card = nameContainer.closest('.variation-card');
                const colorBox = card.querySelector('.variation-color');
                const hexElement = card.querySelector('.variation-hex');
                colorBox.style.backgroundColor = color;
                hexElement.textContent = color;
                nameElement.textContent = newName;
            }
        }
        
        nameElement.style.display = 'block';
        editButton.style.display = 'inline';
        editorContainer.style.display = 'none';
    });

    cancelButton.addEventListener('click', () => {
        nameElement.style.display = 'block';
        editButton.style.display = 'inline';
        editorContainer.style.display = 'none';
    });
}

function createSelect(label, options) {
    const container = document.createElement('div');
    container.className = 'select-container';
    
    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    
    const select = document.createElement('select');
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
    
    container.appendChild(labelElement);
    container.appendChild(select);
    return container;
}
