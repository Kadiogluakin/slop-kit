'use client';

import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import BrandBookDisplay from '../components/BrandBookDisplay';
import { BrandBook, MoodboardImage } from '../types';

export default function Home() {
  const [description, setDescription] = useState('');
  const [moodboardImages, setMoodboardImages] = useState<MoodboardImage[]>([]);
  const [brandBook, setBrandBook] = useState<BrandBook | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!description.trim()) {
      setError('Please provide a product description');
      return;
    }
    
    if (moodboardImages.length === 0) {
      setError('Please upload at least one moodboard image');
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append('description', description);
      
      moodboardImages.forEach(image => {
        if ('file' in image && image.file instanceof File) {
          formData.append('images', image.file);
        }
      });
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate brand book');
      }
      
      const data = await response.json();
      setBrandBook(data.brandBook);
    } catch (err) {
      console.error('Error generating brand book:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              SlopKit Brand Generator
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Upload a moodboard and describe your product to get a complete brand book in seconds.
            </p>
          </div>

          {!brandBook ? (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label 
                    htmlFor="description" 
                    className="block text-base font-semibold text-gray-700 mb-2"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-base"
                    placeholder="Describe your product in a couple of sentences..."
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    Moodboard Images
                  </label>
                  <ImageUploader 
                    images={moodboardImages} 
                    setImages={setMoodboardImages} 
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={isGenerating}
                  className={`w-full py-4 px-6 rounded-lg text-white font-medium text-lg transition-all ${
                    isGenerating
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </div>
                  ) : 'Generate Brand Book'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <BrandBookDisplay brandBook={brandBook} />
              <div className="text-center py-4">
                <button
                  onClick={() => setBrandBook(null)}
                  className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Create Another Brand Book
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
