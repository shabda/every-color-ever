const { baseColors, luminosityWords, purityWords, atmosphericWords } = require('./colorData');
const { hexToRgb, getMsbIndex, getRemainingBits, reconstructRgb } = require('./colorUtils');

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
    // Handle both hex string and RGB object
    const rgb = typeof hex === 'string' ? hexToRgb(hex) : hex;
    
    if (!rgb || typeof rgb.r !== 'number' || typeof rgb.g !== 'number' || typeof rgb.b !== 'number') {
        console.error('Invalid color input:', hex);
        return 'Unknown Color';
    }

    const msbIndex = getMsbIndex(rgb);
    const remainingBits = getRemainingBits(rgb);

    // Get the base color from the MSB index
    const baseColor = baseColors[msbIndex];

    // Map the remaining bits to modifiers
    // We'll use the bits to index into our modifier arrays
    const luminosityIndex = remainingBits.r;
    const purityIndex = remainingBits.g;
    const atmosphericIndex = remainingBits.b;

    // Ensure we don't exceed array bounds
    const luminosity = luminosityWords[luminosityIndex % luminosityWords.length];
    const purity = purityWords[purityIndex % purityWords.length];
    const atmospheric = atmosphericWords[atmosphericIndex % atmosphericWords.length];

    return `${luminosity} ${purity} ${atmospheric} ${baseColor}`;
}

function nameToRgb(colorName) {
    // Split the color name into words and handle multi-word base colors
    const words = colorName.split(' ');
    const baseColorWords = words.slice(3).join(' '); // Join all remaining words for base color
    const [luminosity, purity, atmospheric] = words;

    // Find indices in our word arrays
    const luminosityIndex = luminosityWords.indexOf(luminosity);
    const purityIndex = purityWords.indexOf(purity);
    const atmosphericIndex = atmosphericWords.indexOf(atmospheric);
    const baseColorIndex = baseColors.indexOf(baseColorWords);

    if (luminosityIndex === -1 || purityIndex === -1 || atmosphericIndex === -1 || baseColorIndex === -1) {
        throw new Error('One or more words not found in the color vocabulary');
    }

    // Reconstruct the RGB values using our utility function
    return reconstructRgb(baseColorIndex, {
        r: luminosityIndex,
        g: purityIndex,
        b: atmosphericIndex
    });
}

module.exports = {
    getModifierIndices,
    getColorName,
    nameToRgb
};
