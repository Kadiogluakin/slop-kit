import OpenAI from 'openai';
import { BrandBook, BrandInput } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate logo images using DALL-E
export const generateLogos = async (brandBook: BrandBook, count: number = 3): Promise<string[]> => {
  try {
    const logoPrompt = `
    Create a professional, modern logo for a brand with the following characteristics:
    
    Product: ${brandBook.description}
    
    Primary color: ${brandBook.colorPalette.primary}
    Secondary color: ${brandBook.colorPalette.secondary}
    Accent color: ${brandBook.colorPalette.accent}
    
    Brand personality: ${brandBook.brandVoice.personalityTraits.join(', ')}
    
    Style guidance: ${brandBook.visualStyle.iconStyle}
    
    The logo should be minimal, professional, high-quality, and reflect the brand identity perfectly.
    Show the logo on a clean, white background. No text or labels needed. Just the logo mark itself.
    `;
    
    const logoImages: string[] = [];
    
    // Generate requested number of logo variations
    for (let i = 0; i < count; i++) {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: logoPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "vivid",
      });
      
      const imageUrl = response.data[0]?.url;
      if (imageUrl) {
        logoImages.push(imageUrl);
      }
    }
    
    return logoImages;
  } catch (error) {
    console.error('Error generating logos with DALL-E:', error);
    return [];
  }
};

export const generateBrandBook = async (input: BrandInput): Promise<BrandBook> => {
  try {
    const imageDescriptions = input.moodboardImages.map(img => 
      `Image URL: ${img.url}`
    ).join('\n');

    const prompt = `
    You are a world-class brand designer and strategist. Create a comprehensive brand book based on:

    PRODUCT DESCRIPTION:
    ${input.description}

    MOODBOARD IMAGES:
    ${imageDescriptions}

    Generate a detailed brand book with:
    1. A color palette (primary, secondary, accent, background, and text colors in hex codes)
    2. Typography recommendations (heading font, body font, and sample heading sizes)
    3. Brand voice and tone (including values, key phrases, and personality traits)
    4. Logo suggestions
    5. Visual style guide (image style, graphic elements, layout principles, icon style, photography guidelines)
    6. Presentation deck template designs (title slide, content slide, image slide, data slide, closing slide, and general guidelines)

    The brand book should be cohesive, professional, and reflect the mood and description provided.
    
    RESPOND WITH JSON in the following format:
    {
      "colorPalette": {
        "primary": "#hexcode",
        "secondary": "#hexcode",
        "accent": "#hexcode",
        "background": "#hexcode",
        "text": "#hexcode"
      },
      "typography": {
        "headingFont": "font name",
        "bodyFont": "font name",
        "sampleHeadingSizes": {
          "h1": "size",
          "h2": "size",
          "h3": "size"
        }
      },
      "brandVoice": {
        "tone": "description",
        "values": ["value1", "value2", "value3"],
        "keyPhrases": ["phrase1", "phrase2", "phrase3"],
        "personalityTraits": ["trait1", "trait2", "trait3"]
      },
      "logoSuggestions": ["suggestion1", "suggestion2", "suggestion3"],
      "visualStyle": {
        "imageStyle": "description of image style",
        "graphicElements": ["element1", "element2", "element3"],
        "layoutPrinciples": ["principle1", "principle2", "principle3"],
        "iconStyle": "description of icon style",
        "photographyGuidelines": "guidelines for photography"
      },
      "deckTemplate": {
        "titleSlide": "detailed description of title slide design",
        "contentSlide": "detailed description of content slide design",
        "imageSlide": "detailed description of image slide design",
        "dataSlide": "detailed description of data/chart slide design",
        "closingSlide": "detailed description of closing slide design",
        "generalGuidelines": "general design principles for the presentation"
      }
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an expert brand designer who creates detailed brand books based on descriptions and visual references. Always respond with JSON." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const brandBookContent = JSON.parse(response.choices[0].message.content || '{}');
    
    const brandBook = {
      description: input.description,
      colorPalette: brandBookContent.colorPalette,
      typography: brandBookContent.typography,
      brandVoice: brandBookContent.brandVoice,
      logoSuggestions: brandBookContent.logoSuggestions,
      visualStyle: brandBookContent.visualStyle,
      deckTemplate: brandBookContent.deckTemplate
    };
    
    // Generate logo images using DALL-E
    const logoImages = await generateLogos(brandBook, 3);
    
    return {
      ...brandBook,
      logoImages
    };
  } catch (error) {
    console.error('Error generating brand book:', error);
    throw new Error('Failed to generate brand book');
  }
};

export default openai; 