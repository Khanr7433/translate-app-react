import { useState, useEffect } from 'react'
import LanguageSelector from './components/LanguageSelector'
import TranslateInput from './components/TranslateInput'
import TranslationResult from './components/TranslationResult'
import TranslationHistory from './components/TranslationHistory'
import { translateText } from './services/translationService'

function App() {
  const [currentOriginalText, setCurrentOriginalText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [history, setHistory] = useState([])
  const [fromLanguage, setFromLanguage] = useState('en') // Default to English
  const [toLanguage, setToLanguage] = useState('hi') // Default to Hindi
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    loadHistoryFromStorage()
  }, [])

  const handleTranslate = async (text) => {
    if (!text.trim()) {
      setErrorMessage('Please enter some text to translate')
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    setCurrentOriginalText(text)

    try {
      const translation = await translateText(text, fromLanguage, toLanguage)
      setTranslatedText(translation)
      addToHistory(text, translation)
    } catch (error) {
      setErrorMessage(error.message)
      setTranslatedText('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFromLanguageChange = (language) => {
    setFromLanguage(language)
  }

  const handleToLanguageChange = (language) => {
    setToLanguage(language)
  }

  const handleSwapLanguages = () => {
    const temp = fromLanguage
    setFromLanguage(toLanguage)
    setToLanguage(temp)
  }

  const swapLanguages = () => {
    // This is for the main swap button in the translation box
    handleSwapLanguages()
  }

  const addToHistory = (original, translated) => {
    const entry = {
      id: Date.now(),
      original,
      translated,
      fromLanguage: fromLanguage,
      toLanguage: toLanguage,
      timestamp: new Date().toLocaleString(),
    }

    setHistory(prev => {
      const newHistory = [entry, ...prev]
      if (newHistory.length > 10) {
        newHistory.pop()
      }
      return newHistory
    })
    
    // Save to localStorage
    const newHistory = [entry, ...history]
    if (newHistory.length > 10) {
      newHistory.pop()
    }
    saveHistoryToStorage(newHistory)
  }

  const clearHistory = () => {
    setHistory([])
    saveHistoryToStorage([])
  }

  const clearTranslation = () => {
    setTranslatedText('')
    setCurrentOriginalText('')
    setErrorMessage('')
  }

  const speakTranslation = (text) => {
    console.log('speakTranslation called with text:', text)
    speakText(text)
  }

  const speakHistoryItem = (text) => {
    speakText(text)
  }

  const speakText = (text) => {
    console.log('speakText called with text:', text)
    if (!text) {
      console.log('No text provided to speakText')
      return
    }

    if ('speechSynthesis' in window) {
      console.log('Speech synthesis is supported')
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      
      utterance.onstart = () => console.log('Speech started')
      utterance.onend = () => console.log('Speech ended')
      utterance.onerror = (e) => console.error('Speech error:', e)
      
      speechSynthesis.speak(utterance)
      console.log('speechSynthesis.speak() called')
    } else {
      console.log('Speech synthesis not supported')
      alert('Speech synthesis not supported in this browser')
    }
  }

  const saveHistoryToStorage = (historyData) => {
    localStorage.setItem('translateAppHistory', JSON.stringify(historyData))
  }

  const loadHistoryFromStorage = () => {
    const saved = localStorage.getItem('translateAppHistory')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }

  const getLanguageName = (code) => {
    const languages = {
      en: 'English',
      hi: 'Hindi',
      fr: 'French',
      es: 'Spanish',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
      ja: 'Japanese',
      ko: 'Korean',
      zh: 'Chinese',
      ar: 'Arabic',
      tr: 'Turkish',
      nl: 'Dutch',
      sv: 'Swedish',
      da: 'Danish',
      no: 'Norwegian',
      pl: 'Polish',
      cs: 'Czech',
      sk: 'Slovak',
      hu: 'Hungarian',
    }
    return languages[code] || 'Unknown'
  }

  const getLanguageFlag = (code) => {
    const flags = {
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
      hu: '🇭🇺',
    }
    return flags[code] || '🏳️'
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-google-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <div className="logo">
            <h1 className="text-xl font-normal text-google-blue m-0">Translate</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Language Selector Bar */}
          <LanguageSelector
            fromLanguage={fromLanguage}
            toLanguage={toLanguage}
            onFromLanguageChange={handleFromLanguageChange}
            onToLanguageChange={handleToLanguageChange}
            onSwapLanguages={handleSwapLanguages}
          />

          {/* Translation Cards */}
          <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] mb-6 overflow-hidden">
            {/* Input Side */}
            <div className="min-h-[300px]">
              <div className="bg-google-light-gray px-4 py-3 border-b border-google-border">
                <span className="text-sm font-medium text-google-gray">
                  {getLanguageFlag(fromLanguage)} {getLanguageName(fromLanguage)}
                </span>
              </div>
              <TranslateInput
                loading={isLoading}
                error={errorMessage}
                onTranslate={handleTranslate}
                onClear={clearTranslation}
              />
            </div>

            {/* Divider */}
            <div className="w-px bg-google-border relative flex items-center justify-center mx-2 flex-shrink-0 relative z-10 lg:block hidden">
              <button
                className="bg-white border border-google-border rounded-full w-10 h-10 flex items-center justify-center text-google-gray transition-all hover:bg-google-light-gray hover:border-google-border-hover hover:scale-105 absolute"
                onClick={swapLanguages}
                title="Swap languages"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.99 11L3 15L6.99 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.01 5L21 9L17.01 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Divider */}
            <div className="w-full h-px bg-google-border relative lg:hidden">
              <button
                className="bg-white border border-google-border rounded-full w-10 h-10 flex items-center justify-center text-google-gray transition-all hover:bg-google-light-gray hover:border-google-border-hover hover:scale-105 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90"
                onClick={swapLanguages}
                title="Swap languages"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.99 11L3 15L6.99 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.01 5L21 9L17.01 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Output Side */}
            <div className="min-h-[300px]">
              <TranslationResult
                originalText={currentOriginalText}
                translatedText={translatedText}
                targetLanguage={toLanguage}
                onSpeak={speakTranslation}
              />
            </div>
          </div>

          {/* Translation History */}
          <TranslationHistory
            history={history}
            onClearHistory={clearHistory}
            onSpeakItem={speakHistoryItem}
          />
        </div>
      </main>
    </div>
  )
}

export default App
