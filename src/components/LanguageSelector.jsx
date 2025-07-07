import { useState, useEffect, useRef } from 'react'
import { getSupportedLanguages } from '../services/translationService'

const LanguageSelector = ({ fromLanguage, toLanguage, onFromLanguageChange, onToLanguageChange, onSwapLanguages }) => {
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false)
  const [toDropdownOpen, setToDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const popularLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  ]

  const allLanguages = getSupportedLanguages()

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
    hu: '🇭🇺',
  }

  const getLanguageName = (code) => {
    return allLanguages[code] || 'Unknown'
  }

  const getLanguageFlag = (code) => {
    return languageFlags[code] || '🏳️'
  }

  const selectFromLanguage = (languageCode) => {
    onFromLanguageChange(languageCode)
    setFromDropdownOpen(false)
  }

  const selectToLanguage = (languageCode) => {
    onToLanguageChange(languageCode)
    setToDropdownOpen(false)
  }

  const toggleFromDropdown = () => {
    setFromDropdownOpen(!fromDropdownOpen)
    setToDropdownOpen(false)
  }

  const toggleToDropdown = () => {
    setToDropdownOpen(!toDropdownOpen)
    setFromDropdownOpen(false)
  }

  const swapLanguages = () => {
    onSwapLanguages()
    setFromDropdownOpen(false)
    setToDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFromDropdownOpen(false)
        setToDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="mb-6" ref={dropdownRef}>
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-google-border lg:p-6">
        {/* From Language Section */}
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-xs text-google-gray font-medium uppercase tracking-wide">From</span>
          <div className="relative">
            <div className={`relative ${fromDropdownOpen ? 'z-10' : ''}`}>
              <button
                className={`flex items-center gap-2 px-3 py-2 border border-google-border rounded transition-all w-full min-w-[120px] ${
                  fromLanguage ? 'bg-blue-50 border-google-blue text-google-blue' : 'hover:bg-google-light-gray hover:border-google-border-hover'
                }`}
                onClick={toggleFromDropdown}
              >
                <span className="text-base">{getLanguageFlag(fromLanguage)}</span>
                <span className="flex-1 text-left font-normal">{getLanguageName(fromLanguage)}</span>
                <svg
                  className={`text-google-gray transition-transform ${fromDropdownOpen ? 'rotate-180' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {fromDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-google-border rounded shadow-lg z-50 max-h-96 overflow-y-auto mt-1">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs text-google-gray font-medium uppercase tracking-wide">Popular languages</div>
                    <div className="flex flex-col">
                      {popularLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectFromLanguage(lang.code)}
                          className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            fromLanguage === lang.code ? 'bg-blue-50 text-google-blue' : 'hover:bg-google-light-gray'
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-google-border py-2">
                    <div className="px-4 py-2 text-xs text-google-gray font-medium uppercase tracking-wide">All languages</div>
                    <div className="flex flex-col">
                      {Object.entries(allLanguages).map(([code, name]) => (
                        <button
                          key={code}
                          onClick={() => selectFromLanguage(code)}
                          className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            fromLanguage === code ? 'bg-blue-50 text-google-blue' : 'hover:bg-google-light-gray'
                          }`}
                        >
                          <span className="text-base">{getLanguageFlag(code)}</span>
                          <span>{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex items-center justify-center mx-2 flex-shrink-0 relative z-10">
          <button
            className="bg-white border border-google-border rounded-full w-10 h-10 flex items-center justify-center text-google-gray transition-all hover:bg-google-light-gray hover:border-google-border-hover hover:text-google-blue"
            onClick={swapLanguages}
            title="Swap languages"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 3L21 8L16 13M21 8H3M8 21L3 16L8 11M3 16H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* To Language Section */}
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-xs text-google-gray font-medium uppercase tracking-wide">To</span>
          <div className="relative">
            <div className={`relative ${toDropdownOpen ? 'z-10' : ''}`}>
              <button
                className={`flex items-center gap-2 px-3 py-2 border border-google-border rounded transition-all w-full min-w-[120px] ${
                  toLanguage ? 'bg-blue-50 border-google-blue text-google-blue' : 'hover:bg-google-light-gray hover:border-google-border-hover'
                }`}
                onClick={toggleToDropdown}
              >
                <span className="text-base">{getLanguageFlag(toLanguage)}</span>
                <span className="flex-1 text-left font-normal">{getLanguageName(toLanguage)}</span>
                <svg
                  className={`text-google-gray transition-transform ${toDropdownOpen ? 'rotate-180' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {toDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-google-border rounded shadow-lg z-50 max-h-96 overflow-y-auto mt-1">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs text-google-gray font-medium uppercase tracking-wide">Popular languages</div>
                    <div className="flex flex-col">
                      {popularLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectToLanguage(lang.code)}
                          className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            toLanguage === lang.code ? 'bg-blue-50 text-google-blue' : 'hover:bg-google-light-gray'
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-google-border py-2">
                    <div className="px-4 py-2 text-xs text-google-gray font-medium uppercase tracking-wide">All languages</div>
                    <div className="flex flex-col">
                      {Object.entries(allLanguages).map(([code, name]) => (
                        <button
                          key={code}
                          onClick={() => selectToLanguage(code)}
                          className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            toLanguage === code ? 'bg-blue-50 text-google-blue' : 'hover:bg-google-light-gray'
                          }`}
                        >
                          <span className="text-base">{getLanguageFlag(code)}</span>
                          <span>{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector
