export interface MoodboardImage {
  id: string;
  url: string;
  publicId?: string;
  file?: File;
}

export interface BrandInput {
  description: string;
  moodboardImages: MoodboardImage[];
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  headingFont: string;
  bodyFont: string;
  sampleHeadingSizes: {
    h1: string;
    h2: string;
    h3: string;
  };
}

export interface BrandVoice {
  tone: string;
  values: string[];
  keyPhrases: string[];
  personalityTraits: string[];
}

export interface VisualStyle {
  imageStyle: string;
  graphicElements: string[];
  layoutPrinciples: string[];
  iconStyle: string;
  photographyGuidelines: string;
}

export interface DeckTemplate {
  titleSlide: string;
  contentSlide: string;
  imageSlide: string;
  dataSlide: string;
  closingSlide: string;
  generalGuidelines: string;
}

export interface BrandBook {
  name?: string;
  description: string;
  colorPalette: ColorPalette;
  typography: Typography;
  brandVoice: BrandVoice;
  logoSuggestions?: string[];
  visualStyle: VisualStyle;
  deckTemplate: DeckTemplate;
} 