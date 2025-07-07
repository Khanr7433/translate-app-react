import { getSupportedLanguages } from '../services/translationService'

const TranslationResult = ({ originalText, translatedText, targetLanguage, onSpeak }) => {
  const languageFlags = {
    en: '🇺🇸',
    hi: '🇮🇳',
    fr: '🇫🇷',
    es: '🇪🇸',
    de: '🇩🇪',
    it: '🇮🇹',
    pt: '🇵🇹',
    ru: '🇷🇺',
    ja: '🇯🇵',
    ko: '🇰🇷',
    zh: '🇨🇳',
    ar: '🇸🇦',
    tr: '🇹🇷',
    nl: '🇳🇱',
    sv: '🇸🇪',
    da: '🇩🇰',
    no: '🇳🇴',
    pl: '🇵🇱',
    cs: '🇨🇿',
    sk: '🇸🇰',
    hu: '🇭🇺'
  }

  const getLanguageName = (code) => {
    const languages = getSupportedLanguages()
    return languages[code] || 'Unknown'
  }

  const getLanguageFlag = (code) => {
    return languageFlags[code] || '🏳️'
  }

  const copyToClipboard = async () => {
    if (translatedText) {
      try {
        await navigator.clipboard.writeText(translatedText)
        // You could add a toast notification here
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = translatedText
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
    }
  }

  return (
    <div className="relative h-full flex flex-col">
      <div className="bg-google-light-gray px-4 py-3 border-b border-google-border">
        <span className="text-sm font-medium text-google-gray">
          {getLanguageFlag(targetLanguage)} {getLanguageName(targetLanguage)}
        </span>
      </div>
      
      <div className="flex-1 flex flex-col relative">
        {translatedText ? (
          <div className="p-4 text-base leading-6 text-gray-800 break-words flex-1 min-h-[150px]">
            {translatedText}
          </div>
        ) : (
          <div className="p-4 text-base text-google-gray italic flex-1 flex items-center min-h-[150px]">
            Translation will appear here
          </div>
        )}
        
        {translatedText && (
          <div className="flex items-center gap-2 px-4 py-2 border-t border-google-border bg-google-light-gray">
            <button 
              onClick={copyToClipboard}
              className="bg-none border-none text-google-gray cursor-pointer p-2 rounded flex items-center justify-center transition-all hover:bg-google-border hover:text-gray-800"
              title="Copy translation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            
            <button 
              onClick={() => onSpeak(translatedText)}
              className="bg-none border-none text-google-gray cursor-pointer p-2 rounded flex items-center justify-center transition-all hover:bg-google-border hover:text-gray-800"
              title="Listen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" strokeWidth="2"/>
                <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TranslationResult
