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
    // Darkest (0) to Brightest (63)
    "Abyssal", "Shadowed", "Dark", "Dim",
    "Dusky", "Murky", "Gloomy", "Shaded",
    "Muted", "Subdued", "Veiled", "Obscured",
    "Clouded", "Somber", "Tenebrous", "Twilight",
    "Overcast", "Darkened", "Faded", "Subtle",
    "Neutral", "Moderate", "Balanced", "Medium",
    "Clear", "Lucid", "Luminous", "Glowing",
    "Light", "Bright", "Vivid", "Lustrous",
    "Gleaming", "Brilliant", "Radiant", "Blazing",
    "Shining", "Illuminated", "Beaming", "Glaring",
    "Dazzling", "Intense", "Burning", "Flashing",
    "Sparkling", "Twinkling", "Glistening", "Shimmering",
    "Glittering", "Effervescent", "Phosphorescent", "Incandescent",
    "Resplendent", "Scintillating", "Coruscating", "Effulgent",
    "Refulgent", "Luminescent", "Iridescent", "Prismatic",
    "Ethereal", "Celestial", "Divine", "Transcendent"
];

const purityWords = [
    // Most muted (0) to most pure (63)
    "Muddy", "Dusty", "Grimy", "Soiled",
    "Tarnished", "Stained", "Sullied", "Dingy",
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
    "Quintessential", "Archetypal", "Ideal", "Unadulterated"
];

const atmosphericWords = [
    // Most turbulent (0) to most serene (63)
    "Chaotic", "Stormy", "Tempestuous", "Turbulent",
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
    "Mystical", "Enchanted", "Magical", "Ethereal"
];

module.exports = {
    baseColors,
    luminosityWords,
    purityWords,
    atmosphericWords
};
