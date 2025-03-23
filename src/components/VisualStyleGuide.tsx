import { VisualStyle, ColorPalette } from '../types';

interface VisualStyleGuideProps {
  visualStyle: VisualStyle;
  colorPalette: ColorPalette;
}

export default function VisualStyleGuide({ visualStyle, colorPalette }: VisualStyleGuideProps) {
  const { 
    imageStyle, 
    graphicElements, 
    layoutPrinciples, 
    iconStyle, 
    photographyGuidelines 
  } = visualStyle;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-8 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-gray-200">Visual Style Guide</h3>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">Image Style</p>
            <p className="text-gray-800">{imageStyle}</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">Graphic Elements</p>
            <div className="flex flex-wrap gap-2">
              {graphicElements.map((element, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${colorPalette.accent}15`, color: colorPalette.accent }}
                >
                  {element}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">Layout Principles</p>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {layoutPrinciples.map((principle, index) => (
                <li key={index} className="py-1">{principle}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">Icon Style</p>
            <p className="text-gray-800">{iconStyle}</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">Photography Guidelines</p>
            <p className="text-gray-800">{photographyGuidelines}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 