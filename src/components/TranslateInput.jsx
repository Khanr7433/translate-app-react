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
    // Auto-resize textarea
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
    <div className="relative h-full">
      <div className="relative h-full flex flex-col">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={loading}
          placeholder="Enter text to translate..."
          className="w-full min-h-[200px] max-h-[240px] p-8 border-none outline-none font-inherit text-lg leading-7 resize-none bg-transparent text-gray-800 flex-1 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500"
          maxLength={5000}
        />

        <div className="flex justify-between items-center px-8 py-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            {inputText && (
              <button
                onClick={clear}
                className="bg-transparent border-none text-gray-400 cursor-pointer p-3 rounded-xl transition-all hover:bg-gray-200 hover:text-gray-600"
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
              <div className="text-sm text-gray-500 px-4 py-2 bg-gray-100 rounded-full font-medium">
                {inputText.length}/5000
              </div>
            )}

            <button
              onClick={translate}
              disabled={loading || !inputText.trim()}
              className="bg-google-blue border-none text-white px-8 py-4 rounded-2xl cursor-pointer text-base font-bold flex items-center gap-3 transition-all hover:bg-google-blue-hover hover:shadow-xl disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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
        <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 text-sm border-t border-red-200 rounded-b-xl">
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
