const TranslationHistory = ({ history, onClearHistory, onSpeakItem }) => {
  const languageFlags = {
    en: "🇺🇸",
    hi: "🇮🇳",
    fr: "🇫🇷",
    es: "🇪🇸",
    de: "🇩🇪",
    it: "🇮🇹",
    pt: "🇵🇹",
    ru: "🇷🇺",
    ja: "🇯🇵",
    ko: "🇰🇷",
    zh: "🇨🇳",
    ar: "🇸🇦",
    tr: "🇹🇷",
    nl: "🇳🇱",
    sv: "🇸🇪",
    da: "🇩🇰",
    no: "🇳🇴",
    pl: "🇵🇱",
    cs: "🇨🇿",
    sk: "🇸🇰",
    hu: "🇭🇺",
  };

  const getLanguageFlag = (code) => {
    return languageFlags[code] || "🏳️";
  };

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-8 px-2">
        <h3 className="text-2xl text-gray-700 font-semibold flex items-center gap-3">
          📚 Translation History
        </h3>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="bg-red-500 text-white border-none px-6 py-3 rounded-xl cursor-pointer text-sm font-semibold transition-all hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5"
            title="Clear all history"
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 px-8 bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-sm">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg mb-2 font-medium">
            No translation history yet
          </p>
          <p className="text-sm text-gray-400">
            Your last 10 translations will appear here
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-gray-200 rounded-2xl p-8 transition-all hover:border-google-blue hover:shadow-xl hover:-translate-y-1 shadow-sm"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <span className="text-2xl">
                      {getLanguageFlag(entry.fromLanguage)}
                    </span>
                    <span className="text-lg leading-snug break-words flex-1 text-gray-600 font-medium">
                      {entry.original}
                    </span>
                  </div>
                  <div className="text-google-blue font-bold text-2xl">→</div>
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <span className="text-2xl">
                      {getLanguageFlag(entry.toLanguage)}
                    </span>
                    <span className="text-lg leading-snug break-words flex-1 text-gray-800 font-semibold">
                      {entry.translated}
                    </span>
                    <button
                      onClick={() => onSpeakItem(entry.translated)}
                      className="bg-gray-100 border-none text-gray-500 cursor-pointer p-3 rounded-xl transition-all hover:bg-blue-100 hover:text-google-blue ml-3"
                      title="Speak translation"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <polygon
                          points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-400 text-right font-medium">
                  {entry.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 italic bg-gray-50 inline-block px-4 py-2 rounded-full">
            📝 Showing {history.length} of 10 translations
          </p>
        </div>
      )}
    </div>
  );
};

export default TranslationHistory;
