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

module.exports = {
    getModifierIndices,
    getColorName
};
