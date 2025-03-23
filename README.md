# SlopKit - AI Brand Book Generator

SlopKit is an AI-powered brand book generator that creates comprehensive brand identities from just a moodboard and a short product description.

## Live Demo

[View the live demo on Vercel](https://slopkit.vercel.app)

## Features

- Upload moodboard images via drag-and-drop
- Enter a brief product description (just 2 lines)
- Generate a complete brand book with:
  - Color palette
  - Typography recommendations
  - Brand voice and tone
  - Logo suggestions
  - Visual style guidelines
  - Presentation deck templates

## Screenshots

![SlopKit Brand Generator](public/screenshot.png)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- OpenAI API key
- Cloudinary account (for image storage)

### Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kadiogluakin/slopkit.git
cd slopkit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. The user uploads moodboard images that represent their visual style preferences
2. The user enters a short description of their product or service
3. The application sends this information to the OpenAI API using GPT-4 to generate a comprehensive brand book
4. The results are displayed in a visually appealing format, ready to be used for brand development

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- OpenAI API for AI generation
- Cloudinary for image storage
- React Dropzone for file uploads
- Heroicons for icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

- [Akin Kadioglu](https://github.com/Kadiogluakin)
