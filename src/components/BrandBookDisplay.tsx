import { BrandBook } from '../types';
import VisualStyleGuide from './VisualStyleGuide';
import DeckTemplateDisplay from './DeckTemplateDisplay';

interface BrandBookDisplayProps {
  brandBook: BrandBook;
}

export default function BrandBookDisplay({ brandBook }: BrandBookDisplayProps) {
  const { colorPalette, typography, brandVoice, visualStyle, deckTemplate } = brandBook;

  // Helper to determine if text should be light or dark based on background color
  const getTextColor = (bgColor: string) => {
    // Convert hex to RGB
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8 space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Brand Book</h2>
            <p className="text-gray-800 text-lg">{brandBook.description}</p>
          </div>

          {/* Color Palette */}
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-gray-200">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {Object.entries(colorPalette).map(([name, color]) => (
                <div key={name} className="space-y-2">
                  <div 
                    className="h-24 rounded-lg shadow-md flex flex-col items-center justify-center transition-transform hover:scale-105" 
                    style={{ 
                      backgroundColor: color,
                      color: getTextColor(color),
                    }}
                  >
                    <span className="font-bold">{color}</span>
                    <span className="text-xs opacity-80 mt-1">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-gray-200">Typography</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Heading Font</p>
                <p className="text-xl text-gray-900 font-semibold" style={{ fontFamily: typography.headingFont }}>
                  {typography.headingFont}
                </p>
              </div>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Body Font</p>
                <p className="text-xl text-gray-900 font-semibold" style={{ fontFamily: typography.bodyFont }}>
                  {typography.bodyFont}
                </p>
              </div>
            </div>
            <div className="space-y-5 pt-2">
              <h4 className="text-xl font-medium text-gray-900">Sample Headings</h4>
              <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <p 
                  className="font-bold text-gray-900" 
                  style={{ 
                    fontFamily: typography.headingFont,
                    fontSize: typography.sampleHeadingSizes.h1,
                    color: colorPalette.primary
                  }}
                >
                  Heading 1
                </p>
                <p 
                  className="font-bold text-gray-900" 
                  style={{ 
                    fontFamily: typography.headingFont,
                    fontSize: typography.sampleHeadingSizes.h2,
                    color: colorPalette.secondary
                  }}
                >
                  Heading 2
                </p>
                <p 
                  className="font-bold text-gray-900" 
                  style={{ 
                    fontFamily: typography.headingFont,
                    fontSize: typography.sampleHeadingSizes.h3,
                    color: colorPalette.accent
                  }}
                >
                  Heading 3
                </p>
              </div>
            </div>
          </div>

          {/* Brand Voice */}
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-gray-200">Brand Voice</h3>
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">Tone</p>
                <p className="text-gray-800">{brandVoice.tone}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">Values</p>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  {brandVoice.values.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">Key Phrases</p>
                <div className="flex flex-wrap gap-2">
                  {brandVoice.keyPhrases.map((phrase, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${colorPalette.primary}20`, color: colorPalette.primary }}
                    >
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">Personality Traits</p>
                <div className="flex flex-wrap gap-2">
                  {brandVoice.personalityTraits.map((trait, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${colorPalette.secondary}20`, color: colorPalette.secondary }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Logo Suggestions */}
          {(brandBook.logoImages && brandBook.logoImages.length > 0) || (brandBook.logoSuggestions && brandBook.logoSuggestions.length > 0) ? (
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-gray-200">Logo</h3>
              
              {/* Generated Logo Images */}
              {brandBook.logoImages && brandBook.logoImages.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xl font-medium text-gray-900">Generated Logos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {brandBook.logoImages.map((imageUrl, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-square relative rounded-md overflow-hidden">
                          <img 
                            src={imageUrl} 
                            alt={`Generated logo option ${index + 1}`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-center mt-3 text-sm text-gray-600">Option {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Text-based Logo Suggestions */}
              {brandBook.logoSuggestions && brandBook.logoSuggestions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xl font-medium text-gray-900">Logo Suggestions</h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <ul className="list-disc list-inside text-gray-800 space-y-2">
                      {brandBook.logoSuggestions.map((suggestion, index) => (
                        <li key={index} className="py-1">{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      
      {/* Visual Style Guide */}
      <VisualStyleGuide visualStyle={visualStyle} colorPalette={colorPalette} />
      
      {/* Deck Template */}
      <DeckTemplateDisplay deckTemplate={deckTemplate} colorPalette={colorPalette} />
    </div>
  );
} 