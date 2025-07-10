import { useState, useEffect, useRef } from "react";

const TranslateInput = ({ loading, error, onTranslate, onClear }) => {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);

  const translate = () => {
    if (inputText.trim()) {
      onTranslate(inputText.trim());
    }
  };

  const clear = () => {
    setInputText("");
    onClear();
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      translate();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  };

  useEffect(() => {
    handleInput();
  }, [inputText]);

  return (
    <div className="relative h-full flex flex-col bg-gray-900">
      <div className="relative h-full flex flex-col">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={loading}
          placeholder="Enter text to translate..."
          className="w-full min-h-[200px] max-h-[280px] lg:max-h-[340px] p-8 border-none outline-none font-medium text-lg leading-7 resize-none bg-transparent text-white flex-1 placeholder-gray-400 disabled:bg-gray-800/50 disabled:cursor-not-allowed disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 custom-scrollbar"
          maxLength={5000}
        />

        <div className="flex justify-between items-center px-8 py-4 lg:py-5 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-800/50 backdrop-blur-sm sticky bottom-0 z-10">
          <div className="flex items-center gap-4">
            {inputText && (
              <button
                onClick={clear}
                className="bg-gray-800/50 border border-gray-700/50 text-gray-300 cursor-pointer p-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:text-white backdrop-blur-sm"
                title="Clear text"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {inputText && (
              <div className="text-sm text-gray-300 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full font-medium backdrop-blur-sm">
                {inputText.length}/5000
              </div>
            )}

            <button
              onClick={translate}
              disabled={loading || !inputText.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500/30 text-white px-6 py-3 rounded-lg cursor-pointer text-base font-semibold flex items-center gap-3 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 disabled:from-gray-800 disabled:to-gray-800 disabled:border-gray-700/50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 backdrop-blur-sm shadow-md"
              title="Translate"
            >
              {loading ? (
                <>
                  <span className="animate-spin text-lg">⏳</span>
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">✨</span>
                  <span>Translate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-900/30 text-red-300 p-4 text-sm border-t border-red-600/30 rounded-b-lg backdrop-blur-sm">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="flex-shrink-0"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="8"
              x2="12"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="16"
              x2="12.01"
              y2="16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};

export default TranslateInput;
