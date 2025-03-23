import { DeckTemplate, ColorPalette } from '../types';

interface DeckTemplateDisplayProps {
  deckTemplate: DeckTemplate;
  colorPalette: ColorPalette;
}

export default function DeckTemplateDisplay({ 
  deckTemplate,
  colorPalette
}: DeckTemplateDisplayProps) {
  const { 
    titleSlide, 
    contentSlide, 
    imageSlide, 
    dataSlide, 
    closingSlide, 
    generalGuidelines 
  } = deckTemplate;

  // Create a simplified slide mockup with the brand colors
  const SlidePreview = ({ 
    title, 
    description, 
    type 
  }: { 
    title: string; 
    description: string;
    type: 'title' | 'content' | 'image' | 'data' | 'closing' 
  }) => {
    
    // Customize the preview based on slide type
    const getSlideStyle = () => {
      switch(type) {
        case 'title':
          return {
            background: colorPalette.primary,
            color: '#FFFFFF',
            padding: '2rem',
            textAlign: 'center' as const,
            height: '100%',
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          };
        case 'content':
          return {
            background: colorPalette.background,
            color: colorPalette.text,
            padding: '1.5rem',
            height: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          };
        case 'image':
          return {
            background: colorPalette.background,
            color: colorPalette.text,
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column' as const,
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          };
        case 'data':
          return {
            background: colorPalette.background,
            color: colorPalette.text,
            padding: '1.5rem',
            height: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          };
        case 'closing':
          return {
            background: colorPalette.accent,
            color: '#FFFFFF',
            padding: '2rem',
            textAlign: 'center' as const,
            height: '100%',
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          };
        default:
          return {};
      }
    };

    return (
      <div className="w-full overflow-hidden h-48 transition-transform hover:scale-105">
        <div style={getSlideStyle()}>
          {type === 'title' && (
            <>
              <h3 className="text-xl font-bold mb-2">PRESENTATION TITLE</h3>
              <p className="text-sm opacity-90">Subtitle or tagline</p>
            </>
          )}
          
          {type === 'content' && (
            <>
              <div style={{ 
                backgroundColor: colorPalette.primary, 
                padding: '0.5rem 1rem',
                marginBottom: '1rem',
                color: '#FFFFFF',
                borderRadius: '4px'
              }}>
                <h3 className="text-lg font-bold">{title}</h3>
              </div>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li className="mb-1">Content point 1</li>
                <li className="mb-1">Content point 2</li>
                <li className="mb-1">Content point 3</li>
              </ul>
            </>
          )}
          
          {type === 'image' && (
            <>
              <div style={{ 
                backgroundColor: colorPalette.primary, 
                padding: '0.5rem 1rem',
                marginBottom: '1rem',
                color: '#FFFFFF',
                borderRadius: '4px'
              }}>
                <h3 className="text-lg font-bold">{title}</h3>
              </div>
              <div style={{ 
                backgroundColor: '#E5E5E5', 
                flex: 1, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                borderRadius: '4px'
              }}>
                Image Area
              </div>
              <p className="text-sm mt-2">Image caption text</p>
            </>
          )}
          
          {type === 'data' && (
            <>
              <div style={{ 
                backgroundColor: colorPalette.primary, 
                padding: '0.5rem 1rem',
                marginBottom: '1rem',
                color: '#FFFFFF',
                borderRadius: '4px'
              }}>
                <h3 className="text-lg font-bold">{title}</h3>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '1rem'
              }}>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  width: '70%',
                  height: '100px'
                }}>
                  <div style={{ 
                    height: '20px', 
                    backgroundColor: colorPalette.primary,
                    width: '90%',
                    marginBottom: '8px',
                    borderRadius: '4px'
                  }}></div>
                  <div style={{ 
                    height: '20px', 
                    backgroundColor: colorPalette.secondary,
                    width: '75%',
                    marginBottom: '8px',
                    borderRadius: '4px'
                  }}></div>
                  <div style={{ 
                    height: '20px', 
                    backgroundColor: colorPalette.accent,
                    width: '60%',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            </>
          )}
          
          {type === 'closing' && (
            <>
              <h3 className="text-xl font-bold mb-2">Thank You</h3>
              <p className="text-sm opacity-90">Contact Information</p>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-8 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-gray-200">Presentation Deck Template</h3>
        
        <div className="space-y-5">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-gray-800 font-medium">{generalGuidelines}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="space-y-4">
              <SlidePreview 
                title="Title Slide" 
                description={titleSlide}
                type="title" 
              />
              <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">{titleSlide}</p>
            </div>
            
            <div className="space-y-4">
              <SlidePreview 
                title="Content Slide" 
                description={contentSlide}
                type="content" 
              />
              <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">{contentSlide}</p>
            </div>
            
            <div className="space-y-4">
              <SlidePreview 
                title="Image Slide" 
                description={imageSlide}
                type="image" 
              />
              <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">{imageSlide}</p>
            </div>
            
            <div className="space-y-4">
              <SlidePreview 
                title="Data Slide" 
                description={dataSlide}
                type="data" 
              />
              <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">{dataSlide}</p>
            </div>
            
            <div className="space-y-4">
              <SlidePreview 
                title="Closing Slide" 
                description={closingSlide}
                type="closing" 
              />
              <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">{closingSlide}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 