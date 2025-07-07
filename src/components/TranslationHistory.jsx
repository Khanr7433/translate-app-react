const TranslationHistory = ({ history, onClearHistory, onSpeakItem }) => {
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

  const getLanguageFlag = (code) => {
    return languageFlags[code] || '🏳️'
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl text-gray-700 font-normal">📚 Translation History</h3>
        {history.length > 0 && (
          <button 
            onClick={onClearHistory}
            className="bg-red-500 text-white border-none px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold transition-all hover:bg-red-600 hover:-translate-y-0.5"
            title="Clear all history"
          >
            🗑️ Clear All
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-12 px-8 bg-google-light-gray rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-0">🔍 No translation history yet</p>
          <p className="text-sm text-gray-500 mt-2">Your last 10 translations will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((entry) => (
            <div 
              key={entry.id}
              className="bg-white border border-gray-200 rounded-xl p-6 transition-all hover:border-google-blue hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-base leading-snug break-words flex-1 text-gray-600">
                      {entry.original}
                    </span>
                  </div>
                  <div className="text-google-blue font-bold text-lg">→</div>
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <span className="text-lg">{getLanguageFlag(entry.toLanguage)}</span>
                    <span className="text-base leading-snug break-words flex-1 text-gray-800 font-medium">
                      {entry.translated}
                    </span>
                    <button 
                      onClick={() => onSpeakItem(entry.translated)}
                      className="bg-none border-none text-base cursor-pointer p-1 rounded transition-all hover:bg-blue-50 ml-2"
                      title="Speak translation"
                    >
                      🔊
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {entry.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {history.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 italic">
            📝 Showing {history.length} of 10 translations
          </p>
        </div>
      )}
    </div>
  )
}

export default TranslationHistory
