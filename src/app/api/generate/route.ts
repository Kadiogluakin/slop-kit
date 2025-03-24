import { NextRequest, NextResponse } from 'next/server';
import { generateBrandBook } from '../../../lib/openai';
import { uploadImage } from '../../../lib/cloudinary';
import { BrandInput, MoodboardImage } from '../../../types';

export const maxDuration = 300; // 5 minutes max duration

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const description = formData.get('description') as string;
    
    if (!description) {
      return NextResponse.json(
        { error: 'Product description is required' },
        { status: 400 }
      );
    }

    const imageFiles = formData.getAll('images') as File[];
    
    if (!imageFiles.length) {
      return NextResponse.json(
        { error: 'At least one moodboard image is required' },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const moodboardImages: MoodboardImage[] = [];
    
    for (const file of imageFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
      
      const uploadResult = await uploadImage(base64Image);
      
      moodboardImages.push({
        id: Math.random().toString(36).substring(2, 9),
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      });
    }

    // Generate brand book
    const brandInput: BrandInput = {
      description,
      moodboardImages,
    };

    const brandBook = await generateBrandBook(brandInput);

    // Ensure we have a complete brand book before returning
    if (!brandBook || !brandBook.colorPalette || !brandBook.typography) {
      throw new Error('Generated brand book is incomplete');
    }

    return NextResponse.json({ brandBook });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate brand book' },
      { status: 500 }
    );
  }
} 