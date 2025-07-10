# Translate App - React

A modern React translation application with Tailwind CSS styling and Vite build tool.

## 🔗 Live Demo

Check out the live application: [Translate App React](https://translate-app-react.vercel.app)

## Features

- 🌍 **Multi-language Translation** - Support for 21 languages including English, Hindi, French, Spanish, German, and more
- 🔄 **Language Swapping** - Easily swap source and target languages
- 📝 **Translation History** - Keep track of your last 10 translations with local storage
- 🔊 **Text-to-Speech** - Listen to translations using browser speech synthesis
- 📋 **Copy to Clipboard** - One-click copying of translated text
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Translation** - Fast translation using MyMemory Translation API
- 🎨 **Modern UI** - Clean Google-inspired design with Tailwind CSS

## Technology Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite 7** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **MyMemory Translation API** - Free translation service

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Khanr7433/translate-app-react.git
cd translate-app-react
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Supported Languages

The app supports translation between the following languages:

🇺🇸 English, 🇮🇳 Hindi, 🇫🇷 French, 🇪🇸 Spanish, 🇩🇪 German, 🇮🇹 Italian, 🇵🇹 Portuguese, 🇷🇺 Russian, 🇯🇵 Japanese, 🇰🇷 Korean, 🇨🇳 Chinese, 🇸🇦 Arabic, 🇹🇷 Turkish, 🇳🇱 Dutch, 🇸🇪 Swedish, 🇩🇰 Danish, 🇳🇴 Norwegian, 🇵🇱 Polish, 🇨🇿 Czech, 🇸🇰 Slovak, 🇭🇺 Hungarian

## Project Structure

```
src/
├── components/
│   ├── index.js                # Component exports
│   ├── LanguageSelector.jsx    # Language selection dropdown
│   ├── TranslateInput.jsx      # Text input component
│   ├── TranslationResult.jsx   # Translation output component
│   └── TranslationHistory.jsx  # History component
├── services/
│   └── translationService.js   # Translation API service
├── assets/
│   └── ...                     # Application assets
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles with Tailwind
```

## Features Overview

### Language Selection

- Dropdown with popular languages for quick access
- Complete list of all supported languages
- Visual language flags for better UX
- Easy language swapping functionality

### Translation Interface

- Clean, Google-inspired design
- Auto-resizing text input
- Character counter (5000 character limit)
- Real-time error handling
- Loading states during translation

### Translation History

- Automatic saving to local storage
- Last 10 translations preserved
- One-click speech synthesis for history items
- Clear all history functionality

### Speech Synthesis

- Browser-based text-to-speech
- Works for translated text and history items
- Configurable speech rate and pitch

## API Integration

The app uses the [MyMemory Translation API](https://mymemory.translated.net/), which:

- Provides free translation services
- Supports 21+ language pairs
- Has no API key requirements
- Includes rate limiting for fair usage

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Speech synthesis requires modern browser support for the Web Speech API.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

The application is deployed on Vercel's platform. The deployment process is as follows:

1. Push changes to the main branch
2. Vercel automatically detects changes and deploys the application
3. The application is available at [https://translate-app-react.vercel.app](https://translate-app-react.vercel.app)

## Performance Optimization

- Code splitting for improved load times
- Image optimization via modern formats
- Lazy loading of components
- Memoization of expensive calculations

## Accessibility Features

- Semantic HTML structure
- ARIA attributes for screen readers
- Keyboard navigation support
- High contrast color options

## Future Enhancements

- Offline translation capabilities
- Advanced language detection
- Contextual translation suggestions
- Document translation support
- Custom voice selection for TTS

## License

This project is licensed under the ISC License.

## Author

Rashid Khan

- Email: [Rashid Khan](mailto:khan.rashid.7433@gmail.com)
- GitHub: [Khanr7433](https://github.com/Khanr7433)

---

Built with ❤️ using React, Tailwind CSS, and Vite
