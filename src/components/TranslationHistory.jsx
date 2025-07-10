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
        <h3 className="text-2xl text-white font-semibold flex items-center gap-3">
          📚 Translation History
        </h3>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-none px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold transition-all hover:from-red-600 hover:to-pink-600 hover:shadow-lg hover:scale-105 backdrop-blur-sm shadow-lg"
            title="Clear all history"
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 px-8 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-lg">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-200 text-lg mb-2 font-medium">
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
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 transition-all hover:border-blue-500/50 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            >
              {" "}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <span className="text-2xl">
                      {getLanguageFlag(entry.fromLanguage)}
                    </span>
                    <span className="text-lg leading-snug break-words flex-1 text-gray-400 font-medium">
                      {entry.original}
                    </span>
                  </div>
                  <div className="text-blue-400 font-bold text-2xl">→</div>
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <span className="text-2xl">
                      {getLanguageFlag(entry.toLanguage)}
                    </span>
                    <span className="text-lg leading-snug break-words flex-1 text-white font-semibold">
                      {entry.translated}
                    </span>
                    <button
                      onClick={() => onSpeakItem(entry.translated)}
                      className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 text-gray-300 hover:text-white cursor-pointer p-3 rounded-lg transition-all ml-3"
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
                <div className="text-sm text-gray-500 text-right font-medium">
                  {entry.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 bg-gray-900/50 backdrop-blur-xl inline-block px-4 py-2 rounded-full border border-gray-700/50">
            📝 Showing {history.length} of 10 translations
          </p>
        </div>
      )}
    </div>
  );
};

export default TranslationHistory;
