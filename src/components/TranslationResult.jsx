const TranslationResult = ({ translatedText, onSpeak }) => {
  const copyToClipboard = async () => {
    if (translatedText) {
      try {
        await navigator.clipboard.writeText(translatedText);
      } catch {
        const textArea = document.createElement("textarea");
        textArea.value = translatedText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="relative h-full flex flex-col bg-gray-900">
      <div className="flex-1 flex flex-col relative">
        {translatedText ? (
          <div className="p-8 text-lg leading-7 text-white break-words flex-1 min-h-[200px] font-medium custom-scrollbar">
            {translatedText}
          </div>
        ) : (
          <div className="p-8 text-lg text-gray-400 italic flex-1 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="text-4xl mb-4">🔤</div>
              <div>Translation will appear here</div>
            </div>
          </div>
        )}

        {translatedText && (
          <div className="flex items-center gap-4 px-8 py-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-800/50 backdrop-blur-sm sticky bottom-0 z-10">
            <button
              onClick={copyToClipboard}
              className="bg-gray-800/50 border border-gray-700/50 text-gray-300 cursor-pointer p-3 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-gray-700/50 hover:text-white backdrop-blur-sm"
              title="Copy translation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <button
              onClick={() => onSpeak(translatedText)}
              className="bg-gray-800/50 border border-gray-700/50 text-gray-300 cursor-pointer p-3 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-gray-700/50 hover:text-white backdrop-blur-sm"
              title="Listen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        )}
      </div>
    </div>
  );
};

export default TranslationResult;
