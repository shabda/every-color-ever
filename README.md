# Color Namer - Color Name Explorer

A web-based tool that generates unique, descriptive names for any RGB color and shows related color variations.

## Concept

Every RGB color (16.7 million possibilities) gets a unique, meaningful name based on its properties. The name is generated through:
1. Base color name (using most significant bits)
2. Modifiers based on color properties (using remaining bits)

## Algorithm

### Color Name Generation

1. Base Color Selection (Using 2 MSB from each channel):
```
R: bbxxxxxx (bb = 2 most significant bits)
G: bbxxxxxx
B: bbxxxxxx
```
- Combines into 6-bit index (64 possibilities)
- Maps to carefully chosen base color names

2. Remaining Bits Processing:
```
R: 00bbbbbb (6 remaining bits)
G: 00bbbbbb
B: 00bbbbbb
```
- Convert to HSV color space
- Map to modifier words:
  - Luminosity (from Value)
  - Purity (from Saturation)
  - Atmospheric (from Hue)

3. Final Name Format:
`[Luminosity] [Purity] [Atmospheric] [Base Color]`
Example: "Bright Pure Crystal Sapphire"

### Variation Generation

1. Brightness Variations:
- Modify Value in HSV space
- Keep Hue and Saturation constant
- 4 steps from darker to lighter

2. Color Variations:
- Modify Hue in HSV space
- Keep Saturation and Value constant
- 4 steps around color wheel

3. Saturation Variations:
- Modify Saturation in HSV space
- Keep Hue and Value constant
- 4 steps from muted to vibrant

## Technical Details

### Core Functions

1. Color Space Conversions:
```javascript
hexToRgb(hex)    // Converts hex color to RGB
rgbToHsv(r,g,b)  // Converts RGB to HSV
hsvToRgb(h,s,v)  // Converts HSV to RGB
```

2. Bit Operations:
```javascript
getMsbIndex(rgb)      // Extracts and combines MSBs
getRemainingBits(rgb) // Gets lower 6 bits
```

3. Name Generation:
```javascript
getColorName(hex)         // Main naming function
getModifierIndices(hsb)   // Maps HSV to word indices
```

### Word Lists

1. Base Colors (64):
- Organized by color families (4×4×4 cube):
  - B=00: Black → Bright Yellow
  - B=01: Navy → Light Yellow
  - B=10: Blue → Near White
  - B=11: Royal Blue → White

2. Modifier Words (8 words each):
```javascript
luminosityWords = [
    "Shadowed", "Dark", "Deep", "Muted", 
    "Clear", "Bright", "Brilliant", "Radiant"
];

purityWords = [
    "Dusty", "Soft", "Mild", "Clean",
    "Pure", "Rich", "Vivid", "Intense"
];

atmosphericWords = [
    "Stormy", "Misty", "Cloudy", "Airy",
    "Crystal", "Silken", "Velvet", "Gossamer"
];
```

### Technologies Used

- Pure JavaScript (VanillaJS)
- HTML5
- CSS3
- No external dependencies

### Browser Support

- Modern browsers with HTML5 support
- No polyfills required
- Responsive design

## Performance

- All calculations done client-side
- No server requests after initial page load
- Instant name generation
- Smooth color transitions

## Implementation Example

```javascript
// Generate name for a color
const hex = "#FF5733";
const name = getColorName(hex);  // "Bright Pure Crystal Orange"

// Generate variations
const variations = generateVariations(hex);
// Returns object with brightness, color, and saturation variations
```

## Future Enhancements

1. Technical:
- Color palette generation
- Color scheme suggestions
- Image color extraction

2. User Experience:
- Color history
- Favorite colors
- Share functionality

3. Features:
- Color accessibility information
- Color combination suggestions
- Export functionality

## Live Demo

Visit [Color Namer](https://example.com) to try it out!

## Contributing

Feel free to submit issues and enhancement requests. Contributions welcome!

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
