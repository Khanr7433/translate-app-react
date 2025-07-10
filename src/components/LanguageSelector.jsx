import { useState } from "react";

const languages = [
  { code: "auto", name: "Auto-detect" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "th", name: "Thai" },
  { code: "vi", name: "Vietnamese" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
];

const LanguageSelector = ({
  fromLanguage,
  toLanguage,
  onFromLanguageChange,
  onToLanguageChange,
  onSwapLanguages,
}) => {
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  const getLanguageName = (code) => {
    const lang = languages.find((l) => l.code === code);
    return lang ? lang.name : code;
  };

  const handleFromLanguageSelect = (langCode) => {
    onFromLanguageChange(langCode);
    setFromDropdownOpen(false);
  };

  const handleToLanguageSelect = (langCode) => {
    onToLanguageChange(langCode);
    setToDropdownOpen(false);
  };

  const availableToLanguages = languages.filter((lang) => lang.code !== "auto");

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-xl rounded-lg shadow-lg border border-gray-700/50 p-2 sm:p-4 lg:p-6 relative z-[200]">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <button
            onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
            className="flex items-center justify-between w-full px-10 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          >
            <span className="truncate">{getLanguageName(fromLanguage)}</span>
            <svg
              className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                fromDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {fromDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto custom-scrollbar">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleFromLanguageSelect(lang.code)}
                  className={`w-full px-10 py-5 text-left text-gray-200 hover:bg-blue-600/20 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                    fromLanguage === lang.code
                      ? "bg-blue-600/30 text-blue-300 font-semibold"
                      : ""
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 mx-3">
          <button
            onClick={onSwapLanguages}
            className="group relative p-5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          >
            <svg
              className="w-6 h-6 text-white transform group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m0-4l4-4"
              />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 w-full sm:max-w-sm">
          <button
            onClick={() => setToDropdownOpen(!toDropdownOpen)}
            className="flex items-center justify-between w-full px-10 py-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50"
          >
            <span className="truncate">{getLanguageName(toLanguage)}</span>
            <svg
              className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                toDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {toDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto custom-scrollbar">
              {availableToLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleToLanguageSelect(lang.code)}
                  className={`w-full px-10 py-5 text-left text-gray-200 hover:bg-green-600/20 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                    toLanguage === lang.code
                      ? "bg-green-600/30 text-green-300 font-semibold"
                      : ""
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
