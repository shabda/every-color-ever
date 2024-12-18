const { baseColors, luminosityWords, purityWords, atmosphericWords } = require('./colorData');
const { hexToRgb, getMsbIndex, getRemainingBits } = require('./colorUtils');

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

function getColorName(input) {
    // Handle both hex string and RGB object
    const rgb = typeof input === 'string' ? hexToRgb(input) : input;
    
    if (!rgb || typeof rgb.r !== 'number' || typeof rgb.g !== 'number' || typeof rgb.b !== 'number') {
        console.error('Invalid color input:', input);
        return 'Unknown Color';
    }

    const baseColorIndex = getMsbIndex(rgb);
    const modifiers = getModifierIndices(rgb);
    
    return `${luminosityWords[modifiers.luminosity]} ${purityWords[modifiers.purity]} ${atmosphericWords[modifiers.atmospheric]} ${baseColors[baseColorIndex]}`;
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

    // Extract the MSBs from the base color index
    const bBits = (baseColorIndex >> 4) & 0x03;  // Top 2 bits
    const rBits = (baseColorIndex >> 2) & 0x03;  // Middle 2 bits
    const gBits = baseColorIndex & 0x03;         // Bottom 2 bits

    // Combine with the modifier bits
    return {
        r: (rBits << 6) | (luminosityIndex & 0x3F),
        g: (gBits << 6) | (purityIndex & 0x3F),
        b: (bBits << 6) | (atmosphericIndex & 0x3F)
    };
}

module.exports = {
    getModifierIndices,
    getColorName,
    nameToRgb
};
